import styled from "styled-components";

import girlInJacket from "../../../assets/girlInJacket.png";
import jacket1 from "../../../assets/jacket1.png";
import jacket2 from "../../../assets/jacket2.png";
import jacket3 from "../../../assets/jacket3.png";
import jacket4 from "../../../assets/jacket4.png";
import jacket5 from "../../../assets/jacket5.png";

import curvedArrow1 from "../../../assets/curvedArrow1.png";
import curvedArrow2 from "../../../assets/curvedArrow2.png";
import { useMotionValueEvent, useScroll, useTransform,motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const Container = styled.div`
height:200vh;
margin: 20rem 0;
position:relative;
`
const ImagesStickyWrapper = styled.div`
position:sticky;
top:10vh;
min-height:91vh;
overflow:hidden;
`
const ScalableImageContainer = styled.div`
position:relative;
`

const ImagesAbsoluteWrapper  = styled.div`
top:0;
width:100%;
height:100%;
display:flex;
position:absolute;
align-items:center;
justify-content:center;

&:nth-child(1) ${ScalableImageContainer}{
    top:-50%;
    left:89%;
    width:60%;

}
&:nth-child(2) ${ScalableImageContainer}{
    top:80%;
    left:90%;
    width:60%;
}
&:nth-child(3) ${ScalableImageContainer}{
    top:100%;
    left:0%;
    width:90%;
}
&:nth-child(4) ${ScalableImageContainer}{
    top:0%;
    left:-105%;
    width:90%;
}
&:nth-child(5) ${ScalableImageContainer}{
    top:-110%;
    left:0%;
    width:70%;
}
`



const ScalableImage = styled.img`
object-fit:cover;
width:100%;
height:100%;
`
const JacketsSection = styled.div`
position:relative;
padding:0 2rem;
height:90.5vh;
width:100%;
background: #F1F4F9;
overflow:hidden;
`
const JacketsSectionWrapper = styled.div`
background:red;
display:flex;
background: #F1F4F9;
height:100%;
width:100%;
`
const MainInfoContainer = styled.div`
flex:4;
z-index:2;
min-width:0;
display:flex;
overflow:visible;
flex-direction:column;
position:relative;
justify-content:space-around;
max-height:950px;
@media screen and (max-width:1300px){
    max-height:850px
}
`
const JacketsTitle = styled.span`
font-size:var(--big-1);
font-weight:bold;
line-height:100px;
@media screen and (max-width:1400px){
    font-size:var(--big-2);
    line-height:83px;
}
`
const ColoredLetter = styled.span`
color:var(--main-color);
`
const JacketText = styled.h5`
font-size:var(--heading-4);
font-weight:600;
color:grey;

@media screen and (max-width:1600px){
    font-size:var(--heading-5);
}
@media screen and (max-width:1400px){
    font-size:var(--heading-6);
}
`
const ExploreJacketsButton = styled.button`
background:var(--main-color);
font-size:var(--heading-5);
font-weight:600;
border-radius:3px;
outline:none;
border:none;
width:fit-content;
padding: .5rem 2.5rem;
color:white;
@media screen and (max-width:1400px){
    font-size:var(--body);
}
`
const CurvedArrow1 = styled.img`
width:90%;
`
const ImageContainer = styled.div`
flex:5;
display:flex;
align-items:center;
`
const JacketImageContainer = styled.div`
transform:translateX(-3.5rem);
width:95%;
z-index:1;
`
const JacketImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const SecondaryInfoContainer = styled.div`
flex:3;
display:flex;
flex-direction:column;
justify-content:space-around;
max-height:900px;
@media screen and (max-width:1300px){
    max-height:800px
}
`
const CurvedArrow2 = styled.img`
width:45%;
transform:translateX(-2rem);
@media screen and (max-height:750px){
    width:35%;
}
`
const JacketsFeaturesContainer = styled.div`
gap:2rem;
display:flex;
flex-direction:column;
`
const JacketsFeature = styled.div`
gap:1rem;
z-index:0;
display:flex;
flex-direction:column;
align-items:flex-start;
`
const JacketsFeatureTitle = styled.h4`
font-size:var(--heading-3);
color:black;
font-weight:bold;
position:relative;
display:inline;

&:before{
    content:"";
    width:100%;
    background:var(--main-color);
    height:14px;
    position:absolute;
    bottom:0;
    left:0;
    z-index:-1;
}
@media screen and (max-width:1400px){
    font-size:var(--heading-4);
}
@media screen and (max-width:1230px), (max-height:750px){
    font-size: var(--heading-4-mobile);
}
`
const JacketsFeatureSubTitleCont = styled.div`
background:white;
padding:8px 8px 8px 12px;
border-left:4px solid var(--main-color);
`
const JacketsFeatureSubTitle = styled.h6`
color:grey;
font-weight:600;
font-size:var(--heading-5);
@media screen and (max-width:1500px),(max-height:920px){
    font-size: var(--heading-6);
}
@media screen and (max-width:1230px),(max-height:750px){
    font-size: var(--heading-6-mobile);
}
`

const JACKETS_FEATURES = [
    {
        title: 'Luxe',
        subTitle: 'Unwind in jackets crafted from premium materials for unparalleled comfort and style.',
    },
    {
        title: 'Versatile',
        subTitle: 'Elevate your wardrobe with jackets that effortlessly transition from day to night.',
    },
    {
        title: 'Durable',
        subTitle: 'Embrace lasting wear with jackets crafted from high-quality materials, ensuring timeless appeal.',
    },
]


export default function ImagesSection(){
    const [showDetails,setShowDetails] = useState(false);

    const sectionRef = useRef();
    const {scrollYProgress} = useScroll({
        target:sectionRef,
        offset:['start start', 'end end']
    });

    

    const imagesWrapperScale = useTransform(scrollYProgress,[0,1],[0.3,1]);
    const IMAGES = [
        {
            src:jacket1,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.1])
        },
        {
            src:jacket2,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.3])
        },
        {
            src:jacket3,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.2])
        },
        {
            src:jacket4,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.4])
        },
        {
            src:jacket5,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.5])
        },
    ]

    useMotionValueEvent(imagesWrapperScale,'change',(prev)=>{
        if (prev > 0.9)
            setShowDetails(true);
        else 
            setShowDetails(false);
    })
    
    return (
        <Container ref={sectionRef}>
            <ImagesStickyWrapper>
                {IMAGES.map((image)=>(
                    <ImagesAbsoluteWrapper as={motion.div} style={{scale:image.scale}}>
                        <ScalableImageContainer>
                            <ScalableImage src={image.src}/>
                        </ScalableImageContainer>
                    </ImagesAbsoluteWrapper>
                ))}
                <ImagesAbsoluteWrapper as={motion.div} style={{scale:imagesWrapperScale}}>
                    <JacketsSection>
                        <JacketsSectionWrapper>
                            <MainInfoContainer>
                                {showDetails && (
                                    <>
                                        <div style={{display:'flex',flexDirection:"column",gap:'4rem'}}>
                                            <div style={{display:'flex',flexDirection:"column",gap:'2rem'}}>
                                                <JacketsTitle>
                                                    <ColoredLetter>J</ColoredLetter>ackets <br/> 
                                                    <ColoredLetter>C</ColoredLetter>ollection
                                                </JacketsTitle>
                                                <JacketText>
                                                    new unique collection 
                                                    of cool flawless jackets 
                                                    available now
                                                </JacketText>
                                            </div>
                                            <ExploreJacketsButton>
                                                Explore Jackets
                                            </ExploreJacketsButton>
                                        </div>
                                        <CurvedArrow1 src={curvedArrow1} alt="curved arrow pointing to image"/>
                                    </>
                                )}
                            </MainInfoContainer>
                            <ImageContainer>
                                <JacketImageContainer>
                                    <JacketImage src={girlInJacket} alt="girl wearing jacket"/>
                                </JacketImageContainer>
                            </ImageContainer>
                            <SecondaryInfoContainer>
                                <AnimatePresence>
                                {showDetails && (
                                    <>
                                        <CurvedArrow2 as={motion.img} initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.3}} exit={{y:-30,opacity:0}} src={curvedArrow2} alt="curved arrow pointing to details"/>
                                        <JacketsFeaturesContainer>
                                            {JACKETS_FEATURES.map((feature)=>(
                                                <JacketsFeature>
                                                    <JacketsFeatureTitle>
                                                        {feature.title}
                                                    </JacketsFeatureTitle>
                                                    <JacketsFeatureSubTitleCont>
                                                        <JacketsFeatureSubTitle>
                                                            {feature.subTitle}
                                                        </JacketsFeatureSubTitle>
                                                    </JacketsFeatureSubTitleCont>
                                                </JacketsFeature>
                                            ))}
                                        </JacketsFeaturesContainer>
                                    </>
                                )}
                                </AnimatePresence>
                            </SecondaryInfoContainer>
                        </JacketsSectionWrapper>
                    </JacketsSection>
                </ImagesAbsoluteWrapper>
            </ImagesStickyWrapper>
        </Container>
    )
}