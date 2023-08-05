import styled from "styled-components"
import ManInSuit from "../../../assets/ManInSuit.jpg"
import GirlInSuit from "../../../assets/GirlInSuit.jpg"
import { SectionContainer } from "./featured-section"
const Container = styled(SectionContainer)`
`
const Content = styled.div`
width:36%;
margin:auto;
position:relative;
min-width:300px;
margin-right:auto;
height:83vh;
max-height:450px;
overflow:hidden;
@media screen and (min-width:648px){
    height:auto;
    aspect-ratio:1/1.5;
}

@media screen and (min-width:870px){
    height:auto;
    aspect-ratio:1/1.45;
    max-height:500px;

}
@media screen and (min-width:1100px){
    height:auto;
    aspect-ratio:1/1.15;
    max-height:570px;
}

`
const Images = styled.div`
position :absolute;
display:flex;
align-items:flex-end;
justify-content:center;
margin:6.49rem 0 0 0;
min-width:100%;
transform:translateX(-12%);
`
const MainImg = styled.img`
width:70%;
display:block;
max-width:300px;
@media screen and (min-width:870px){
    aspect-ratio:1/1.501;
}

`
const Img = styled.img`
width :50%;
max-width:200px;
position:absolute;
bottom:50%; 
left:63%;
margin:0;
`
const Title =styled.h2`
font-size:3rem;
color:black;
letter-spacing:3px;
transform:rotate(90deg);
position:absolute;
right:-17%;
bottom:14%;
@media screen and (max-width:400px){
    font-size:3rem;
}

@media screen and (min-width:870px){
    right:-14%;
    bottom:14%;
}
@media screen and (min-width:1100px){
    right:2%;
    bottom:14%;
}
`


export default function SuitsSection(){
    return(
        <Container>
            <Content>
                <Images>
                    <MainImg src={GirlInSuit}/>
                    <Img src={ManInSuit}/>
                </Images>
                <Title>Suits?</Title>
            </Content>
        </Container>
    )
}