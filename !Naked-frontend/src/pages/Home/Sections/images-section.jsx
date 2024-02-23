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
import useWindowDimensions from "../../../hooks/use-window-dimensions";

const Container = styled.div`
height:300vh;
margin: 20rem 0;
position:relative;

@media screen and (max-width:1024px){
    height:350vh;
    margin: 0 0;
}
`
const ImagesStickyWrapper = styled.div`
position:sticky;
top:10vh;
min-height:91vh;
overflow:hidden;

@media screen and (max-width:1024px){
    min-height:160vh;
    top:0;
}

@media screen and (max-width:600px){
    min-height:166vh;
}
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
    top:-55%;
    left:89%;
    width:60%;
}
&:nth-child(2) ${ScalableImageContainer}{
    bottom:-90%;
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
@media (max-height: 1400px) {
    &:nth-child(1) ${ScalableImageContainer} {
        top:-90%;
        left:70%;
        width:50%;
    }

    &:nth-child(2) ${ScalableImageContainer} {
        bottom:-75%;
        width:50%;
    }

    &:nth-child(3) ${ScalableImageContainer} {
        width:70%;
        top:100%;
    }
    &:nth-child(4) ${ScalableImageContainer}{
        left:-93%;
    }
    &:nth-child(5) ${ScalableImageContainer} {
        width:60%;
        top:-110%;
    }
}

@media (max-width: 1024px) {
    align-items:flex-start;

    &:nth-child(1) ${ScalableImageContainer} {
        top:-60%;
        width:100%;
    }

    &:nth-child(2) ${ScalableImageContainer} {
        top:20%;
        left:100%;
        width:90%;
    }

    &:nth-child(3) ${ScalableImageContainer} {
        width:100%;
        top:-27%;
        left:-60%;
    }

    &:nth-child(4) ${ScalableImageContainer} {
        width:85%;
        top:20%;
        left:-100%;
    }

    &:nth-child(5) ${ScalableImageContainer} {
        width:110%;
        top:-80%;
        left: -80%;
    }
}

@media (max-width: 724px) {
    &:nth-child(1) ${ScalableImageContainer} {
        top:-60%;
        width:100%;
    }

    &:nth-child(2) ${ScalableImageContainer} {
        top:-10%;
        left:100%;
        width:90%;
    }

    &:nth-child(3) ${ScalableImageContainer} {
        width:110%;
        top:-15%;
        left:-60%;
    }

    &:nth-child(4) ${ScalableImageContainer} {
        width:80%;
        top:20%;
        left:-100%;
    }

    &:nth-child(5) ${ScalableImageContainer} {
        width:100%;
        top:-50%;
        left: -80%;
    }
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

@media screen and (max-width:1024px){
    height:auto;
}
@media screen and (max-width:600px){
    padding:0 1rem;
    padding-top:1rem;
}
`
const JacketsSectionWrapper = styled.div`
background:red;
display:flex;
background: #F1F4F9;
height:100%;
width:100%;

@media screen and (max-width:1024px){
    flex-direction:column;
}
@media screen and (max-width:600px){
    gap:2rem;
}
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
    min-height: 30vh; 
    max-height:850px
}

@media screen and (max-width:1024px) and (max-height:1200px){
    min-height: 30vh; 
}

@media screen and (max-width:1024px) and (max-height:800px){
    min-height: 55vh; 
}

@media screen and (max-width:600px) and (max-height:800px){
    min-height: 30vh; 
}
`
const MainInfoContent = styled.div`
display:flex;
flex-direction:column;
gap:4rem;
@media screen and (max-width:600px){
    gap:2rem;
}
`

const JacketsTitleText = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
@media screen and (max-width:600px){
    gap:1rem;
}
`
const JacketsTitle = styled.span`
display:inline-block;
font-size:var(--big-1);
font-weight:bold;
line-height:100px;
@media screen and (max-width:1400px){
    font-size:var(--big-2);
    line-height:83px;
}
@media screen and (max-width:600px){
    line-height:35.2px;
    font-size:var(--heading-1-mobile)
}
`
const ColoredLetter = styled.span`
display:inline-block;
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
@media screen and (max-width:600px){
    font-size:var(--heading-5-mobile);
    max-width:400px;
}
`
const ExploreJacketsButton = styled.button`
background:var(--main-color);
font-size:var(--heading-5);
overflow:hidden;
font-weight:600;
border-radius:3px;
outline:none;
border:none;
color:white;
cursor:pointer;
text-wrap:nowrap;
width:fit-content;
padding: .5rem 2.5rem;
transition:background .3s;
box-shadow:10px 9px 12px -3px rgba(0,0,0,0.4) ;
&:hover{
    background:#009BCC;
}
@media screen and (max-width:1400px){
    font-size:var(--body);
}
`
const CurvedArrow1 = styled.img`
width:90%;

