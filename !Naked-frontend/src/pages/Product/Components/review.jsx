import styled from "styled-components"
import { ratingToStars } from "./details-container"
import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
import { useContext, useEffect, useState } from "react"
import {userStateContext} from "../../../Contexts/user-state"
import { useSendRequest } from "../../../hooks/use-fetch-data"
import useUserState from "../../../hooks/use-user-state"

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
font-weight:800;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const StarsContainer = styled.div`
display:flex;
align-items:flex-start;

`
const Rating = styled.p`
font-weight:600;
margin:0 7px 0 0;

font-size:.9rem;
@media screen and (max-width:800px){
    font-size:.7rem;
}
`
const Star = styled.img`
    width:16px;
`
const ColorSizeContainer = styled.div`
display:flex;
gap:15px;
`
const ColorSizeText = styled.p`
opacity:.7;
font-weight:600;

font-size:.9rem;
@media screen and (max-width:800px){
    font-size:.7rem;
}
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
font-weight:800;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Date= styled.div`
font-weight:800;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Comment = styled.p`
font-weight:600;

font-size:.9rem;
@media screen and (max-width:800px){
    font-size:.7rem;
}

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
opacity:.7;

font-size:.9rem;
@media screen and (max-width:800px){
    font-size:.7rem;
}
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
align-items:flex-end;
`
const HelpfulText =styled.div`
font-weight:600;
opacity:.7;

font-size:.9rem;
@media screen and (max-width:800px){
    font-size:.7rem;
}
`
const HelpfulButton = styled.div`
display:flex;
gap:5px;
align-items:flex-end;
margin-left:.5em;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}`
const HelpfulCount =styled.div`
font-weight:600;

font-size:.9rem;
@media screen and (max-width:800px){
    font-size:.7rem;
}
`
export default function Review(props){
    const userContext = useUserState();
    const {sendRequest, isServerError} = useSendRequest(userContext);

    const [helpfulCount, setHelpfulCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const {token} = useContext(userStateContext)

    const init = (method) => {
        return {
            type:method, 
            headers : {
                "accepts" :"application/json",
                "Content-type" : "application/json" ,
                "Authorization" : "Bearer " + token
            }
        }
    }

    useEffect(()=>{
        setHelpfulCount(props.helpful_count)
        setIsLiked(props.liked)
    },[props])

    async function handleHelpfulButtonClick(){
        let url = "http://127.0.0.1:8000/api/reviews/"+props.id+"/like";
        try {
            const response = await sendRequest(url, init("POST"))
            if (response){
                setHelpfulCount(response.data.helpful_count)
                setIsLiked(response.data.liked)
            }
        }catch(error){
            
        }
    }

    async function requestDelete(){
        let url ="http://127.0.0.1:8000/api/reviews/"+props.id
        return await sendRequest(url,init("DELETE"))
    }
    
    async function handleDeleteButtonClick(e){
        e.preventDefault();
        try {
            const response = await requestDelete();

            // remove the review from the state
            props.setReviews(reviews=>reviews.filter((review) => review.id != props.id))
        }catch(error){

        }
    }
    
    return (
        <Container>
            <div>
                <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between",}}>
                    <Name>{props.username}</Name>
                    <Date>{props.date}</Date>
                </div>
                <StarsContainer>
                    <Rating>{props.rating}</Rating>
                    <div>
                        {ratingToStars(props.rating).map((value)=>{
                            if (value === "star") return <Star src={star} />
                            if (value=== "half") return <Star src={half_star} />
                            if (value=== "empty") return <Star src={empty_star} /> 
                        })}
                    </div>
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
                            return (
                                <Image src={image}/>
                            )
                        })
                    }
                </ImagesContainer>
            }
            <Footer>
            <UserInfoContainer>
                <div>
                    <HeightWeight>Height : </HeightWeight>
                    <HeightWeight>{props.height}</HeightWeight>
                </div>
                <div>
                    <HeightWeight>Weight: </HeightWeight>
                    <HeightWeight>{props.weight}</HeightWeight>
                </div>
            </UserInfoContainer>
            <HelpfulButtonContainer>
                <HelpfulText>Found this helpful ?</HelpfulText>
                <HelpfulButton>
                    {
                        !isLiked ? 
                        <i 
                        onClick={()=>handleHelpfulButtonClick} 
                        className="fa-regular fa-thumbs-up"/>
                        :
                        <i  
                        onClick={()=>handleHelpfulButtonClick}
                        className="fa-solid fa-thumbs-up"/>
                    }
                </HelpfulButton>
                <HelpfulCount>({props.helpful_count})</HelpfulCount>
            </HelpfulButtonContainer>
            </Footer>
        </Container>
    )   
}