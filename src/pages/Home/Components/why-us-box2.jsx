import styled from "styled-components"
import airplane from "../../../assets/airplane.png"

const Container= styled.div`
width:40vw;
height:537px; 
position:relative;
background: ${({$color})=>$color};
border-radius:70px;

@media screen and (max-height:556px){
    height:80vh;
}
@media screen and (max-width:556px){
    height:430px;
}
@media screen and (max-width:600px){
    width:100%;
    aspect-ratio:1/1.4;
    height:auto;
    border-radius:100px;
}
@media screen and (max-width:477px){
    aspect-ratio:1/1.5
}
`
const Border= styled.div`
width:100%;
height:100%;
transform:scale(.92);
border-radius:70px;
background:transparent;
border:6px solid  ${({$border})=>$border};
position:absolute;
@media screen and (max-width:600px){
    border-radius:100px;
}
`

const Content= styled.div`
height:100%;
display:flex;
flex-direction:${({$flex_direction})=>$flex_direction};
justify-content:space-between;
`
const TextContainer = styled.div`
margin:2rem 0 3rem 1rem;
@media screen and (max-width:600px){
    margin:7% 0 10% 7%;
}
@media screen and (max-width:400px){
    margin:9% 0 15% 10%;
}
`
const Title= styled.h2`
font-size:34px;
width:60%;
margin: 0 0 1rem 0;
@media screen and (max-width:1076px){
    font-size:28px;
}
@media screen and (max-width:600px){
    font-size:40px;
}
@media screen and (max-width:477px){
    font-size:30px;
}
@media screen and (max-width:400px){
    font-size:27px;
}
`
const Text= styled.p`
width:73%;
color:white;
font-weight:600;
font-size:18px;
@media screen and (max-width:1076px){
    font-size:14px;
}
@media screen and (max-width:600px){
    font-size:29px;
}
@media screen and (max-width:477px){
    font-size:23px;
}
@media screen and (max-width:400px){
    font-size:18px;
}
`
const Img= styled.img`
width:70%;
margin-left:40%;
transform:rotate(${({$imageRotate}) => $imageRotate});
@media screen and (max-width:1076px){
    width:90%;
}
@media screen and (max-width:600px){
    width:60%;
}
`
export default function WhyUsBox2(props){
    return (
        <Container $color={props.color}>
            <Border $border={props.border}>
                <Content $flex_direction={props.reveres?"column-reverse":"column"}>
                    <Img src={props.img} $imageRotate={props.imgRotate}/>
                    <TextContainer>
                        <Title>{props.title}</Title>
                        <Text>{props.text}</Text>
                    </TextContainer>
                </Content>
            </Border>
        </Container>
    )
}