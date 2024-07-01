import styled from "styled-components"
import Pagination from "../../../components/Pagination/pagination"
import { useSearchParams } from "react-router-dom"
// import { REVIEWS } from "../../../components/products-data"
import { REVIEWS_USERS_PRODUCTS } from "../../../components/products-data"

import Loading from "../../../components/Loading/loading"
import { constructUrl } from "../../Orders/orders"
import { useFetchData } from "../../../hooks/use-fetch-data"
import RatingStars from "../../../components/RatingStars/rating-stars"
import useUserState from "../../../hooks/use-user-state"
import ReviewCard from "../../../components/ReviewCard/review-card"

const Container = styled.div`
margin: 0 0 2rem 0;
`
const Header = styled.div`
padding: 0 0 4rem 0;
border-bottom:2px solid #F1F4F9;
`
const Title = styled.h2`
margin: 0 0 4rem 0;
font-weight:600;
font-size:clamp(1rem, 2.6vw, 1.3rem);
`
const StarsContainer = styled.div`
display:flex;
gap:12px;
align-items:center;
margin:auto;
justify-content:center;
line-height:0;
`
const Rating = styled.div`
font-weight:600;
margin:0;

font-size:1.8rem;
@media screen and (max-width:800px){
    font-size:1.6rem;
}
`
const Reviews = styled.div`
display:flex;
flex-direction : column;
`

export default function ReviewsSection({product_id}){
    const userContext = useUserState();
    const [searchParams, setSearchParams] = useSearchParams();

    let endpoint_url = "/api/products/" + product_id + "/reviews";
    let url = constructUrl(endpoint_url,searchParams)
    let {data, error, loading, setData:setReviews} = useFetchData(url,[searchParams],userContext);

    let reviews = data?.data.reviews || REVIEWS_USERS_PRODUCTS;
    let TotalPagesCount = data?.metadata.pages_count || [];
    let reviewsDetails = {
        average_ratings:data?.metadata.average_ratings || 5, 
        reviews_count:data?.metadata.total_count || 0
    };

    if (loading){
        return (<Loading />)
    }

    return (
        <Container>
            <Header>
                <Title>Reviews ({reviewsDetails.reviews_count}): </Title>
                <StarsContainer>
                    <Rating>{reviewsDetails.average_ratings}</Rating>
                    <RatingStars width={"min(8vw,30px)"} rating={reviewsDetails.average_ratings}/>
                </StarsContainer>
            </Header>
            <Reviews>
                {reviews && reviews.map((review)=>{
                    return(
                        <div style={{padding: 'min(2rem ,5%) min(2rem ,5%)'}}>
                            <ReviewCard 
                            key={review.id}
                            review={review}
                            user={review.user}
                            />
                        </div>
                    )
                })}  
            </Reviews>
            <Pagination TotalPagesCount={TotalPagesCount}/>
        </Container>
    )
}
