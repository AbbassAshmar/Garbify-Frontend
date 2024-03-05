import styled from "styled-components";
import {motion, useScroll, useTransform} from "framer-motion";
import ProductCard from "../../../components/ProductCard/product-card";
import woman from "../../../assets/woman.jpg";
import RatingStars from "../../../components/RatingStars/rating-stars";
import Hoody from "../../../assets/Hoody.jpg";
import threeModelsInSuits from "../../../assets/threeModelsInSuits.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../../hooks/use-window-dimensions";

const Container = styled.section`
min-height:300vh;
display:flex;
flex-direction:column;
margin-top:10rem;
`
const TextContainer = styled.div`
width:100%;
padding:0 2rem;
margin-bottom:30vh;
@media screen and (max-width:800px){
    margin-bottom:6rem;
}
`

const Text = styled.span`
font-size:var(--heading-2);
font-weight:400;
width:49%;
color:var(--main-color);
@media screen and (max-width:1024px){
    font-size:var(--heading-4);
}
@media screen and (max-width:800px){
    width:100%;
}
`

const ProductCardContainer =styled.div`
position:relative;

&:nth-child(1){
    grid-column:1 / span 4;
}

&:nth-child(2){
    bottom:0%;
    grid-column: 9 / span 4;
}

&:nth-child(3){
    grid-column: 1 / span 4;
    margin-top:40%;
    bottom:-30%;
}

&:nth-child(4){
    grid-column: 9 / span 4;
    top:-10%;
}

&:nth-child(5){
    grid-column: 9 / span 4;
    bottom:-20%;
}

@media (max-width: 2300px) {
    &:nth-child(2){
        bottom:30%;
    }
}

@media (max-width: 1500px) {
    &:nth-child(2){
        bottom:55%;
    }
}


@media (max-width: 800px) {
    grid-column:1 / span 4 !important;
    position:static;
    &:last-child{
        grid-column:3 / span 2  !important;
    }
    &:nth-child(3){
        margin-top:0%;
    }
}
`

const CardsContainer = styled.div`
display:grid;
grid-template-columns: repeat(12, 1fr);
padding:0 2rem;
align-items:start;


@media (max-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
    padding:0 1rem;

}
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
    const {height, width} = useWindowDimensions();

    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:containerRef,
        offset:['start end' , 'center start']
    })

    const textY = useTransform(scrollYProgress, [0,0.4], [`${width<=800 ? 0 : 280}`, -600 ]);

    // ------------------------------------------------------
    const bigImageRef = useRef();
    const {scrollYProgress:scrollYProgressBigImage} = useScroll({
        target:containerRef,
        offset:[`${width<=800 ? 'center start' : 'start start'}`,  'end start']
    })


    const calculateBigImageYTrans = (width) => {
        if (width <= 500) {
            return [-100, 100];
        } else if (width <= 800) {
            return [-400, 200];
        } else if (width <= 1024) {
            return [-600, 400];
        } else {
            return [-700, 300];
        }
    };
      

    const bigImageY = useTransform(scrollYProgressBigImage, [0,1],calculateBigImageYTrans(width));
    const bigImageScale = useTransform(scrollYProgressBigImage, [0,1], [1.3, 1]);

    const bigImageContY = useTransform(scrollYProgress,[0,1], [0,-200]);
    const bigImageContScale = useTransform(scrollYProgressBigImage, [0,`${width<=500 ? 0.50 : 0.65}`], ["30%", "100%"]);

    const textVariants = {
        initial : {
            opacity:0,
            bottom:-20,
        },
        animate : {
            bottom:20,
            opacity:1,
            transition:{
                color:{
                    duration:.3,
                    delay:1,
                },
                staggerChildren:.04
            }
        }
    }

    return(
        <Container ref={containerRef}>
            <TextContainer as={motion.div} style={{y:textY}}>
                <Text as={motion.h1} variants={textVariants} whileInView="animate"   viewport={{ once: true }} initial="initial">
                    {text.split("").map((letter)=> (
                        <motion.span style={{position:"relative",display:'inline'}} variants={textVariants}>
                            {letter}
                        </motion.span>
                    ))}
                </Text>
            </TextContainer>
            <CardsContainer>
                <ProductCardContainer>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer>
                    <ProductCardAnimated product={{name:"djklajdf SKLdjf",thumbnail:Hoody}}/>
                </ProductCardContainer>
                <ProductCardContainer style={{zIndex:"4"}}>
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