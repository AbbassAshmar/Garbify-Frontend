import styled from "styled-components";
import portalWithBg3 from "../../assets/portalWithBg3.png";
import crane from "../../assets/crane.png";
import constructionWork from "../../assets/constructionWork.png";

import {motion,useMotionValueEvent,useScroll, useTransform} from "framer-motion";
import { useRef, useState } from "react";

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
background:rgba(0,0,0,0.3);
width:100%;
height:100%;
position:relative;
`

const DetailsContainer = styled.div`
display:flex;
margin: 4rem 0 0 0;
padding: 4rem 0 0 2rem;
transform-origin:left;
position:relative;
z-index:2;
bottom:13vh;
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
`
export default function OverlayErrorPortal(){
    const [currentDisplay,setCurrentDisplay] = useState('sticky');
    const [current,setCurrent] = useState(0);

    const containerRef = useRef();

    const {scrollYProgress} = useScroll({offset:['7vh','1']})


    const scaleX = useTransform(scrollYProgress, [0,0.45],['1','23']);
    const scaleY = useTransform(scrollYProgress, [0,0.45],['1','10']);
  
    // const translateX = useTransform(scrollYProgress,[0,0.45],['0%', '376%']);
    const translateX = useTransform(scrollYProgress,[0,0.45],['0%', '370vw']);

    const detailsContainerWidth = useTransform(scrollYProgress,[0.01,0.02,0.03,0.045,0.06,0.069,0.095,0.22,0.26,0.28,0.32],['76%','74.5%','72%','68%','64%','61%','56%','28%','20.5%','15%','0%']);

    const constructionWorkImageWidth = useTransform(scrollYProgress,[0,0.02,0.03,0.04,0.2],['18vw','17vw','15vw','12.6vw','0vw']);

    useMotionValueEvent(scrollYProgress,'change',(prev)=>{
        console.log(prev)
        setCurrent(prev)
    })

    useMotionValueEvent(detailsContainerWidth,'change',(prev)=>{
        if(prev === "0%"){
            setCurrentDisplay('none');
        }
    })


    return (
        <Container style={{display:`${currentDisplay}`}} ref={containerRef}>
            <div style={{position:'absolute',top:"20vh", background:"green",zIndex:"12000"}}>{current}</div>
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
                <motion.div style={{
                position:"absolute",
                right:"0",
                bottom:"17%",
                height:"30vw",
                zIndex:'3',
                width:constructionWorkImageWidth,
                overflow:'hidden',
                }}>
                    <img style={{width:'18vw',position:'absolute',right:'0'}} src={constructionWork}/>
                </motion.div>

                <BgImageContainer>
                    <BackgroundImage as={motion.img} style={{scaleX,scaleY,translateX}} src={portalWithBg3} />
                </BgImageContainer>
            </Content>
        </Container>
    )
}