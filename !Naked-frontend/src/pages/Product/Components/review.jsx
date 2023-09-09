import styled from "styled-components"
import { ratingToStars } from "./details-container"
import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
const Container = styled.div`
border-bottom:2px solid black;
display:flex;
flex-direction:column;
gap:15px;
`
const UserNameContianer = styled.div`

`
const Name = styled.h2`

`
const StarsContainer = styled.div`
display:flex;
align-items:flex-start;

`
const Rating = styled.p`
`
const Stars = styled.div`

`
const Star = styled.img`
    width:16px;
`
const ProductDetails = styled.div`

`
const CommentContainer =styled.div`

`
const Title = styled.h2`
`
const Comment = styled.p`

`
const ImagesContainer = styled.div`
display:flex;
align-items:flex-end;
gap:5px;

`


const Image = styled.img`
width:10%;
height:100%;
`
const UserInfoContainer = styled.div`
display:flex;
gap:1rem;
`
const Height = styled.div`

`
const Width = styled.div`

`
export default function Review(props){

    return (
        <Container>
            <UserNameContianer>
                <Name>
                    {props.username}
                </Name>
                <StarsContainer>
                    <Rating>{props.rating}</Rating>
                    <Stars>
                        {ratingToStars(props.rating).map((value)=>{
                            if (value === "star") return <Star src={star} />
                            if (value=== "half") return <Star src={half_star} />
                            if (value=== "empty") return <Star src={empty_star} /> 
                        })}
                    </Stars>
                </StarsContainer>
                <ProductDetails>
                    <p>color: red</p>
                    <p>size: xl</p>
                </ProductDetails>
            </UserNameContianer>
            <CommentContainer>
                <Title>

                </Title>
                <Comment>

                </Comment>
            </CommentContainer>
            <ImagesContainer>
                {   props.images && 
                    props.images.map((image)=>{
                        return (
                            <Image src={image}/>
                        )
                    })
                }
            </ImagesContainer>
            <UserInfoContainer>
                <Height>
                    <p>Height : </p>
                    <p>190 cm</p>
                </Height>
                <Width>
                    <p>width: </p>
                    <p>90 kg</p>
                </Width>
            </UserInfoContainer>
        </Container>
    )   
}