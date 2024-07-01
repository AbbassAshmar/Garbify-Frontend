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
margin-bottom:8rem;

`
const Text = styled.div`
font-size:var(--heading-2);
font-weight:400;
color:var(--main-color);

padding:0 2rem;
margin-bottom:30vh;
display:flex;
flex-direction:column;

@media screen and (max-width:1024px){
    font-size:var(--heading-4);
}
@media screen and (max-width:800px){
    width:100%;
    margin-bottom:6rem;
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
will-change: transform;
overflow:hidden;
margin:auto;
`

const BigImage = styled.img`
will-change: transform;
height:100%;
width:100%;
object-fit:cover;
`
const textVariants = {
    initial : {
        opacity:0,
        y:-20,
    },
    animate : {
        y:20,
        opacity:1,
        transition:{
            staggerChildren:.02
        }
    }
}

const text = [
    "Discover Timeless Style:",
    "Elevate Your Wardrobe",
    "with Exclusive Collections",
    "Scroll down to explore the",
    "latest fashion trends created",
    "just for you.",
];

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
            return [-800, 200];
        }
    };

    const bigImageY = useTransform(scrollYProgressBigImage, [0,1],calculateBigImageYTrans(width));
    const bigImageScale = useTransform(scrollYProgressBigImage, [.5,.65,1], [.7, 1,1.1]);
    return(
        <Container ref={containerRef}>
            <Text as={motion.div} style={{y:textY}} variants={textVariants} whileInView="animate" viewport={{ once: true }} initial="initial">
                {text.map((line, lineIndex) => (
                    <div key={lineIndex}>
                        {line.split("").map((word, wordIndex) => (
                            <motion.span key={wordIndex} style={{display: 'inline-block'}} variants={textVariants}>
                                {word ==" " ? '\u00A0' : word}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </Text>
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
            <BigImageContainer as={motion.div}>
                <BigImage loading="lazy" ref={bigImageRef} as={motion.img} style={{y:bigImageY,scale:bigImageScale}} src={threeModelsInSuits} alt="three models in suits"/>
            </BigImageContainer>
        </Container>
    )

}

const CardContainer = styled(Link)`
will-change: transform;
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
will-change:transform;
height:100%;
width:100%;
object-fit:cover;
position:relative;
display:block;
scale:1.1;
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
text-align:center;
`
function ProductCardAnimated(){
    const cardContainerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:cardContainerRef,
        offset:['start end' , 'end start']
    })

    const cardContainerY = useTransform(scrollYProgress,[0,1], [40,-40]);
    const cardImageY = useTransform(scrollYProgress,[0,1], [-100,100]);
    const cardImageScale = useTransform(scrollYProgress,[0,0.5,1], [1.1,1.03,1]);

    return (
        <CardContainer ref={cardContainerRef} as={motion.div} style={{y:cardContainerY}}>
            <CardImageContainer>
                <CardImage loading="lazy" as={motion.img} style={{y:cardImageY}} src={woman} alt="product image"/>
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