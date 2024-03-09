import styled from "styled-components"
import { SectionContainer } from "./featured-section";
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";

import manInGreySuit from "../../../assets/manInGreySuit.jpg";
import girlInBlackSuit from "../../../assets/girlInBlackSuit.jpg";
import manInBlackSuit from "../../../assets/manInBlackSuit.jpg";
import { useRef } from "react";

const Container = styled(SectionContainer)`
position:relative;
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
will-change:transform;
width:100%;
position:relative;
min-width:300px;
padding:0 2rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
gap:6rem;
`
const TextContainer = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
gap:3rem;
@media screen and (max-width:1400px){
    width:43%;
}
`
const Title =styled.div`
will-change:transform;
font-size:14rem;
color:black;
font-weight:bold;
display:flex;
align-items:flex-end;
gap:10px;
@media screen and (max-width:1400px){
    font-size:var(--big-2);
}
`
const SubTitle = styled.div`
display:flex;
flex-direction:column;
gap:1rem;
will-change:transform;
`
const SubTitleLine = styled.h3`
font-size:var(--heading-3);
color:black;
position:relative;
// text-shadow:0px 0px 4px rgba(0,0,0,0.8);
display:inline-block;
width:fit-content;
&:before{
    content:"";
    position:absolute;
    background:#3CD1FF;
    height:15px;
    width:100%;
    z-index:-1;
    top:10px
}

@media screen and (max-width:1400px){
    font-size:var(--heading-6);
}

`
const ImagesContainer = styled.div`
display:flex;
align-items:flex-end;
justify-content:center;
width:70%;
`
const FirstImageContainer = styled.div`
flex:2;
will-change:transform;
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
will-change:transform;
`
const SecondImage = styled.img`
width:100%;
height:100%;
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
            delayChildren: .4,
            staggerChildren:.09,
            ease: "linear"
        }
    }
}
export default function SuitsSection(){
    const suitsWord = "Suits?";

    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:containerRef,
        offset:['start end' , 'end start']
    })

    const imagesContainerY = useTransform(scrollYProgress, [0,.7], ['-10vh','-70vh']);
    const firstImageY = useTransform(scrollYProgress, [.2,1], [150,-150]);
    const secondImageY = useTransform(scrollYProgress, [.2,.9], [100,-100]);
    
    return(
        <Container ref={containerRef}>
            <MainColorBlur1 />
            <MainColorBlur2 />
            <MainColorBlur3 />
            <Content as={motion.div}> 
                <TextContainer>
                    <Title as={motion.div} variants={textVariants} whileInView="animate" viewport={{ once: true }} initial="initial">
                        {suitsWord.split("").map((letter,index)=> (
                            <motion.span key={index} style={{color:"var(--main-color)",display:'inline-block'}} variants={textVariants}>
                                {letter}
                            </motion.span>
                        ))}
                    </Title>
                    <SubTitle>
                        <SubTitleLine>
                            Step into Style: Your Suit Journey Begins Here.
                        </SubTitleLine>
                        <SubTitleLine>
                            Find timeless suits for every occasion.
                        </SubTitleLine>
                    </SubTitle>
                </TextContainer>
                <ImagesContainer>
                    <FirstImageContainer as={motion.div} style={{y:firstImageY,x:"15%"}}>
                        <FirstImage alt="man in a black suit" loading="lazy" src={manInBlackSuit} />
                    </FirstImageContainer>
                    <MainImageContainer>
                        <MainImage  alt="girl in a black suit"  loading="lazy" src={girlInBlackSuit}/>
                    </MainImageContainer>
                    <SecondImageContainer as={motion.div} style={{y:secondImageY,x:"8%"}}>
                        <SecondImage  alt="man in a grey suit"  loading="lazy" src={manInGreySuit}/>
                    </SecondImageContainer>
                </ImagesContainer>
            </Content>
        </Container>
    )
}