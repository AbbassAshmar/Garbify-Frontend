import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import {userStateContext} from "../../Contexts/user-state"
import { useSendRequest } from "../../hooks/use-fetch-data"
import useUserState from "../../hooks/use-user-state"
import RatingStars from "../RatingStars/rating-stars"
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up"

const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:2rem;
// border-bottom:2px solid #F1F4F9;
// padding: min(2rem ,5%) min(2rem ,5%);
@media screen and (max-width:800px){
    padding: 1rem 0;
}
`

const ReviewCardHeader = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
gap:2rem;
`

const DetailsDateContainer = styled.div`
display:flex;
align-items:flex-start;
justify-content:space-between;
width:100%;
`

const RatingContainer =styled.div`
display:flex;
align-items:flex-start;
flex-direction:column;
gap:.4rem;
`

const StarsContainer = styled.div`
display:flex;
align-items:flex-end;
`
const Rating = styled.p`
font-weight:600;
margin:0 7px 0 0;
font-size:clamp(.7rem,2vw,.9rem);
`
const WouldBuyAgain = styled.div`
display:flex;
align-items:flex-end;
color:${({$color})=>$color};
`
const WouldBuyAgainText = styled.p`
margin:0;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
margin-left:8px;
`
const CommentContainer =styled.div`
width:60%;
display:flex;
flex-direction:column;
gap:.4rem;

@media screen and (max-width:600px){
    width:100%;
}
`
const Title = styled.h2`
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
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

const ImagesHelpfulButton = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:flex-end;
gap:2rem;
@media screen and (max-width:800px){
    flex-direction:column;
    align-items:flex-start;
}
`

const ImagesContainer = styled.div`
display:flex;
align-items:flex-end;
justify-content:flex-start;
gap:.5rem;
flex-wrap:wrap;
max-width:80%;
margin-top:1rem;
`

const Image = styled.img`
// width: max(10%,80px);
// width:150px;
width:30%;
max-width:300px;
min-width:80px;
height:100%;
`

const HelpfulButtonContainer =styled.div`
display:flex;
gap:7px;
align-items:center;
`
const HelpfulText =styled.div`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
color:grey;
text-wrap:nowrap;
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
const UserSectionContainer = styled.div`
display:flex;
gap:5px;
`
const ProfilePicture = styled.img`
width:50px;
border-radius:50%;
`

const UserDetailsContainer = styled.div`
display:flex;
flex-direction:column;
gap:3px;
`

const UserName = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`

const OtherUserInfoContainer = styled.div`
display:flex;
flex-direction:column;
gap:1.5px;
`
const OtherUserInfo = styled.p`
font-weight:600;
color:grey;
font-size:clamp(.65rem,1.8vw,.8rem);
`

const StatusCircle = styled.div`
width:18px;
height:18px;
background:${({$color})=>$color};
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
@media screen and (max-width:600px){
    width:13px;
    height:13px;
}
`

const Icon = styled.i`
font-size:.7rem;
color:white;
display:block;
text-shadow:0px 1px 3px black;
padding:1px 0 0 0;
@media screen and (max-width:600px){
    font-size:.5rem;
    padding: 0 0 .5px 0;
}
`

export default function ReviewCard({review,user}){
    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const [helpfulCount, setHelpfulCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    const hasUser = !!user;

    // useEffect(()=>{
    //     setHelpfulCount(review.helpful_count)
    //     setIsLiked(review.liked)
    // },[props])

    async function handleHelpfulButtonClick(){
        const uri = "/api/reviews/"+review.id+"/like";
        const {request,response} = await sendRequest(uri, {method:"POST"})
        if (request?.status == 200){
            setHelpfulCount(response.data.helpful_count)
            setIsLiked(response.data.liked)
        }
    }

    // async function requestDelete(){
    //     const uri ="/api/reviews/"+review.id
    //     return await sendRequest(uri,{method:"DELETE"})
    // }
    
    // async function handleDeleteButtonClick(e){
    //     e.preventDefault();
    //     const {request,response} = await requestDelete();

    //     if (request?.status== 200){
    //         // remove the review from the state
    //         review.setReviews(reviews=>reviews.filter((review) => review.id != review.id))
    //     }
    // }

    const renderUserSection = ()=>{
        return(
            <UserSectionContainer>
                <ProfilePicture src={userContext.user?.profile_picture}/>
                <UserDetailsContainer>
                    <UserName>{user.name}</UserName>
                    <OtherUserInfoContainer>
                        <OtherUserInfo>height: {review.user_height} / weight: {review.user_weight}</OtherUserInfo>
                        <OtherUserInfo>color: {review.color} / size: {review.size}</OtherUserInfo>
                    </OtherUserInfoContainer>
                </UserDetailsContainer>
            </UserSectionContainer>
        )
    }

    const renderRating = ()=>{
        return (
            <RatingContainer>
                <StarsContainer>
                    <Rating>{review.product_rating}</Rating>
                    <RatingStars width={'20px'} $width_600={'15px'} rating={review.product_rating}/>
                </StarsContainer>
                <WouldBuyAgain $color={review.would_buy_again?"green":'red'}> 
                    {review.would_buy_again && (
                        <>
                            <StatusCircle $color={'rgba(0,255,0,.8)'}>
                                <Icon className="fa-solid fa-check"/> 
                            </StatusCircle>
                            <WouldBuyAgainText>I would buy again</WouldBuyAgainText>
                        </>
                    )}
                    {!review.would_buy_again && (
                        <>
                            <StatusCircle $color={'rgba(255,0,0,0.8)'}>
                                <Icon className="fa-solid fa-xmark"/>
                            </StatusCircle>
                            <WouldBuyAgainText>I would not buy again</WouldBuyAgainText>
                        </>
                    )}
                </WouldBuyAgain>
            </RatingContainer>
        )
    }

    return (
        <Container>
            <SuccessOrErrorPopUp serverError={serverError}/>

            <ReviewCardHeader>
                <DetailsDateContainer>
                    {hasUser && <>{renderUserSection()}</>}
                    {!hasUser && <>{renderRating()}</>}
                    <Date>{review.created_at}</Date>
                </DetailsDateContainer>
                {hasUser && <>{renderRating()} </>}
            </ReviewCardHeader>


            <CommentContainer>
                <Title>{review.title}</Title>
                <Comment>{review.text}</Comment>
            </CommentContainer>

            <ImagesHelpfulButton>
                {review.images && review.images.length>0 &&
                    <ImagesContainer>
                        {review.images && (
                            review.images.map((image)=> <Image src={image}/>)   
                        )}
                    </ImagesContainer>
                }

                <HelpfulButtonContainer>
                    <HelpfulText>Found this helpful ?</HelpfulText>
                    <HelpfulButton>
                        <i 
                        onClick={()=>handleHelpfulButtonClick} 
                        className={`${!isLiked ? 'fa-regular' :'fa-solid'} fa-thumbs-up`}/>
                    </HelpfulButton>
                    <HelpfulCount>({review.helpful_count})</HelpfulCount>
                </HelpfulButtonContainer>
            </ImagesHelpfulButton>

        </Container>
    )   
}