@media screen and (max-width:1024px){
    display:none;
}
`
const ImageContainer = styled.div`
flex:5;
display:flex;
align-items:center;
`
const JacketImageContainer = styled.div`
width:90%;
z-index:1;

@media screen and (max-width:1024px){
    width:100%;
    transform:none;
}
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
@media screen and (max-width:1024px){
    flex: 1; 
    min-height: 30vh; 
}
`
const CurvedArrow2 = styled.img`
width:45%;
transform:translateX(-2rem);
@media screen and (max-height:750px){
    width:35%;
}

@media screen and (max-width:1024px){
    display:none;
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
overflow:hidden;
`
const JacketsFeatureTitle = styled.h4`
font-size:var(--heading-3);
color:black;
font-weight:bold;
display:inline-block;
position:relative;
@media screen and (max-width:1400px){
    font-size:var(--heading-4);
}
@media screen and (max-width:1230px), (max-height:750px){
    font-size: var(--heading-4-mobile);
}

@media screen and (max-width:600px){
    font-size:var(--heading-4-mobile);
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
@media screen and (max-width:600px){
    font-size:var(--body);
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
    const {height, width} = useWindowDimensions();

    const sectionRef = useRef();
    const {scrollYProgress} = useScroll({
        target:sectionRef,
        offset:['start start', '80% end']
    });

    const imagesWrapperScale = useTransform(scrollYProgress,[0,1],[0.25,1]);
    const IMAGES = [
        {
            src:jacket1,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.9])
        },
        {
            src:jacket2,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.7])
        },
        {
            src:jacket3,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.6])
        },
        {
            src:jacket4,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.8])
        },
        {
            src:jacket5,
            scale:useTransform(scrollYProgress,[0,1],[0.3,1.9])
        },
    ]

    useMotionValueEvent(imagesWrapperScale,'change',(prev)=>{
        if (prev > 0.9) setShowDetails(true);
        else  setShowDetails(false);
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
                                <AnimatePresence>
                                    {showDetails && (
                                        <>
                                            <MainInfoContent>
                                                <JacketsTitleText>
                                                    <JacketsTitle>
                                                    <div style={{overflow:'visible' , textWrap:"nowrap"}}>
                                                            <ColoredLetter 
                                                            key={'coloredLetter1'}
                                                            as={motion.span} 
                                                            initial={{opacity:0,x:"-10px"}} 
                                                            animate={{opacity:1,x:"0px"}} 
                                                            exit={{opacity:0,x:"-10px"}}
                                                            transition={{duration:.3}}>J</ColoredLetter>
                                                            <motion.span
                                                            style={{display:"inline-block"}}
                                                            key={'ackets'}
                                                            initial={{opacity:0,y:"20px"}} 
                                                            animate={{opacity:1,y:"0px"}}
                                                            exit={{opacity:0, y:"20px"}} 
                                                            transition={{duration:.3}}
                                                            >ackets</motion.span> 
                                                        </div>
                                                        <div style={{overflow:'visible' , textWrap:"nowrap"}}>
                                                            <ColoredLetter
                                                            key={'coloredLetter2'}
                                                            as={motion.span} 
                                                            initial={{opacity:0,x:"-20px"}} 
                                                            animate={{opacity:1,x:"0px"}} 
                                                            exit={{opacity:0,x:"-20px"}}
                                                            transition={{duration:.3}}>C</ColoredLetter>
                                                            <motion.span
                                                            style={{display:"inline-block"}}
                                                            key={'ollection'}
                                                            initial={{opacity:0,y:"20px"}} 
                                                            animate={{opacity:1,y:"0px"}} 
                                                            exit={{opacity:"0", y:"20px"}}
                                                            transition={{duration:.3}}>ollection</motion.span>
                                                        </div> 
                                                    </JacketsTitle>
                                                    <JacketText 
                                                    key={"jacketText"}
                                                    as={motion.h5} 
                                                    initial={{opacity:0,y:"20px"}} 
                                                    animate={{opacity:1,y:"0px"}} 
                                                    transition={{duration:.3}}
                                                    exit={{opacity:"0",y:"20px" ,transition:{duration:.3}}}
                                                    >
                                                        new unique collection 
                                                        of cool flawless jackets 
                                                        available now
                                                    </JacketText>
                                                </JacketsTitleText>
                                                <ExploreJacketsButton  
                                                key={"exploreJacketsButton"}
                                                as={motion.button} 
                                                transition={{delay:.3,duration:.3}}
                                                initial={{opacity:0,x:"-30px"}} 
                                                animate={{opacity:1,x:"0px"}}
                                                exit={{opacity:0,x:"-20px",transition:{delay:0}}}>
                                                    Explore Jackets
                                                </ExploreJacketsButton>
                                            </MainInfoContent>
                                            <CurvedArrow1 
                                            key={'arrow1'}
                                            as={motion.img}
                                            initial={{x:-30,opacity:0}} 
                                            animate={{x:0,opacity:1}} 
                                            transition={{duration:.3}}
                                            exit={{x:-30,opacity:0}}
                                            src={curvedArrow1} 
                                            alt="curved arrow pointing to image"
                                            />
                                        </>
                                    )}
                                </AnimatePresence>
                            </MainInfoContainer>
                            <ImageContainer>
                                <JacketImageContainer>
                                    <JacketImage src={girlInJacket} alt="girl wearing jacket"/>
                                </JacketImageContainer>
                            </ImageContainer>
                            <SecondaryInfoContainer>
                                <AnimatePresence>
                                    {showDetails ? (
                                        <motion.div>
                                            <CurvedArrow2 
                                            key={'arrow2'}
                                            as={motion.img} 
                                            initial={{y:-30,opacity:0}} 
                                            animate={{y:0,opacity:1}} 
                                            transition={{duration:.3}}
                                            exit={{y:-30,opacity:0}} 
                                            src={curvedArrow2} 
                                            alt="curved arrow pointing to details"/>
                                            <JacketsFeaturesContainer as={motion.div}>
                                                {JACKETS_FEATURES.map((feature,index)=>(
                                                    <JacketsFeature as={motion.div} key={index}>
                                                        <div style={{position:"relative",width:'fit-content', overflow:"hidden"}}>
                                                            <JacketsFeatureTitle 
                                                            key={'title'+index}
                                                            as={motion.h4}
                                                            initial={{opacity:0,y:'100%'}}
                                                            animate={{opacity:1,y:'0%'}}
                                                            exit={{
                                                                width:'0px',
                                                                transition:{delay:0,duration:.2}
                                                            }}
                                                            transition={{delay:.3,duration:.3}} 
                                                            >
                                                                {feature.title}
                                                            </JacketsFeatureTitle>
                                                            <motion.div 
                                                            key={'titleCover'+index}
                                                            initial={{width:"0%"}}
                                                            animate={{width:"100%"}}
                                                            exit={{width:'0%'}}
                                                            transition={{duration:0.3}} 
                                                            style={{
                                                                position:"absolute",
                                                                bottom:"0",
                                                                left:"0",
                                                                background:"var(--main-color)",
                                                                width:'100%',
                                                                height:'60%',
                                                                zIndex:"-1",
                                                            }}/>
                                                        </div>
                                                        <motion.div
                                                        key={'subTitleContainer'+ index} 
                                                        initial={{left:"100%"}}
                                                        animate={{left:'0%'}}
                                                        transition={{duration:.3}}
                                                        exit={{
                                                            left:"100%",
                                                            transition:{delay:.35,duration:.3}
                                                        }}
                                                        style={{
                                                            position:"relative",
                                                            width:'100%', 
                                                            left:"0",
                                                            overflow:"hidden"
                                                        }}>
                                                            <JacketsFeatureSubTitleCont>
                                                                <JacketsFeatureSubTitle 
                                                                key={'subTitle' + index}
                                                                as={motion.h6} 
                                                                initial={{y:10,opacity:0}}
                                                                animate={{y:0,opacity:1}} 
                                                                exit={{
                                                                    opacity:0,
                                                                    transition: {delay:.3, duration: .05 } 
                                                                }}
                                                                transition={{delay:.6,duration:.3}}>
                                                                    {feature.subTitle}
                                                                </JacketsFeatureSubTitle>
                                                            </JacketsFeatureSubTitleCont>
                                                            <motion.div
                                                            key={'subTitleCover' + index}
                                                            initial={{right:"0%"}} 
                                                            animate={{right:"100%"}}
                                                            transition={{delay:0.3,duration:0.3}} 
                                                            exit={{
                                                                right:"0%",
                                                                transition: { duration: .35 } 
                                                            }}
                                                            style={{
                                                                right:"0%",
                                                                position:"absolute",
                                                                bottom:"0",
                                                                background:"var(--main-color)",
                                                                width:'100%',
                                                                height:'100%',
                                                                zIndex:"2",
                                                            }}/>
                                                        </motion.div>
                                                    </JacketsFeature>
                                                ))}
                                            </JacketsFeaturesContainer>
                                        </motion.div>
                                    ):null}
                                </AnimatePresence>
                            </SecondaryInfoContainer>
                        </JacketsSectionWrapper>
                    </JacketsSection>
                </ImagesAbsoluteWrapper>
            </ImagesStickyWrapper>
        </Container>
    )
}