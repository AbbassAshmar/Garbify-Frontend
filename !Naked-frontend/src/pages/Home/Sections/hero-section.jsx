import styled from "styled-components"
import HeroSectionGirl from "../../../assets/HeroSectionGirl.png";

const Container = styled.section`
background:white;
width:100%;
height:83vh;

@media screen and (max-width:800px){
    background : white;
    background-position:top right;
    height:auto;
    max-height:none; 
}

@media screen and (min-width:800px) and (min-height:1000px){
    max-height: 45vh;
}
`

const Content =styled.div`
gap:6rem;
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:space-between;
border:1px solid black;
@media screen and (max-width:800px){
    flex-direction:column;
}
`
const ImageSection = styled.div`
// flex:1;
width:50%;

height:100%;
display:flex;
align-items:center;
justify-content:flex-end;
background:blue;
position:relative;
@media screen and (max-width:800px){
    display:block;
}
`
const ImageSectionBackground = styled.div`
top:0;
left:0;
width:70%;
height:100%;
position:absolute;
background:var(--main-color);
`
const ImageContainer = styled.div`
width:55%;
position:relative;
aspect-ratio:1/1.34;
box-shadow: 16px 10px 47px -16px #00C2FF;
`
const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const TextSection =styled.div`
// flex:.8;
// width:80%;
width:40%;
display:flex;
padding-right:2rem;
justify-content:flex-end;

`
const TextContainer = styled.div`
gap:4rem;
display:flex;
flex-direction:column;
`
const TextWrapper = styled.div`
gap:2rem;
display:flex;
flex-direction:column;
@media screen and (max-width:800px){
    text-align:center;
    margin-top:1rem;
    gap:30px;
}
`
const MainText =styled.h1`
font-weight:bold;
// min-width:500px;
font-size:var(--heading-1);
line-height:105.6%;
letter-spacing:-0.02em;
position:relative;
padding-bottom:2rem;
&:before{
    content : "";
    left: 0;
    bottom : 0;
    height: 1px;
    width: 35%;  
    position:absolute;
    border-bottom:5px solid #00C2FF;
}
`
const SecondaryText =styled.p`
font-size:var(--heading-6);
font-weight:600;
color:grey;
`
const ShopNowButton  = styled.button`
width:40%;
height:40px;
color:white;
outline:none;
border:none;
font-size:1rem;
max-width:312px;
font-weight:600;
border-radius:3px;
background:var(--main-color);
box-shadow:10px 9px 12px -3px rgba(0,0,0,0.4) ;
@media screen and (max-width:800px){
    font-size:.8rem;
    width:100%;
}
`

export default function HeroSection(){
    return (
        <Container> 
            <Content>
                <ImageSection>
                    <ImageSectionBackground/>
                    <ImageContainer>
                        <Image src={HeroSectionGirl} alt="stylish girl"/>
                    </ImageContainer>
                </ImageSection>
                <div style={{flex:'1'}}></div>
                <TextSection>
                    <TextContainer>
                        <TextWrapper>
                            <MainText>Naked ? <br/> Not Anymore !</MainText>
                            <SecondaryText>
                                we help people encounter looking 
                                homeless by providing high quality 
                                and superior clothes
                            </SecondaryText>
                        </TextWrapper>
                        <ShopNowButton>Shop Now</ShopNowButton>
                    </TextContainer>
                </TextSection>
            </Content>
        </Container>
    )
}