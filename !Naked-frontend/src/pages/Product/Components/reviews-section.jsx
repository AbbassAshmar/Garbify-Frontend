import styled from "styled-components"
import Review from "./review"
import { useContext, useEffect, useState } from "react"
import { ratingToStars } from "./details-container"

import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
import hoody from "../../../assets/Hoody.jpg"
import hoody2 from "../../../assets/Hoody2.jpg"
import { userStateContext } from "../../../Contexts/user-state"
import Pagination from "../../../components/Pagination/pagination"
import { useSearchParams } from "react-router-dom"
import { REVIEWS } from "../../../components/products-data"
import { requestData } from "../../OtherUsersFavorites/other-users-favorites"

const Container = styled.div`
margin: 0 0 2rem 0;
`
const Header = styled.div`
padding: 0 0 4rem 0;
border-bottom:2px solid black;
`
const Title = styled.h2`
margin: 0 0 4rem 0;

font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}

`
const StarsContainer = styled.div`
display:flex;
gap:8px;
align-items:flex-start;
margin:auto;
justify-content:center;


`
const Rating = styled.div`
font-weight:600;
margin:0;

font-size:1.8rem;
@media screen and (max-width:800px){
    font-size:1.6rem;
}
`
const Stars = styled.div`
display:flex;

`
const Star = styled.img`
width:40px;
@media screen and (max-width:800px){
    width:30px;
}
`
const Reviews = styled.div`
display:flex;
flex-direction : column;
`

export default function ReviewsSection({product_id}){
    const userState = useContext(userStateContext)
    const [reviews, setReviews] = useState(REVIEWS);
    const [reviewsDetails, setReviewsDetails] = useState({average_ratings:5 , reviews_count:0});
    const [likedReviews, setLikedReviews] = useState([4,5]);

    // useEffect(()=>{
    //     let init = {
    //         headers:{
    //             "Authorization":"Bearer "+user_token 
    //         }
    //     }

    //     const REVIEWS_URL = "http://127.0.0.1:8000/api/products/"+product_id+"/reviews"
    //     const LIKED_REVIEWS_URL = "http://127.0.0.1:8000/api/products/"+product_id+"/users/user/reviews/liked"
    
    //     let reviews = requestData(REVIEWS_URL);
    //     let likedReviews = requestData(LIKED_REVIEWS_URL,init)

    //     if (reviews){
    //         setReviews(reviews['reviews'])
    //         setReviewsDetails({average_ratings:reviews['average_ratings'],reviews_count:reviews['total_count']})
    //     }
    //     if (likedReviews){
    //         setLikedReviews(likedReviews['liked_reviews'])
    //     }
    // },[])

    function checkIfLiked(review_id,likedReviews){
        function searchForId(s,e){
            let middle = (s+e)/ 2
            if (s>e){
                return false;
            }
            if (likedReviews[middle] === review_id){
                return true;
            }
            if (likedReviews[middle] > review_id){
                return searchForId(s, middle-1);
            }
            return searchForId(middle +1 , e);
        }
        return searchForId(0, likedReviews.length)
    }
    
    return (
        <Container>
            <Header>
                <Title>Reviews ({reviewsDetails.reviews_count}): </Title>
                <StarsContainer>
                    <Rating>{reviewsDetails.average_ratings}</Rating>
                    <Stars>
                        {ratingToStars(reviewsDetails.average_ratings).map((value)=>{
                            if (value === "star") return <Star src={star} />
                            if (value=== "half") return <Star src={half_star} />
                            if (value=== "empty") return <Star src={empty_star} /> 
                        })}
                    </Stars>
                </StarsContainer>
            </Header>
            <Reviews>
                {reviews && reviews.map((review)=>{
                    return(
                        <Review 
                            liked={checkIfLiked(review.id,likedReviews)}
                            id = {review.id}
                            username={review.username}
                            height={review.user_height}
                            weight={review.user_weight}
                            rating={review.rating}
                            title={review.title}
                            text={review.text}
                            color={review.color}
                            size={review.size}
                            images={review.images}
                            date={review.created_at}
                            helpful_count={review.helpful_count}
                        />
                    )
                })}
                
            </Reviews>
            <Pagination TotalPagesCount={30}/>
        </Container>
    )
}
