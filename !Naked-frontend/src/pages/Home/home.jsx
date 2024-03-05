
import styled from "styled-components"
import CategorySection from "./Sections/category-section"
import FeaturedSection from "./Sections/featured-section"
import WhyUsSection from "./Sections/why-us-section-ver2";
import ImagesSection from "./Sections/images-section"
import SuitsSection from "./Sections/suits-section"
import BestSellingSection from "./Sections/best-selling-section";
import FormSection from "./Sections/form-section";
import HeroSection from "./Sections/hero-section";
import ProductsGallery from "./Sections/products-gallery";
import { useEffect } from "react";

import Lenis from '@studio-freight/lenis';

const Container = styled.div`
background:white;
display:flex;
flex-direction:column;
gap:6rem;
scroll-behavior:smooth;
`



export default function Home(){
    
    // useEffect(()=>{
    //     const lenis = new Lenis()

    //     function raf(time) {
    //         lenis.raf(time)
    //         requestAnimationFrame(raf)
    //     }
    //     requestAnimationFrame(raf)
    // })

    return (
        <Container>
            <HeroSection />
            <CategorySection />
            <FeaturedSection />
            <WhyUsSection />
            <ImagesSection />
            <ProductsGallery />
            <SuitsSection />
            <BestSellingSection />
            <FormSection />
        </Container>
    )
}