import styled from "styled-components";
import {motion, useScroll, useTransform} from "framer-motion";
import ProductCard from "../../../components/ProductCard/product-card";
import woman from "../../../assets/woman.jpg";
import RatingStars from "../../../components/RatingStars/rating-stars";
import Hoody from "../../../assets/Hoody.jpg";
import threeModelsInSuits from "../../../assets/threeModelsInSuits.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";


const Container = styled.section`
min-height:300vh;
display:flex;
flex-direction:column;
`
const TextContainer = styled.div`
width:100%;
padding:0 2rem;
margin-bottom:10rem;
`

const Text = styled.h1`
font-size:var(--heading-2);
font-weight:bold;
width:43%;
`
const CardsContainer = styled.div`
display:grid;
grid-template-columns: repeat(12, 1fr);
padding:0 2rem;
align-items:start;
`
const ProductCardContainer =styled.div`
grid-column:9 / span 4;
`
const BigImageContainer = styled.div`
overflow:hidden;
margin:auto;
`
const BigImage = styled.img`
height:100%;
width:100%;
object-fit:cover;
scale:1.3;
`

const text= "Discover Timeless Style: Elevate Your Wardrobe with Exclusive Collections. Scroll down to explore the latest fashion trends curated just for you."
export default function ProductsGallery(){
    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:containerRef,
        offset:['start end' , 'end start']
    })

    const textY = useTransform(scrollYProgress, [0,0.4], [280, -200 ]);

    // ------------------------------------------------------
    const bigImageRef = useRef();
    const {scrollYProgress:scrollYProgressBigImage} = useScroll({
        target:containerRef,
        offset:['start start' , 'end start']
    })

    const bigImageScale = useTransform(scrollYProgressBigImage, [0,1], [1.3, 1]);
    const bigImageY = useTransform(scrollYProgressBigImage, [0,1], [-700, 300]);

    const bigImageContY = useTransform(scrollYProgress,[0,1], [0,-200]);
    const bigImageContScale = useTransform(scrollYProgressBigImage, [0,0.7], ["30%", "100%"]);

    return(
        <Container ref={containerRef}>
            <TextContainer as={motion.div} style={{y:textY}}>
                <Text>{text}</Text>
            </TextContainer>
            <CardsContainer>
                <ProductCardContainer style={{gridColumn:"1 / span 4"}}>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer style={{gridColumn:"9 / span 4",position:"relative",bottom:"65%"}}>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer style={{gridColumn:"1 / span 4",marginTop:"40%",position:"relative",bottom:'-30%'}}>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer style={{gridColumn:"9 / span 4",position:"relative",top:"-10%"}}>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer style={{gridColumn:"9 / span 4",position:"relative",bottom:"-20%",zIndex:"4"}}>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
            </CardsContainer>
            <BigImageContainer as={motion.div} style={{width:bigImageContScale,y:bigImageContY}}>
                <BigImage ref={bigImageRef} as={motion.img} style={{scale:bigImageScale,y:bigImageY}} src={threeModelsInSuits} />
            </BigImageContainer>
        </Container>
    )

}

const CardContainer = styled(Link)`
position:relative;
height:fit-content;
transition:box-shadow .3s ,scale .3s;
cursor:pointer;
&:hover{
    scale:1.01;
    box-shadow:0px 0px 12px rgba(0,194,255,1);
}
`

const CardImageContainer = styled.div`
overflow:hidden;
width:100%;
aspect-ratio:1/1.34;
z-index:0;

&::before{
    content:"";
    background:rgba(0,0,0,0.3);
    width:100%;
    height:calc(2px + 100%);
    top:-1px;
    position:absolute;
    z-index:1;
    // box-shadow:inset 0px 0px 12px rgba(0,194,255,1);
}
`
const CardImage = styled.img`
height:100%;
width:100%;
object-fit:cover;
position:relative;
display:block;
scale:1.2;
`

const RatingTypeContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
position:absolute;
top:1rem;
z-index:2;
`
const Type = styled.p`
font-weight:600;
text-shadow : 0 0 4px rgba(0,0,0,0.6);
font-size:var(--heading-6);
color:var(--main-color);
`
const NameContainer = styled.div`
width:100%;
display:flex;
justify-content:center;
position:absolute;
bottom:2rem;
z-index:2;
`
const Name = styled.h6`
font-size:var(--heading-6);
color:var(--main-color);
font-weight:600;
text-shadow : 0 0 4px rgba(0,0,0,0.6);
letter-spacing:2px;
`
function ProductCardAnimated(){
    const cardContainerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:cardContainerRef,
        offset:['start end' , 'end start']
    })

    const cardContainerY = useTransform(scrollYProgress,[0,1], [0,-300]);
    const cardImageY = useTransform(scrollYProgress,[0,1], [-100,200]);
    const cardImageScale = useTransform(scrollYProgress,[0,0.5,1], [1.1,1.03,1]);

    return (
        <CardContainer ref={cardContainerRef} as={motion.div} style={{y:cardContainerY}}>
            <CardImageContainer>
                <CardImage as={motion.img} style={{y:cardImageY,scale:cardImageScale}} src={woman} />
            </CardImageContainer>
            <RatingTypeContainer>
                <RatingStars rating={5}/>
                <Type>Mens Hoody</Type>
            </RatingTypeContainer>
            <NameContainer>
                <Name>Brook f1 best Model Shoes</Name>
            </NameContainer>
        </CardContainer>
    )
}