import styled from "styled-components"
import HeroSectionGirl from "../../../assets/HeroSectionGirl.png";

const Container = styled.section`
background:white;
width:100%;

@media screen and (max-width:1024px){
    height:auto;
}
`

const Content =styled.div`
gap:4rem;
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:space-between;
@media screen and (max-width:1024px){
    flex-direction:column-reverse;
    align-items:flex-start;
}

@media screen and (max-width:800px){
    gap:2rem;
}

`
const ImageSection = styled.div`
width:48.6%;
height:100%;
display:flex;
position:relative;
align-items:center;
padding: 1rem  0;
justify-content:flex-end;

@media screen and (max-width:1200px){
    width:43%;
}
@media screen and (max-width:1024px){
    width:calc(100% - 2rem);
    padding: 2rem 0;
}
@media screen and (max-width:800px){
    padding: 1rem 0;
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
width:68%;
position:relative;
aspect-ratio:1/1.34;

@media screen and (max-width:1400px){
    width:60%;
}

@media screen and (max-width:1200px){
    width:72%;
}

@media screen and (max-width:1000px){
    width:86%;
}

@media screen and (max-width:800px){
    width:90%;
}
`
const Image = styled.img`
box-shadow: 16px 10px 47px -16px #00C2FF;

width:100%;
height:100%;
object-fit:cover;
`
const TextSection =styled.div`
width:40%;
display:flex;
padding:0 2rem 0 0;
justify-content:flex-end;
@media screen and (max-width:1200px){
    width:48%;
}
@media screen and (max-width:1024px){
    width:60%;
    padding:2rem 0 0 2rem;
}
@media screen and (max-width:800px){
    width:100%;
    padding:1rem 1rem 0 1rem;
}
`
const TextContainer = styled.div`
gap:4rem;
display:flex;
flex-direction:column;
@media screen and (max-width:800px){
    gap:2rem;
}
`
const TextWrapper = styled.div`
gap:2rem;
display:flex;
flex-direction:column;
@media screen and (max-width:800px){
    gap:1.5rem;
}
`
const MainText =styled.h1`
font-weight:bold;
font-size: var(--big-1);
line-height:105px;
letter-spacing:-0.02em;
position:relative;
padding-bottom:2rem;
@media screen and (max-width:800px){
    padding-bottom:1.5rem;
}
&:before{
    content : "";
    left: 0;
    bottom : 0;
    height: 1px;
    width: 35%;  
    position:absolute;
    border-bottom:8px solid #00C2FF;
    @media screen and (max-width:1400px){
        border-bottom:5px solid #00C2FF;
    }
}

@media screen and (max-width:1820px){
    font-size:var(--big-2);
    line-height:83px;
}

@media screen and (max-width:1470px){
    font-size:var(--heading-1);
    line-height:66px;
}

@media screen and (max-width:600px){
    line-height:35.2px;
    font-size:var(--heading-1-mobile);
}
`
const SecondaryText =styled.p`
color:grey;
font-weight:600;
line-height:40px;
font-size:var(--heading-4);

@media screen and (max-width:1820px){
    font-size:var(--heading-5);
    line-height:32.5px;
}

@media screen and (max-width:1470px){
    font-size:var(--heading-6);
    line-height:26px;
}

@media screen and (max-width:600px){
    line-height:20px;
    font-size:var(--body);
}
`
const ShopNowButton  = styled.button`
width:50%;
height:50px;
color:white;
outline:none;
border:none;
cursor:pointer;
max-width:312px;
font-weight:600;
border-radius:3px;
transition:background .3s;
font-size:var(--heading-5);
background:var(--main-color);
box-shadow:10px 9px 12px -3px rgba(0,0,0,0.4) ;
@media screen and (max-width:1470px){
    font-size:var(--body);
    height:40px;
}

@media screen and (max-width:800px){
    width:45%;
    min-width:164px;
    height:40px;
    max-width:none;
}

@media screen and (max-width:600px){
    height:35px;
}

&:hover{
    background:#009BCC;
}
`

export default function HeroSection(){
    return (
        <Container> 
            <Content>
                <ImageSection>
                    <ImageSectionBackground/>
                    <ImageContainer>
                        <Image loading="eager" src={HeroSectionGirl} alt="stylish girl"/>
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