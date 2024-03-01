import styled from "styled-components"
import { SectionContainer } from "./featured-section";
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";

import ManInSuit from "../../../assets/ManInSuit.jpg";
import GirlInSuit from "../../../assets/GirlInSuit.jpg";
import manInBlackSuit from "../../../assets/manInBlackSuit.jpg";
import { useRef } from "react";

const Container = styled(SectionContainer)`
position:relative;
border:1px solid black;
padding-top:20%;
height:160vh;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
margin: 0 0 8rem 0;
`
const MainColorBlur1 = styled.div`
background:var(--main-color);
width:300px;
height:300px;
border-radius:50%;
position:absolute;
filter:blur(120px);
opacity:60%;

right:0;
top:0;
`
const MainColorBlur2 = styled(MainColorBlur1)`
left:0;
top:40%;
`
const MainColorBlur3 = styled(MainColorBlur1)`
right:0;
bottom:0%;
top:unset;
`
const Content = styled.div`
width:100%;
position:relative;
min-width:300px;
padding:0 2rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
height:100%;
gap:50vh;
`
const TextContainer = styled.div`
background:red;
display:flex;
flex-direction:column;
align-items:flex-start;
gap:4rem;
width:55.5%;
@media screen and (max-width:1400px){
    width:43%;
}
`
const Title =styled.h2`
font-size:14rem;
color:black;
background:blue;
@media screen and (max-width:1400px){
    font-size:10rem;
}
`
const SubTitle = styled.h3`
font-size:var(--heading-3);
color:var(--main-color);
@media screen and (max-width:1400px){
    font-size:var(--heading-4);
}
`

const ImagesContainer = styled.div`
display:flex;
align-items:flex-end;
justify-content:center;
border:2px solid blue;
width:80%;
`
const FirstImageContainer = styled.div`
flex:2;
transform:translateX(10%);

`
const FirstImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const MainImageContainer = styled.div`
flex:3;
`
const MainImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const SecondImageContainer=  styled.div`
flex:1.5;
transform:translateX(-10%);
`
const SecondImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`

export default function SuitsSection(){
    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:containerRef,
        offset:['-10vh' , 'end start']
    })

    const textY = useTransform(scrollYProgress, [0,.3], ['0%','-50%']);
    const imagesContainerY = useTransform(scrollYProgress, [0,1], ['-15%','-155%']);
    const firstImageY = useTransform(scrollYProgress, [.2,1], ['10%','-80%']);
    const secondImageY = useTransform(scrollYProgress, [.2,.7], ['-50%','10%']);

    useMotionValueEvent(scrollYProgress,'change',(prev)=>{
        console.log(prev)
    })
    return(
        <Container ref={containerRef}>
            <MainColorBlur1 />
            <MainColorBlur2 />
            <MainColorBlur3 />
            <Content>
                <TextContainer as={motion.div} style={{y:textY}}>
                    <Title>Suits?</Title>
                    <SubTitle>
                        Step into Style: Your Suit Journey Begins Here.
                        Find timeless suits for every occasion.
                    </SubTitle>
                </TextContainer>
                <ImagesContainer as={motion.div} style={{y:imagesContainerY}}>
                    <FirstImageContainer as={motion.div} style={{y:firstImageY,x:"15%"}}>
                        <FirstImage src={manInBlackSuit} />
                    </FirstImageContainer>
                    <MainImageContainer>
                        <MainImage src={GirlInSuit}/>
                    </MainImageContainer>
                    <SecondImageContainer as={motion.div} style={{y:secondImageY,x:"-15%"}}>
                        <SecondImage src={ManInSuit}/>
                    </SecondImageContainer>
                </ImagesContainer>
            </Content>
        </Container>
    )
}