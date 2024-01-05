import styled from "styled-components"
import Review from "./review"
import { useContext, useEffect, useState } from "react"
import { ratingToStars } from "./details-container"

import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
import { userStateContext } from "../../../Contexts/user-state"
import Pagination from "../../../components/Pagination/pagination"
import { useSearchParams } from "react-router-dom"
import { REVIEWS } from "../../../components/products-data"
import Loading from "../../../components/Loading/loading"
import { constructUrl } from "../../Orders/orders"
import { useFetchData } from "../../../hooks/use-fetch-data"

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
font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}

`
const StarsContainer = styled.div`
display:flex;
gap:12px;
align-items:center;
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
    const {token} = useContext(userStateContext)
    const [searchParams, setSearchParams] = useSearchParams();

    let init = {headers:{"Authorization":"Bearer " + token}}
    let endpoint_url = "http://127.0.0.1:8000/api/products/" + product_id + "/reviews";
    let url = constructUrl(endpoint_url,searchParams)
    let {data:reviewsData, error:reviewsError, loading:reviewsLoading, setData:setReviews} = useFetchData(url , init, [searchParams]);

    let reviews = reviewsData?.data.reviews || REVIEWS;
    let TotalPagesCount = reviewsData?.metadata.pages_count || [];
    let reviewsDetails = {
        average_ratings:reviewsData?.metadata.average_ratings || 5, 
        reviews_count:reviewsData?.metadata.total_count || 0
    };

    if (reviewsLoading){
        return (<Loading />)
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
                            setReviews ={setReviews}
                            liked={review.is_liked_by_current_user}
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
            <Pagination TotalPagesCount={TotalPagesCount}/>
        </Container>
    )
}
