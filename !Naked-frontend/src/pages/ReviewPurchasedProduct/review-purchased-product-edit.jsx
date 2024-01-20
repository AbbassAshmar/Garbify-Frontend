import { useState } from "react";
import { REVIEWS_USERS_PRODUCTS } from "../../components/products-data";
import { useSendRequest } from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import ReviewForm from "./Componenets/review-form";
import { useParams } from "react-router-dom";




export default function ReviewPurchasedProductEdit(){
    const {review_id} = useParams();
    let [review, setReview] = useState(REVIEWS_USERS_PRODUCTS[0]||null);

    let userContext = useUserState();
    let {sendRequest,serverError} = useSendRequest(userContext);


    async function fetchReview(){
        let uri = '/api/reviews/'+review_id;
        let {request, response} = sendRequest(uri);

        if (!request){
            // server error navigate to error page

        }

        if (request.status == 404){
            // navigate to review not found page
        }

        if (request.ok){
            setReview(response.data.review);
        }
    }

    return (
        <ReviewForm review={review} />
    )
}
