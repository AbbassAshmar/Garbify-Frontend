
import styled from "styled-components"
import Model from "../../assets/ModelBg.jpg"
import ModelCropped from "../../assets/ModelCropped.jpg"
import CategorySection from "./Components/category-section"
import FeaturedSection from "./Components/featured-section"
import WhyUsSection from "./Components/why-us-section"
import ImageSection from "./Components/image-section"
import SuitsSection from "./Components/suits-section"
import CardsSection from "./Components/cards-section"
import FormSection from "./Components/form-section"
const Container = styled.div`
background:white;
overflow:hidden;
`
const Section1 = styled.div`
background:url(${Model});
background-position:center;
background-size:cover;
background-repeat : no-repeat;
display:flex;
flex-direction:column;
width:100%;
height:82vh;
max-height:520px; 

@media screen and (max-width:700px){
    background-position:top right;
}
@media screen and (max-width:655px){
background : white;
height:auto;
}


`

const ContentContainer =styled.div`
display:flex;
padding: 0 min(2rem ,5%);
align-items:center;
justify-content:space-between;
width:100%;
height:100%;

@media screen and (max-width:655px){
    flex-direction:column;
}

`
const BackgroundContainer = styled.img`
display:none;
width:120%;

@media screen and (max-width:655px){
display:block;
}
`

const TextContainer =styled.div`
display:flex;
flex-direction:column;
gap:40px;
margin-bottom:3rem;
width:100%;
@media screen and (max-width:655px){
    text-align:center;
    margin-top:1rem;
    gap:30px;
}

`

const MainText =styled.h2`
font-size:4rem;
font-weight:600;

@media screen and (max-width:900px){
    font-size:3rem;
    
}
@media screen and (max-width:785px){
    font-size:2.5rem;
    font-weight:900;
}
@media screen and (max-width:380px){
    font-size:2rem;
}
@media screen and (max-width:320px){
    font-size:1.8rem;
}
@media screen and (max-width:290px){
    font-size:1.5rem;
}
`
const SecondaryText =styled.p`
font-size:1.3rem;
font-weight:600;
opacity:.8;

@media screen and (max-width:900px){
    font-size:1.2rem;
}
@media screen and (max-width:785px){
    font-size:.8rem;
}
@media screen and (max-width:300px){
    font-size:.7rem;
}

`
const ShopNowBtn  = styled.button`
background:black;
width:12%;
min-width:130px;
height:6vh;
max-height:30px;
font-size:16px;
color:white;
outline:none;
border:none;

@media screen and (max-width:655px){
    width:100%;
}
`


export default function Home(){

    return (
        <Container>
            <Section1> 
                <ContentContainer>
                    <TextContainer>
                        <MainText>Naked ? <br/> Not Anymore !</MainText>
                        <SecondaryText>
                            we help people encounter looking <br/>
                            homeless by providing high quality <br/>
                            and superior clothes
                        </SecondaryText>
                        <ShopNowBtn>
                            Shop Now
                        </ShopNowBtn>
                    </TextContainer>
                    <BackgroundContainer src={ModelCropped}/>
                </ContentContainer>
            </Section1>

            <CategorySection />
            <FeaturedSection />
            <WhyUsSection />
            <ImageSection />
            <SuitsSection />
            <CardsSection />
            <FormSection />
        </Container>
    )
}