import { REVIEWS_USERS_PRODUCTS } from "../../components/products-data";
import ReviewForm from "./Componenets/review-form";




export default function ReviewPurchasedProductEdit(){

    // request review 
    let review = REVIEWS_USERS_PRODUCTS[0];

    return (
        <ReviewForm review={review}/>
    )
}
