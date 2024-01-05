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
    const [isReviewed ,setIsReviewed] = useState(false);
    
    
    async function checkIfReviewed(product_id){
        let url = "/api/products/"+product_id+"/users/user/reviews";
        const {reqeust,response} = sendRequest(url)
        if (reqeust?.ok){
            setIsReviewed(false)
        }else {    
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
