import styled from "styled-components";
import MovableImage from "../Components/movable-image";
import { motion ,useTransform,useScroll} from "framer-motion";
import reviewExample from '../../../assets/reviewExample.png';
import ratingsIncrease from '../../../assets/ratingsIncrease.png';
import reviewedProduct from '../../../assets/reviewedProduct.png';

import { CheckCircle, DoneContainer, DoneWord, TextContainer, TitleContainer,Title,SubText,EditReviewButton} from "../../ReviewPurchasedProduct/Componenets/can-not-review";

const Container = styled.div`
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

const ImagesList = [
    {src:reviewExample,Container:ReviewExampleImgCont},
    {src:ratingsIncrease,Container:RatingsIncreaseImgCont},
    {src:reviewedProduct,Container:ReviewedProductImgCont},
];


export default function FirstSection({action,containerRef}){
    const smallScreen = window.innerWidth < 800;

    const {scrollYProgress:firstSectionScrollYProgress} = useScroll({
        target:containerRef,
        // start of firstSectionRef meets end of viewport = 0
        offset: [smallScreen? '0.3 start' :"-0.2 start" , "end start"]
    });

    let firstSectionY = useTransform(firstSectionScrollYProgress,[0,1],["0%", (smallScreen ?"25%":"30%")]);

    return (
        <Container as={motion.div} style={{y:firstSectionY}} ref={containerRef}>
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
                    {
                        ImagesList.map((imageObj)=>{
                            return <MovableImage key={imageObj.src} Container={imageObj.Container} src={imageObj.src} />
                        })
                    }
                </ReviewImagesContainer>
                <LightBlueBackground />
            </ImageContainer>
        </Container>
    )
}