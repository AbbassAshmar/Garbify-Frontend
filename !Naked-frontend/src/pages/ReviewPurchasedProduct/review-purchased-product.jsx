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
    const {sendRequest, isServerError} = useSendRequest(userContext);

    const {product_id} = useParams();
    const [isReviewed ,setIsReviewed] = useState(false);
    
    
    async function checkIfReviewed(product_id){

        try {
            let url = "http://127.0.0.1:8000/api/products/"+product_id+"/users/user/reviews";
            const response = sendRequest(url)
            setIsReviewed(false)
        }catch(error){
            setIsReviewed(true)
        }
    }

    useEffect(()=>{
        checkIfReviewed(product_id);
    },[])
    
    return (
        <Container>
            {
            isReviewed? 
                <CanNotReview />:
                <ReviewForm />
            }
    
        </Container>
    )
}
