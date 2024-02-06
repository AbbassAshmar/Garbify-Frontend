import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CanNotReview from './Componenets/can-not-review';
import { useSendRequest } from '../../hooks/use-fetch-data';
import useUserState from '../../hooks/use-user-state';
import ReviewForm from '../ReviewForm/review-form';
import Error from '../Error/error';
import Loading from '../../components/Loading/loading';

const Container = styled.div`

`

export default function CreateReview(){
    const {product_id} = useParams();

    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const [isReviewed ,setIsReviewed] = useState(true);
    const [reviewId, setReviewId] = useState(null);
    const [error , setError] =  useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0)
    },[])


    async function checkIfReviewed(product_id){
        setLoading(true)

        let url = "/api/products/"+product_id+"/users/user/is_reviewed";
        const {request,response} = await sendRequest(url)

        if (!request){
            setError({code: 500,message:"Oops...Looks like our servers are down !"})
        }

        if (request && !request.ok){
            setError({code:request.status, message:response.error.message})
        }

        if (request && request.ok){
            let is_reviewed = response.data.is_reviewed
            setIsReviewed(is_reviewed);
            setReviewId(response.metadata.review_id);
        }

        setLoading(false)
    }

    useEffect(()=>{
        checkIfReviewed(product_id);
    },[])

    if (loading){
        return (
            <div style={{display:'flex',minHeight:'10vh',overflow:'hidden'}}>
                {/* <Loading /> */}
            </div>
        )
    }

    if (error){
        return (<Error error={error} />);
    }
    
    return (
        <Container>
            {isReviewed? 
                <CanNotReview reviewId={reviewId}/>:
                <ReviewForm />
            }
        </Container>
    )
}
