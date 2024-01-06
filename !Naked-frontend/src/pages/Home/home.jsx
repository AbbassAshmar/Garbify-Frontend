
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

const ContentContainer =styled.div`
display:flex;
padding: 0 min(2rem ,5%);
align-items:center;
justify-content:space-between;
width:100%;
height:100%;
@media screen and (max-width:800px){
    flex-direction:column;
}
`
const BackgroundContainer = styled.img`
display:none;
width:120%;

@media screen and (max-width:800px){
    display:block;
}
`

const TextContainer =styled.div`
display:flex;
flex-direction:column;
gap:40px;
margin-bottom:3rem;
width:100%;
@media screen and (max-width:800px){
    text-align:center;
    margin-top:1rem;
    gap:30px;
}
`

const MainText =styled.h2`
font-weight:600;
font-size:clamp(1.5rem,6vw,3rem);
`
const SecondaryText =styled.p`
font-size:clamp(.8rem,4vw,1.7rem);
font-weight:600;
opacity:.7;
`
const ShopNowBtn  = styled.button`
background:black;
width:12%;
min-width:130px;
height:6vh;
max-height:30px;
color:white;
outline:none;
border:none;


font-size:1rem;
font-weight:600;
@media screen and (max-width:800px){
    font-size:.8rem;
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
                        <ShopNowBtn>Shop Now</ShopNowBtn>
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