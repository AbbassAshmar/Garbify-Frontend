import styled from "styled-components";
import reviewedProduct from "../../assets/reviewedProduct.png";
import reviewExample from "../../assets/reviewExample.png";
import ratingsIncrease from "../../assets/ratingsIncrease.png";
import ManRating from "../../assets/ManRating.png";
import { CheckCircle, DoneContainer, DoneWord, TextContainer, TitleContainer,Title,SubText,EditReviewButton} from "../ReviewPurchasedProduct/Componenets/can-not-review";
import useUserState from "../../hooks/use-user-state";
import { useFetchData, useSendRequest } from "../../hooks/use-fetch-data";
import { PRODUCTS } from "../../components/products-data";
import { useEffect, useRef, useState } from "react";
import SimplifiedReviewProductCard from "../../components/SimplifiedProductCard/simplified-review-product-card";
import { motion, useAnimation, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import SimplifiedProductCard from "../../components/SimplifiedProductCard/simplified-product-card";
import ProductCard from "../../components/ProductCard/product-card";
import cargoLeft from "../../assets/cargoLeft.png";
import cargoRight from "../../assets/cargoRight.png";

const Container = styled.div`
overflow:hidden;
display:flex;
flex-direction:column;
margin:auto;
scroll-behavior: smooth;
position:relative;
background:white;


`

const FirstSection = styled.div`
display:flex;
width:100%;
position:relative;
z-index:1;
gap:1rem;
padding:2rem 2rem 4rem 2rem;
overscroll-behavior: none;

@media screen and (max-width:800px){
    flex-direction:column;
    gap:2rem;
    padding:0 1rem 4rem 1rem;
}
`
const ContinueShoppingBtn  = styled(EditReviewButton)`
width:230px;
`

const ImageContainer = styled.div`
position:relative;
flex-shrink:0;
flex:1.3;
`

const ReviewImagesContainer = styled.div`
padding-top:3px;
display:grid;
grid-template-columns:60% 1fr;
grid-template-rows: auto; 
`

const ReviewExampleImgCont = styled.div`
grid-column: span 1; 
grid-row: span 2; 
width:118%;
transition:transform .1s;
`

const RatingsIncreaseImgCont = styled.div`
grid-column: span 1; 
grid-row: span 1;
transform:translateY(10px);
transition:transform .1s;
`
const ReviewedProductImgCont = styled.div`
transform:translateY(20px);
justify-self:end;
grid-column: span 1;
grid-row: span 1; 
width:80%;
transition:transform .1s;
`
const Image = styled.img`
box-shadow:0px 0px 7px rgba(0,0,0,0.6);
width:100%;
border-radius:3px;
object-fit:cover;
`


const LightBlueBackground = styled.div`
position:absolute;
width:290%;
height:80vh;
background: #86E2FF;
border-radius:50%;
top:60%;
right:-50%;
z-index:-1;
transform:rotate(-20deg);
`

const SecondSection = styled.div`
z-index:2;
width:100%;
padding: 0 0 10vh 0;
position:relative;

&:before{
    content:"";
    width:200%;
    height:110%;
    margin:auto;
    border-radius:50%;
    transform:rotate(${({$rotate})=>$rotate})  translateX(-20%) translateY(-5%);
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position:absolute;
    z-index:0;
    background: linear-gradient(to bottom, #00C2FF 10%,#86E2FF);
    @media screen and (max-width:800px){
        transform:none;
        border-radius:0;
        left:-50%;
        top:0;
    }
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
@media screen and (max-width:800px){
    padding: 20% 1rem;
}
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
padding-bottom:2rem;
@media screen and (max-width:1250px){
    width:100%;
}

@media screen and (max-width:800px){
    flex-direction:column;
}
`
const CardContainer = styled.div`
flex:1;
transition:transform .1s;
`
const CardContainer2 = styled(CardContainer)`
margin:20% 0 0 0;
@media screen and (max-width:800px){
    margin:0;
}
`
const ThirdSection = styled.div`
width:100%;
z-index:0;

@media screen and (max-width:800px){
   padding-bottom:2rem;
}
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
width:100%;
background:#cdbeaa;
position:relative;
`

const FourthSectionContent = styled.div`
width:100%;
display:flex;
padding:2rem;
@media screen and (max-width:900px){
    padding:1rem;
    flex-direction:column;
    gap:2rem;
}
`
const CargoWordContainer = styled.div`
font-weight:600;
font-size:var(--heading-1);
z-index:1;
align-self:center;
margin-bottom:25%;

@media screen and (max-width:1200px){
    font-size:var(--heading-2);
    margin-bottom:30%;

}
@media screen and (max-width:900px){
    align-self:flex-start;
    margin:0;
}
`

const CargoImagesTextContainer = styled.div`
gap:2rem;
z-index:0;
display:flex;
flex-shrink:0;
transform:translateX(-7rem);
width:88%;
@media screen and (max-width:1200px){
    width:90%;
}
@media screen and (max-width:900px){
    flex-direction:column;
    transform:none;
    width:100%;
}
`

const CargoImagesContainer = styled.div`
gap:2.78%;
width:53%;
display:flex;
flex-shrink:0;
overflow:hidden;
padding: 0 0 7% 0;
@media screen and (max-width:900px){
    transform:none;
    width:100%;
}
`

const CargoImage = styled.img`
flex-shrink:0;
width:50%;
`
const CargoTextButtonContainer = styled.div`
display:flex;
gap:4rem;
align-self:center;
flex-direction:column;
flex:1;

@media screen and (max-width:900px){
    align-self:flex-start;
    gap:2rem;
}
`
const CargoTextContainer = styled.div`
display:flex;
gap:2rem;
flex-direction:column;

@media screen and (max-width:900px){
    gap:1rem;
}
`
const CollectionWord = styled.h1`
font-weight:600;
font-size:var(--heading-1);
@media screen and (max-width:1200px){
    font-size:var(--heading-2);
}
`
const CargoText = styled.p`
font-weight:600;
margin: 0 0 0 5px;
max-width:min(80%, 500px);
@media screen and (max-width:1200px){
    width:min(100% , 380px);
}
`
const ShopNowButton = styled.button`
background:black;
border:none;
outline:none;
color:white;
width:290px;
height:40px;
font-weight:600;
border-radius:3px;
box-shadow: -2px 4px 7px rgba(0,0,0,0.5);
cursor:pointer;
transition:background .2s;
&:hover{
    background:#ac9472;
}
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

    const image1Ref=  useRef();
    const image2Ref = useRef();
    const image3Ref = useRef();

    const [image1CoordinatesOffset,setImage1CoordinatesOffset] = useState({x:0, y:0});
    const [image1Origin,setImage1Origin] = useState({x:0,y:0});

    const [image2CoordinatesOffset,setImage2CoordinatesOffset] = useState({x:0, y:0});
    const [image2Origin,setImage2Origin] = useState({x:0,y:0});

    const [image3CoordinatesOffset,setImage3CoordinatesOffset] = useState({x:0, y:0});
    const [image3Origin,setImage3Origin] = useState({x:0, y:0});

    useEffect(()=>{
        setImage1Origin({
            x:image1Ref?.current?.getBoundingClientRect().left + (image1Ref?.current?.getBoundingClientRect().width/2), 
            y:image1Ref?.current?.getBoundingClientRect().top + (image1Ref?.current?.getBoundingClientRect().height/2)
        })

        setImage2Origin({
            x:image2Ref?.current?.getBoundingClientRect().left + (image2Ref?.current?.getBoundingClientRect().width/2), 
            y:image2Ref?.current?.getBoundingClientRect().top + (image2Ref?.current?.getBoundingClientRect().height/2)
        })

        setImage3Origin({
            x:image3Ref?.current?.getBoundingClientRect().left + (image3Ref?.current?.getBoundingClientRect().width/2), 
            y:image3Ref?.current?.getBoundingClientRect().top + (image3Ref?.current?.getBoundingClientRect().height/2)
        })
    },[])


    const smallScreen = window.innerWidth < 800;

    const {scrollYProgress} = useScroll({
        target:firstSectionRef,
        // start of firstSectionRef meets end of viewport = 0
        offset: [smallScreen? '0.3 start' :"-0.2 start" , "end start"]
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
        offset:[smallScreen?'0.7 0' : '0.4 0','end start']
    })


    let firstSectionY = useTransform(scrollYProgress,[0,1],["0%", (smallScreen ?"25%":"30%")]);

    let backgroundRotation = useTransform(scrollYProgress,[0,1],["-14deg", "0deg"]);
    let secondSectionExit = useTransform(secondSectionScrollYProgress,[0,1],['0deg','30deg']);

    let card1Y = useTransform(card1ScrollYProgress,[0,1],["0%", "-50%"]);
    let card2Y = useTransform(card2ScrollYProgress,[0,1],["0%", "-50%"]);

    let card1Opacity = useTransform(card1ScrollYProgress,[0,1],["100%", "0%"]);
    let card2Opacity = useTransform(card2ScrollYProgress,[0,1],["100%", "0%"]);

    let fourthSectionEntrance = useTransform(thirdSectionScrollYProgress,[0,1],['0%', smallScreen?"15%":'25%']);

    let card1IsInView = useInView(card1Ref, {once:true, margin:"0px 0px -40% 0px"});
    let card2IsInView = useInView(card2Ref, {once:true, margin:"0px 0px -40% 0px"});
    
    let card1Animate = useAnimation();
    let card2Animate = useAnimation();

    const [card1Mounted, setCard1Mounted] = useState(false);
    const [card2Mounted, setCard2Mounted] = useState(false);

    
   
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

    
  

    function handleMouseMoveOverImage(e,imageOrigin,setImageCoordinatesOffset){
        let XMouserelativeToViewport = e.clientX;
        let YMouserelativeToViewport = e.clientY;
        
        let XMouseRelativeToImage =XMouserelativeToViewport - imageOrigin.x;
        let YMouseRelativeToImage =YMouserelativeToViewport - imageOrigin.y;
        
        setImageCoordinatesOffset({x:Math.max(-30, Math.min(XMouseRelativeToImage, 30)), y:Math.max(-30, Math.min(YMouseRelativeToImage, 30))})
    }

    return (
        <Container>
            <FirstSection as={motion.div} style={{y:firstSectionY}} ref={firstSectionRef}>
                <TextContainer style={{flex:'1'}}>
                    <TitleContainer style={{maxWidth:'500px'}}>
                        <DoneContainer>
                            <CheckCircle size={window.innerWidth <= 1140 ?40 : 60}/> 
                            <DoneWord>Success</DoneWord>
                        </DoneContainer>
                        <Title>Your review was {action} successfully</Title>
                    </TitleContainer>
                    <SubText style={{maxWidth:'500px'}}>
                        Thank you for your valuable feedback! Your 
                        opinion matters. Keep sharing your thoughts.
                    </SubText>
                    <ContinueShoppingBtn>Continue Shopping</ContinueShoppingBtn>
                </TextContainer>
                <ImageContainer>
                    <ReviewImagesContainer>
                        <ReviewExampleImgCont ref={image1Ref} onMouseMove={(e)=>{handleMouseMoveOverImage(e,image1Origin,setImage1CoordinatesOffset)}} as={motion.div} style={{x:image1CoordinatesOffset.x, y:image1CoordinatesOffset.y}}>
                            <Image src={reviewExample} />
                        </ReviewExampleImgCont>
                        <RatingsIncreaseImgCont ref={image2Ref} onMouseMove={(e)=>{handleMouseMoveOverImage(e,image2Origin,setImage2CoordinatesOffset)}} as={motion.div} style={{x:image2CoordinatesOffset.x, y:image2CoordinatesOffset.y}}>
                            <Image src={ratingsIncrease} />
                        </RatingsIncreaseImgCont>
                        <ReviewedProductImgCont ref={image3Ref} onMouseMove={(e)=>{handleMouseMoveOverImage(e,image3Origin,setImage3CoordinatesOffset)}} as={motion.div} style={{x:image3CoordinatesOffset.x, y:image3CoordinatesOffset.y}}>
                            <Image src={reviewedProduct} />
                        </ReviewedProductImgCont>
                    </ReviewImagesContainer>
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
                        <CardContainer as={motion.div} variants={cardVariant} initial="initial" animate={card2Animate} ref={card2Ref} style={card2Mounted ? {opacity:card2Opacity,y:card2Y, margin:`${!smallScreen ? "20% 0 0 0":"0"}`} : {margin:`${!smallScreen ? "20% 0 0 0":"0"}`}}>
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
                        <CardContainer2 as={motion.div} variants={cardVariant} initial="initial" whileInView='animate' custom={.3} viewport={{once:true,margin:'0px 0px -40% 0px'}}>
                            <ProductCard product={unReviewedProducts[1]} />
                        </CardContainer2>
                    </ProductCardsContainer>
                </ThirdSectionContent>
            </ThirdSection>

            <FourthSection as={motion.div} ref={forthSectionRef} >
                <FourthSectionContent>
                    <CargoWordContainer>CARGOS</CargoWordContainer>
                    <CargoImagesTextContainer>
                        <CargoImagesContainer>
                            <CargoImage src={cargoLeft}/>
                            <CargoImage style={{transform:"translateY(13.4%)"}}  src={cargoRight}/>
                        </CargoImagesContainer>
                        <CargoTextButtonContainer>
                            <CargoTextContainer>
                                <CollectionWord>COLLECTION</CollectionWord>
                                <div style={{borderLeft:"8px solid black"}}>
                                    <CargoText>
                                        Explore our premium collection of hoodies, crafted 
                                        with high-quality materials for maximum comfort and style
                                    </CargoText>
                                </div>
                            </CargoTextContainer>
                            <ShopNowButton>
                                Shop Now <i style={{color:"white"}} className="fa-solid fa-angle-right"/>
                            </ShopNowButton>
                        </CargoTextButtonContainer>
                    </CargoImagesTextContainer>
                </FourthSectionContent>
            </FourthSection>

        </Container>
    )
}