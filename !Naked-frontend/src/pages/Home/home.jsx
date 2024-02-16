
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
import HeroSection from "./Sections/hero-section";

const Container = styled.div`
background:white;
overflow:hidden;
`



export default function Home(){

    return (
        <Container>
            <HeroSection />
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