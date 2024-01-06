import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import {userStateContext} from "../../../Contexts/user-state"
import { useSendRequest } from "../../../hooks/use-fetch-data"
import useUserState from "../../../hooks/use-user-state"
import RatingStars from "../../../components/RatingStars/rating-stars"
import SuccessOrErrorPopUp from "../../../components/SuccessOrErrorPopUp/success-or-error-pop-up"

const Container = styled.div`
width:100%;
border-bottom:2px solid #F1F4F9;
display:flex;
flex-direction:column;
gap:1rem;
padding: min(2rem ,5%) min(2rem ,5%);
@media screen and (max-width:800px){
    padding: 1rem 0;

}
`
const Name = styled.h2`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`
const StarsContainer = styled.div`
display:flex;
align-items:flex-start;

`
const Rating = styled.p`
font-weight:600;
margin:0 7px 0 0;
font-size:clamp(.7rem,2vw,.9rem);

`

const ColorSizeContainer = styled.div`
display:flex;
gap:15px;
`
const ColorSizeText = styled.p`
opacity:.7;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`
const CommentContainer =styled.div`
width:40%;
display:flex;
flex-direction:column;
gap:.2rem;

@media screen and (max-width:600px){
    width:100%;
}
`
const Title = styled.h2`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`
const Date= styled.div`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`
const Comment = styled.p`
font-weight:600;
color:grey;
font-size:clamp(.7rem,2vw,.9rem);
`
const ImagesContainer = styled.div`
display:flex;
align-items:flex-end;
gap:.5rem;
flex-wrap:wrap;
`
const Image = styled.img`
width: max(10%,70px);
height:100%;
`
const UserInfoContainer = styled.div`
display:flex;
gap:1rem;
`

const HeightWeight= styled.p`
margin:0;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
color:grey;
`
const Footer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
@media screen and (max-width:400px){
    flex-direction:column;
    gap:1rem;
}
`
const HelpfulButtonContainer =styled.div`
display:flex;
gap:7px;
align-items:center;
`
const HelpfulText =styled.div`
font-weight:600;
opacity:.7;
font-size:clamp(.7rem,2vw,.9rem);
`
const HelpfulButton = styled.div`
display:flex;
gap:5px;
align-items:flex-end;
margin-left:.5em;
font-size:clamp(.7rem,2vw,.9rem);
`
const HelpfulCount =styled.div`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`
export default function Review(props){
    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const [helpfulCount, setHelpfulCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const {token} = useContext(userStateContext)


    useEffect(()=>{
        setHelpfulCount(props.helpful_count)
        setIsLiked(props.liked)
    },[props])

    async function handleHelpfulButtonClick(){
        const uri = "/api/reviews/"+props.id+"/like";
        const {request,response} = await sendRequest(uri, {method:"POST"})
        if (request?.status == 200){
            setHelpfulCount(response.data.helpful_count)
            setIsLiked(response.data.liked)
        }
    }

    async function requestDelete(){
        const uri ="/api/reviews/"+props.id
        return await sendRequest(uri,{method:"DELETE"})
    }
    
    async function handleDeleteButtonClick(e){
        e.preventDefault();
        const {request,response} = await requestDelete();

        if (request?.status== 200){
            // remove the review from the state
            props.setReviews(reviews=>reviews.filter((review) => review.id != props.id))
        }
    }
    
    return (
        <Container>
            <SuccessOrErrorPopUp serverError={serverError}/>
            <div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",}}>
                    <Name>{props.username}</Name>
                    <Date>{props.date}</Date>
                </div>

                <StarsContainer>
                    <Rating>{props.rating}</Rating>
                    <RatingStars rating={props.rating}/>
                </StarsContainer>

                <ColorSizeContainer>
                        <ColorSizeText>color: {props.color}</ColorSizeText>
                        <ColorSizeText>size: {props.size}</ColorSizeText>
                </ColorSizeContainer>
            </div>
            <CommentContainer>
                <Title>{props.title}</Title>
                <Comment>{props.text}</Comment>
            </CommentContainer>
            {props.images && props.images.length>0 &&
                <ImagesContainer>
                    {   
                        props.images.map((image)=>{
                            return <Image src={image}/>
                        })
                    }
                </ImagesContainer>
            }
            <Footer>
            <UserInfoContainer>
                <div>
                    <p style={{fontWeight:"600",fontSize:"clamp(.7rem,2vw,.9rem)"}}>Height : </p>
                    <HeightWeight>{props.height}</HeightWeight>
                </div>
                <div>
                    <p style={{fontWeight:"600",fontSize:"clamp(.7rem,2vw,.9rem)"}}>Weight : </p>
                    <HeightWeight>{props.weight}</HeightWeight>
                </div>
            </UserInfoContainer>
            <HelpfulButtonContainer>
                <HelpfulText>Found this helpful ?</HelpfulText>
                <HelpfulButton>
                    <i 
                    onClick={()=>handleHelpfulButtonClick} 
                    className={`${!isLiked ? 'fa-regular' :'fa-solid'} fa-thumbs-up`}/>
                </HelpfulButton>
                <HelpfulCount>({props.helpful_count})</HelpfulCount>
            </HelpfulButtonContainer>
            </Footer>
        </Container>
    )   
}