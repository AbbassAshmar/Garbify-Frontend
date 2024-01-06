import styled from "styled-components"
import girl from "../../../assets/girl.png"

const Container= styled.div`
width:100%;
height:537px; // 70vh
position:relative;
border-radius:70px;
background:linear-gradient(#FA00FF,rgba(250,0,255 ,.2));
overflow:hidden;
@media screen and (max-height:557px){
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
transform:scale(.9);
width:100%;
height:100%;
background:transparent;
border:3px solid #FF43CA;
position:absolute;
border-radius:70px;
display:flex;
align-items:flex-end;
justify-content:center;
@media screen and (max-width:600px){
    border-radius:100px;
}
`
const Content= styled.div`
width:80%;
height:100%;
transform:translateY(6.5%);
display:flex;
flex-direction:column;
justify-content:space-between;
`
const Title= styled.h2`
width:240px;
font-size:2rem;
letter-spacing:2px;
line-height:40px;
color:white;
@media screen and (max-width:1050px){
    font-size:1.6rem;
    letter-spacing:1px;
    line-height:33px;
}
@media screen and (max-width:600px){
    font-size:40px;
    letter-spacing:2px;
    line-height:45px;
}
@media screen and (max-width:477px){
    font-size:30px;
}
@media screen and (max-width:350px){
    font-size:20px;
    letter-spacing:1px;
    line-height:30px;
    width:80%;
    margin-left:1rem;
    margin-top:1rem;
}
`
const ImgBtnContainer  = styled.div`
display:flex;
align-items: center;
width:110%;
justify-content:space-between;

`
const Img= styled.img`
width:200px;
@media screen and (max-width:1000px){
    width:160px
}
@media screen and (max-width:600px){
    width:50%;
}
@media screen and (max-width:477px){
width:40%;
}
`

const Button= styled.button`
margin:20% 0 0 0;
font-weight:600;
padding:1.5% 7%;
border-radius:30px;
border:none;

@media screen and (max-width:472px){
    margin:0 0 0 0;
}
@media screen and (max-width:400px){
    padding:1.5% 5%;
}
`
export default function WhyUsBox1(){
    return (
        <Container>
            <Border>
                <Content>
                    <Title>
                        Experience luxury with our 
                        high-quality materials   
                    </Title>
                    <ImgBtnContainer>
                        <Button>View Collection</Button>
                        <Img src={girl}/>
                    </ImgBtnContainer>
                </Content>
            </Border>
        </Container>

    )
}