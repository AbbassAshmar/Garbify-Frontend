import styled from "styled-components";
import ManRating from "../../assets/ManRating.png"
import { CheckCircle, DoneContainer, DoneWord, TextContainer, TitleContainer,Title,SubText,EditReviewButton} from "../ReviewPurchasedProduct/Componenets/can-not-review";
import useUserState from "../../hooks/use-user-state";
import { useFetchData, useSendRequest } from "../../hooks/use-fetch-data";
import { PRODUCTS } from "../../components/products-data";
import { useEffect, useRef, useState } from "react";
import SimplifiedReviewProductCard from "../../components/SimplifiedProductCard/simplified-review-product-card";
import { motion, useAnimation, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import SimplifiedProductCard from "../../components/SimplifiedProductCard/simplified-product-card";
import ProductCard from "../../components/ProductCard/product-card";

const Container = styled.div`
overflow:hidden;
display:flex;
flex-direction:column;
margin:auto;
position:relative;
background:white;
margin: 2rem 0;

`

const FirstSection = styled.div`
display:flex;
width:100%;
position:relative;
z-index:1;
background:red;
min-height:55vh;
@media screen and (max-width:800px){
    flex-direction:column;
    gap:2rem;
}
`
const ContinueShoppingBtn  = styled(EditReviewButton)`
width:230px;
`

const ImageContainer = styled.div`
position:relative;
flex:1;
margin-right:2rem;
`

const Image = styled.img`
width:100%;
object-fit:cover;
`
const LightBlueBackground = styled.div`
position:absolute;
width:900px;
height:600px;
background: #86E2FF;
border-radius:50%;
bottom:-140%;
right:-50%;
z-index:-1;
transform:rotate(-20deg);
`

const SecondSection = styled.div`
z-index:2;
width:100%;
height:200vh;
position:relative;
background:yellow;

&:before{
    content:"";
    width:200%;
    height:100%;
    margin:auto;
    border-radius:50%;
    transform:rotate(${({$rotate})=>$rotate})  translateX(-20%) translateY(-5%);
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position:absolute;
    z-index:0;
    background: linear-gradient(to bottom, #00C2FF 10%,#86E2FF);
}
`
const SecondSectionContent = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:4rem;
padding:20% 0 0 2rem;
z-index:3;
position:relative;
justify-content:center;
`
const CardsTitle = styled.h4`
font-size: var(--heading-4);
font-weight:600;
`

const ProductCardsContainer=  styled.div`
display:flex;
gap:2rem;
width:70%;
align-self:center;
`
const CardContainer = styled.div`
flex:1;
transition:transform .1s;
`
const ThirdSection = styled.div`
width:100%;
background:red;

z-index:0;
`

const ThirdSectionContent = styled.div`
gap:4rem;
width:100%;
padding: 0 2rem;
display:flex;
flex-direction:column;
justify-content:center;
`

const FourthSection = styled.div`
height:100vh;
background:pink;
position:relative;
`


const cardsTitleVariant = {
    'initial': {
        x:-100,
        opacity: 0,
    },
    'animate': {
        x:0,
        opacity: 1,
        transition:{
            duration:.4,
            delay:.3
        }
    }
};

const cardVariant = {
    'initial': {
        y:100,
        opacity: 0,
    },
    'animate': (delay=0)=> ({
        y:0,
        opacity: 1,
        transition:{
            duration:.3,
            delay:delay
        }
    })
}

export default function ReviewSuccess({action}){
    const userContext = useUserState();
    let unReviewedProductsUri = '/api/users/user/products/unreviewed';
    const {data:unReviewedProductsData,loading,error} = useFetchData(unReviewedProductsUri,[],userContext);
    let unReviewedProducts =unReviewedProductsData?.data.products || PRODUCTS;

    const [rotationState, setRotationState] = useState("-14deg");

    const firstSectionRef = useRef();
    const secondSectionRef = useRef();
    const thirdSectionRef = useRef();
    const forthSectionRef = useRef();
    const card1Ref = useRef();
    const card2Ref = useRef();

    // const {scrollY} = useScroll();

    const {scrollYProgress} = useScroll({
        target:firstSectionRef,
        // start of firstSectionRef meets end of viewport = 0
        offset: ["-18vh", "end start"]

    });

    const {scrollYProgress:secondSectionScrollYProgress} = useScroll({
        target:secondSectionRef,
        offset:['center start','end start']
    })

    const {scrollYProgress:card1ScrollYProgress} = useScroll({
        target:card1Ref,
        offset:['start start','end start']
    })

    const {scrollYProgress:card2ScrollYProgress} = useScroll({
        target:card2Ref,
        offset:['start start','end start']
    })

    const {scrollYProgress:thirdSectionScrollYProgress} = useScroll({
        target:thirdSectionRef,
        offset:['start start','end start']
    })

    let firstSectionY = useTransform(scrollYProgress,[0,1],["0%", "100%"]);
    let secondSectionY = useTransform(scrollYProgress,[0,1],["0%", "200%"]);

    let backgroundRotation = useTransform(scrollYProgress,[0,1],["-14deg", "0deg"]);
    let secondSectionExit = useTransform(secondSectionScrollYProgress,[0,1],['0deg','30deg']);

    let card1Y = useTransform(card1ScrollYProgress,[0,1],["0%", "-50%"]);
    let card2Y = useTransform(card2ScrollYProgress,[0,1],["0%", "-50%"]);

    let card1Opacity = useTransform(card1ScrollYProgress,[0,1],["100%", "0%"]);
    let card2Opacity = useTransform(card2ScrollYProgress,[0,1],["100%", "0%"]);

    let fourthSectionEntrance = useTransform(thirdSectionScrollYProgress,[0,1],['0%', '100%']);

    let card1IsInView = useInView(card1Ref, {once:true, margin:"0px 0px -40% 0px"});
    let card2IsInView = useInView(card2Ref, {once:true, margin:"0px 0px -40% 0px"});
    
    let card1Animate = useAnimation();
    let card2Animate = useAnimation();

    const [card1Mounted, setCard1Mounted] = useState(false);
    const [card2Mounted, setCard2Mounted] = useState(false);

    useMotionValueEvent(thirdSectionScrollYProgress,'change',(latest)=>{
        console.log(latest)
    } )
    useEffect(()=>{
        if (card1IsInView){
            let totalInitialAnimationDuration=.3 * 1000;

            card1Animate.start('animate');

            setTimeout(() => {
                setCard1Mounted(true);
            }, totalInitialAnimationDuration);
        }
    } ,[card1IsInView])

    useEffect(()=>{
        if (card2IsInView){
            let totalInitialAnimationDuration=.3 * 1000;

            card2Animate.start('animate')

            setTimeout(() => {
                setCard2Mounted(true);
            },totalInitialAnimationDuration); 
        }
    } ,[card2IsInView,card2Opacity,card2Animate])



    useMotionValueEvent(backgroundRotation,'change',(latest)=>{
        setRotationState(latest)
    } )
    useMotionValueEvent(secondSectionExit,'change',(latest)=>{
        setRotationState(latest)
    } )

    

    return (
        <Container>
            <FirstSection as={motion.div} style={{y:firstSectionY}} ref={firstSectionRef}>
                <TextContainer style={{paddingLeft:"2rem",flex:'3'}}>
                    <TitleContainer style={{width:'500px'}}>
                        <DoneContainer>
                            <CheckCircle size={window.innerWidth<600 ? 40 : 60}/> 
                            <DoneWord>Success</DoneWord>
                        </DoneContainer>
                        <Title>Your review was {action} successfully</Title>
                    </TitleContainer>
                    <SubText style={{width:'500px'}}>
                        Thank you for your valuable feedback! Your 
                        opinion matters. Keep sharing your thoughts.
                    </SubText>
                    <ContinueShoppingBtn>Continue Shopping</ContinueShoppingBtn>
                </TextContainer>
                <ImageContainer>
                    <Image src={ManRating} />
                    <LightBlueBackground />
                </ImageContainer>
            </FirstSection>

            <SecondSection $rotate={rotationState} as={motion.div} ref={secondSectionRef}>
                <SecondSectionContent>
                    <CardsTitle variants={cardsTitleVariant} initial="initial" whileInView='animate' viewport={{margin:"0px 0px -40% 0px",once:"true",}} as={motion.div}>
                        Products you haven't reviewed yet
                    </CardsTitle>
                    <ProductCardsContainer>
                        <CardContainer as={motion.div} variants={cardVariant} initial="initial" animate={card1Animate} ref={card1Ref} style={card1Mounted ? {opacity:card1Opacity,y:card1Y} : {}}>
                            <SimplifiedReviewProductCard product={unReviewedProducts[0]} name_first={true}/>
                        </CardContainer>
                        <CardContainer as={motion.div} variants={cardVariant} initial="initial" animate={card2Animate} ref={card2Ref} style={card2Mounted ? {opacity:card2Opacity,y:card2Y,margin:'20% 0 0 0'} : {margin:'20% 0 0 0'}}>
                            <SimplifiedReviewProductCard product={unReviewedProducts[1]} name_first={true}/>
                        </CardContainer>
                    </ProductCardsContainer>
                </SecondSectionContent>
            </SecondSection>

            <ThirdSection as={motion.div} ref={thirdSectionRef} style={{y:fourthSectionEntrance}}>
                <ThirdSectionContent>
                    <CardsTitle variants={cardsTitleVariant} initial="initial" whileInView='animate' viewport={{margin:"0px 0px -40% 0px",once:"true",}} as={motion.div}>
                        Products you may like
                    </CardsTitle>
                    <ProductCardsContainer>
                        <CardContainer as={motion.div} variants={cardVariant} initial="initial" whileInView='animate' custom={.2} viewport={{once:true,margin:'0px 0px -40% 0px'}} >
                            <ProductCard product={unReviewedProducts[0]} />
                        </CardContainer>
                        <CardContainer as={motion.div} variants={cardVariant} initial="initial" whileInView='animate' custom={.3} viewport={{once:true,margin:'0px 0px -40% 0px'}} style={{margin:'20% 0 0 0'}}>
                            <ProductCard product={unReviewedProducts[1]} />
                        </CardContainer>
                    </ProductCardsContainer>
                </ThirdSectionContent>
            </ThirdSection>

            <FourthSection as={motion.div} ref={forthSectionRef} >

            </FourthSection>

        </Container>
    )
}