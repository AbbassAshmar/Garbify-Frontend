import styled from "styled-components";
import UserReviewCard from "./user-review-card";
import Loading from "../../../components/Loading/loading";
import { useSearchParams } from "react-router-dom";
import useUserState from "../../../hooks/use-user-state";
import { useFetchData } from "../../../hooks/use-fetch-data";
import { REVIEWS_USERS_PRODUCTS } from "../../../components/products-data";
import Pagination from "../../../components/Pagination/pagination";

const ReviewsSection = styled.div`

`
const ReviewsContainer = styled.div`

`

export default function UserReviewsSection(){
    const userContext = useUserState();
    const [searchParams,setSearchParams] = useSearchParams();
    
    const URI = 'users/user/reviews'
    let {data,loading,error} = useFetchData(URI,[searchParams],userContext);
    let reviews = data?.reviews || REVIEWS_USERS_PRODUCTS;
    let TotalPagesCount =data?.metadata?.pages_count || 30;
    
    if (loading){
        return <Loading />
    }

    return (
        <ReviewsSection>
            <ReviewsContainer>
                {reviews &&
                    reviews.map((review)=>{
                        return <UserReviewCard review={review}/>
                    })
                }
            </ReviewsContainer>
            <Pagination TotalPagesCount={TotalPagesCount}/>
        </ReviewsSection>
    )
}