import styled from "styled-components";
import portalWithBg3 from "../../assets/portalWithBg3.png";
import crane from "../../assets/crane.png";
import constructionWork from "../../assets/constructionWork.png";

import {motion,useMotionValueEvent,useScroll, useTransform} from "framer-motion";
import { useRef } from "react";

const Container = styled.div`
height:100vh;
width:100%;
background:transparent;
position:sticky;
top:0vh;
z-index:2;
`

const Content = styled.div`
display:flex;
align-items:center;
background:red;
width:100%;
height:100%;
position:relative;
`
const DetailsContainer = styled.div`
display:flex;
padding: 4rem 0 0 2rem;
transform-origin:left;
position:relative;
z-index:2;
bottom:13vh;
border:1px solid black;
width:76%;
justify-content:space-between;
align-items:flex-end;
gap:22.5vw;
overflow:hidden;
`
const ErrorDetails = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
width:30vw;
`

const OopsWord = styled.h1`
`

const StatusCode = styled.h1`
font-size:var(--heading-1);
`

const Message = styled.h5`
width:400px;
font-size:var(--heading-5);
`

const GoBackButton = styled.button`
height:32px;
width:200px;
background:blue;
border:none;
font-size:var(--body);
font-weight:600;
border-radius:3px;
`

const BgImageContainer = styled.div`
height:100vh;
width:100%;
position:absolute;
z-index:1;
overflow:hidden;
`

const BackgroundImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
position:absolute;
top:0;
right:0;
transform-origin:center right;

// transform:scale(16,15) translate(-31%,0);
// transform:scale(10,9) translate(0%,0);;
`
export default function OverlayErrorPortal(){
    const containerRef = useRef();

    const {scrollYProgress} = useScroll({offset:['17vh','1']})

    const detailsContainerScaleX = useTransform(scrollYProgress,[0,1],['1','0']);

    const scaleX = useTransform(scrollYProgress, [0,0.75],['1','23']);
    const scaleY = useTransform(scrollYProgress, [0,0.75],['1','10']);
  
    // const translateX = useTransform(scrollYProgress,[0,0.75],['0%', '376%']);
    const translateX = useTransform(scrollYProgress,[0,0.75],['0%', '370vw']);

    const detailsContainerWidth = useTransform(scrollYProgress,[0.02,0.1,0.7],['76%','66%','0%']);

    

    useMotionValueEvent(scrollYProgress,'change',(prev)=>{
        console.log(prev)
    })
    return (
        <Container ref={containerRef}>
            <Content>
                <DetailsContainer as={motion.div} style={{width:detailsContainerWidth}}>
                    <ErrorDetails>                        <OopsWord>Oops...</OopsWord>
                        <StatusCode>404</StatusCode>

                        <Message>
                            Looks like our servers are 
                            down try again later.
                        </Message>

                        <GoBackButton>Go Back</GoBackButton>
                    </ErrorDetails>
                    <img style={{width:'21vw'}} src={crane}></img>
                </DetailsContainer>
                <BgImageContainer>
                    <BackgroundImage as={motion.img} style={{scaleX,scaleY,translateX}} src={portalWithBg3} />
                </BgImageContainer>
            </Content>
        </Container>
    )
}