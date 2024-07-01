import { useState } from "react";
import { REVIEWS_USERS_PRODUCTS } from "../../components/products-data";
import { useFetchData, useSendRequest } from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import { useParams } from "react-router-dom";
import ReviewForm from "../ReviewForm/review-form";
import Loading from "../../components/Loading/loading";
import Error from "../Error/error";

export default function EditReview(){
    const {review_id} = useParams();

    let userContext = useUserState();

    let {data, loading, error} = useFetchData('/api/reviews'+review_id,[review_id],userContext);
    let review = data?.data.review;

    if (loading){
        return <Loading />
    }

    if (error){
        return <Error error={{statusCode:error.error.code,message:error.error.message}} />
    }

    return (
        <>{review &&  <ReviewForm review={review} />}</>
    )
}
