import { useRef } from "react";
import styled from "styled-components";
import {motion,  useScroll, useTransform} from "framer-motion";
import manInGreySuit from "../../../assets/manInGreySuit.jpg";
import girlInBlackSuit from "../../../assets/girlInBlackSuit.jpg";
import manInBlackSuit from "../../../assets/manInBlackSuit.jpg";

const Container =styled.div`
position:relative;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
margin: 0 0 12rem 0;
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

@media screen and (max-width:800px){
    width:180px;
    height:180px;
    filter:blur(70px);

}
`
const MainColorBlur2 = styled(MainColorBlur1)`
left:0;
top:40%;

@media screen and (max-width:800px){
    top:80%;
}
`
const MainColorBlur3 = styled(MainColorBlur1)`
right:0;
bottom:0%;
top:unset;
@media screen and (max-width:800px){
    display:none;
}
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

@media screen and (max-width:800px){
    padding:0 1rem;
}
`
const TextContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
gap:3rem;
@media screen and (max-width:1400px){
    width:43%;
}
@media screen and (max-width:600px){
    width:100%;
  
}
`
const Title =styled.div`
will-change:transform;
display:flex;
font-size:var(--heading-2);
font-weight:800;
color:black;
position:relative;
z-index:2;
width:fit-content;
&::before{
    content:"";
    width:100%;
    background:var(--main-color);
    opacity:.7;
    height:20px;
    position:absolute;
    top:70%;
    z-index:-1;
}
@media screen and (max-width:600px){
    font-size:var(--heading-1-mobile);
}
`
const SubTitle = styled.div`
will-change:transform;
color:grey;
font-weight:600;
font-size:var(--heading-3);
@media screen and (max-width:1400px){
    font-size:var(--heading-6);
}
@media screen and (max-width:600px){
    font-size:var(--body);
}
`

const ImagesContainer = styled.div`
display:flex;
align-items:flex-end;
justify-content:center;
width:70%;
@media screen and (max-width:800px){
    width:100%;
}
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

const titleVariant = {
    initial : {
        opacity:0,
        y:20,
    },
    animate : {
        y:0,
        opacity:1,
        transition:{
            staggerChildren:.04,
        },
    }
}

export default function SuitsSection(){
    const suitsWord = "Suits Refined";

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
                    <Title as={motion.div} variants={titleVariant} whileInView="animate" viewport={{ once: true }} initial="initial">
                        {suitsWord.split("").map((letter,index)=> (
                            <motion.span key={index} style={{display:'inline-block'}} variants={titleVariant}>
                               {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </Title>
                    <SubTitle>
                        Step into Style: Your Suit Journey Begins Here.
                        Find timeless suits for every occasion.
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