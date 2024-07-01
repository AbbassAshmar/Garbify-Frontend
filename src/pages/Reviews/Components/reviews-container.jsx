import styled from "styled-components";
import Loading from "../../../components/Loading/loading";
import { useSearchParams } from "react-router-dom";
import useUserState from "../../../hooks/use-user-state";
import { useFetchData } from "../../../hooks/use-fetch-data";
import { REVIEWS_USERS_PRODUCTS } from "../../../components/products-data";
import Pagination from "../../../components/Pagination/pagination";
import ProductReviewCard from "../../../components/ProductReviewCard/product-review-card";

const ReviewsSection = styled.div`
display:flex;
flex-direction:column;
gap:3rem;
`
const ReviewsWrapper = styled.div`
display:flex;
flex-direction:column;
gap:3rem;
`

export default function ReviewsContainer(){
    const userContext = useUserState();
    const [searchParams,setSearchParams] = useSearchParams();
    
    const URI = 'users/user/reviews'
    let {data,loading,error,setData} = useFetchData(URI,[searchParams],userContext);
    let reviews = data?.reviews || REVIEWS_USERS_PRODUCTS;
    let TotalPagesCount =data?.metadata?.pages_count || 30;
    
    if (loading){
        return <Loading />
    }

    return (
        <ReviewsSection>
            {reviews && (
                <>
                    <ReviewsWrapper>
                        {reviews.map((review)=>{
                            return <ProductReviewCard setReviews={setData} key={review.id} review={review}/>
                        })}
                    </ReviewsWrapper>
                    <Pagination TotalPagesCount={TotalPagesCount}/>
                </>
            )}
            {!reviews && (
                <p>You haven't reviewed any products yet !</p>
            )}
        </ReviewsSection>
    )
}