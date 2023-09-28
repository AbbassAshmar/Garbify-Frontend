import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CanNotReview from './Componenets/can-not-review';
import ReviewForm from './Componenets/review-form';
const Container = styled.div`

`
export default function Review(){
    const {product_id} = useParams();
    const [isReviewed ,setIsReviewed] = useState(false);
    
    async function checkIfReviewed(product_id){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+product_id+"/users/user/reviews");
        const response = await request.json(); 
        if ( request.status == 200){
            setIsReviewed(true)
        }
        else {
            setIsReviewed(false)
        }
    }

    useEffect(()=>{
        // checkIfReviewed(product_id);
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
