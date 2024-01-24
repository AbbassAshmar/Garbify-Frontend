import styled from "styled-components";
import ManRating from "../../assets/ManRating.png"
import { CheckCircle, DoneContainer, DoneWord, TextContainer, TitleContainer,Title,SubText,EditReviewButton} from "../ReviewPurchasedProduct/Componenets/can-not-review";
// import { SliderTitle } from "../../components/StyledComponents/styled-components";
import SimplifiedProductCard from "../../components/SimplifiedProductCard/simplified-product-card";
import useUserState from "../../hooks/use-user-state";
import { useFetchData, useSendRequest } from "../../hooks/use-fetch-data";
import { PRODUCTS } from "../../components/products-data";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const Container = styled.div`
overflow:hidden;
padding:2rem 0;
display:flex;
flex-direction:column;
margin:auto;
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
    background:#00C2FF;
    width:200%;
    height:102%;
    margin:auto;
    border-radius:50%;
    transform:rotate(${({$rotate})=>$rotate})  translateX(-20%) translateY(-5%);
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position:absolute;
    z-index:0;
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


const ThirdSection = styled.div`
background:green;
width:100%;
height:100vh;
background:red;
`
export default function ReviewSuccess({action}){
    const [rotationState, setRotationState] = useState("-14deg");

    const firstSectionRef = useRef();
    const secondSectionRef = useRef();

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

    let firstSectionY = useTransform(scrollYProgress,[0,1],["0%", "100%"]);
    let secondSectionY = useTransform(scrollYProgress,[0,1],["0%", "200%"]);

    let backgroundRotation = useTransform(scrollYProgress,[0,1],["-14deg", "0deg"]);
    let secondSectionExit = useTransform(secondSectionScrollYProgress,[0,1],['0deg','30deg']);

    useMotionValueEvent(secondSectionScrollYProgress, "change", (latest) => {
        console.log(latest)
    })

    useMotionValueEvent(backgroundRotation,'change',(latest)=>{
        setRotationState(latest)
    } )
    useMotionValueEvent(secondSectionExit,'change',(latest)=>{
        setRotationState(latest)
    } )

    // useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //     console.log(latest)
    // })






    const userContext = useUserState();

    let unReviewedProductsUri = '/api/users/user/products/unreviewed';
    const {data:unReviewedProductsData,loading,error} = useFetchData(unReviewedProductsUri,[],userContext);

    let unReviewedProducts =unReviewedProductsData?.data.products || PRODUCTS;

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
                    <CardsTitle as={motion.div}>Products you haven't reviewed yet</CardsTitle>
                    <ProductCardsContainer>
                        <motion.div style={{flex:'1'}}><SimplifiedProductCard product={unReviewedProducts[0]}/></motion.div>
                        <motion.div style={{flex:'1',margin:'20% 0 0 0'}}><SimplifiedProductCard product={unReviewedProducts[1]}/></motion.div>
                    </ProductCardsContainer>
                </SecondSectionContent>
            </SecondSection>

            <ThirdSection>

            </ThirdSection>
        </Container>
    )
}