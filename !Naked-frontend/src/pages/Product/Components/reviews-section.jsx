import styled from "styled-components"
import Review from "./review"
import { useEffect, useState } from "react"
import { ratingToStars } from "./details-container"

import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
import hoody from "../../../assets/Hoody.jpg"
import hoody2 from "../../../assets/Hoody2.jpg"

const Container = styled.div`
background:green;
`
const Header = styled.div`
margin: 0 0 4rem 0;
`
const Title = styled.h2`
font-size:1.8rem;
margin: 0 0 4rem 0;

`
const StarsContainer = styled.div`
display:flex;
gap:8px;
align-items:flex-start;
font-size:1.8rem;
margin:auto;
justify-content:center;

`
const Rating = styled.div`
font-size:1.2em;
font-weight:600;
margin:0;
`
const Stars = styled.div`
display:flex;

`
const Star = styled.img`
width:40px;
`
const Reviews = styled.div`
display:flex;
flex-direction : column;

`
export default function ReviewsSection(){
    const [reviews, setReviews] = useState(rvs)
    const [reviewsDetails, setReviewsDetails] = useState({average_ratings:5 , reviews_count:0})
    async function requestReviews(){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+id+"/reviews");
        const response = await request.json(); 
        if ( request.status == 200){
            setReviews(response.data.reviews)
            setReviewsDetails({average_ratings:response.data.average_ratings,reviews_count:response.data.reviews_count})
        }
    }
    useEffect(()=>{
        // requestReviews()
    },[])
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
                            username={review.username}
                            height={review.user_height}
                            width={review.user_width}
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
        </Container>
    )
}

const rvs = [
    {
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        images:[
            hoody,
            hoody,
            hoody2,
            hoody2
        ],
        user_height:190,
        user_weight:38,
        helpful_count:29,
        created_at:"2033-09-09"
    },
    {
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        images:[
            hoody,
            hoody,
            hoody2
        ],
   
        helpful_count:29,
        created_at:"2033-09-09"
    },
    {
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        user_height:190,
        user_weight:38,
        helpful_count:29,
        created_at:"2033-09-09"
    }
]