import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CanNotReview from './Componenets/can-not-review';
import ReviewForm from './Componenets/review-form';
import { useSendRequest } from '../../hooks/use-fetch-data';
import useUserState from '../../hooks/use-user-state';

const Container = styled.div`

`

export default function ReviewPurchasedProduct(){
    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const {product_id} = useParams();
    const [isReviewed ,setIsReviewed] = useState(true);
    
    async function checkIfReviewed(product_id){
        let url = "/api/products/"+product_id+"/users/user/reviews";
        const {reqeust,response} = sendRequest(url)
        if (reqeust?.ok){
            setIsReviewed(false)
        }else {    
            setIsReviewed(true)
        }
    }

    async function postFormData(data){
        const uri = '/api/reviews';
        const init = {method:"POST",body:data};
        const {request,response} = await sendRequest(uri,init)

        if (request?.status == 201){
            // handle review post
        }
    }

    function handleReviewFormSubmit (e,stars,product_id,images){
        let form_data = new FormData(e.target);
        form_data.append("product_rating" , stars)
        form_data.append("product_id",product_id)

        for (let x in images){
            images[x].file && form_data.append('images[]', images[x].file);
        }
        
        postFormData(form_data)
    }

    useEffect(()=>{
        // checkIfReviewed(product_id);
    },[])
    
    return (
        <Container>
            {
            isReviewed? 
                <CanNotReview />:
                <ReviewForm handleSubmit={handleReviewFormSubmit}/>
            }
    
        </Container>
    )
}
