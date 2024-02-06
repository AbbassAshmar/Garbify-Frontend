import styled from "styled-components";
import { useRef, useState } from "react";
import crane from "../../../../assets/crane.png";
import portalWithBg3 from "../../../../assets/portalWithBg3.png";
import constructionWork from "../../../../assets/constructionWork.png";
import useWindowDimensions from "../../../../hooks/use-window-dimensions";
import {motion,useMotionValueEvent,useScroll, useTransform} from "framer-motion";


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
margin: 0 0 6px 0;
`

const OopsWord = styled.h1`
`

const StatusCode = styled.h1`
font-size:var(--heading-1);
color:#00C2FF;
`

const Message = styled.h5`
width:400px;
font-size:var(--heading-5);
color:grey;
`

const GoBackButton = styled.button`
width:220px;
height:35px;
border:none;
color:white;
outline:none;
box-shadow:0px 0px 7px rgba(0,0,0,0.6);
background: #00C2FF;
font-weight:600;
border-radius:3px;
cursor:pointer;
font-size:var(--body);
transition:background .3s;
&:hover{
    background: #00C2FF;
}
@media screen and (max-width:800px){
    width:100%;
}
@media screen and (min-width:1440px){
    width:330px;
    height:43px;
}
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
@media screen and (max-width:1300px){
    width:110%;
}
@media screen and (max-width:1000px){
    width:114%;
}
`
const ConstructionWorkImageContainer = styled.div`
position:absolute;
right:0;
bottom:17%;
height:30vw;
z-index:3;
overflow:hidden;
@media screen and (max-width:1000px){
    bottom:21%;
}
@media screen and (max-width:900px){
    bottom:20%;
}
`

const ConstructionWorkImage = styled.img`
width:18vw;
position:absolute;
right:0;
`

export default function OverlayErrorPortal({isTransitioning,setIsTransitioning}){
    const {width} = useWindowDimensions();
    const containerRef = useRef();
    const [current,setCurrent] = useState(0);

    const {scrollYProgress} = useScroll({offset:['7vh','1']})

    const scaleX = useTransform(scrollYProgress, [0,0.45],['1','23']);
    const scaleY = useTransform(scrollYProgress, [0,0.45],['1','10']);
    const translateX = useTransform(scrollYProgress,[0,0.45],['0%', `374%`]);

    // 370vw -> 1358px
    // 436vw -> 1165px
    // 470vw ->100px
    // 476vw -> 900px


    const detailsContainerWidth = useTransform(scrollYProgress,[0.01,0.02,0.03,0.045,0.06,0.069,0.095,0.22,0.26,0.28,0.32],['76%','74.5%','72%','68%','64%','61%','56%','28%','20.5%','15%','0%']);
    const constructionWorkImageWidth = useTransform(scrollYProgress,[0,0.02,0.03,0.04,0.2],['18vw','17vw','15vw','12.6vw','0vw']);

    useMotionValueEvent(scrollYProgress,'change',(prev)=>{
        setCurrent(width)
    })

    useMotionValueEvent(detailsContainerWidth,'change',(prev)=>{
        if(prev === "0%") setIsTransitioning(false);
    })

    return (
        <Container style={{display:`${isTransitioning?'sticky':'none'}`}} ref={containerRef}>
            <div style={{position:'absolute',top:"20vh", background:"green",zIndex:"12000"}}>{current}</div>
            <Content>
                <DetailsContainer as={motion.div} style={{width:detailsContainerWidth}}>
                    <ErrorDetails> 
                        <div>                      
                            <OopsWord>Oops...</OopsWord>
                            <StatusCode>404</StatusCode>
                        </div> 

                        <Message>
                            Looks like our servers are 
                            down try again later.
                        </Message>

                        <GoBackButton>Go home</GoBackButton>
                    </ErrorDetails>
                    <img style={{width:'21vw'}} src={crane}></img>
                </DetailsContainer>
                <ConstructionWorkImageContainer as={motion.div} style={{width:constructionWorkImageWidth}}>
                    <ConstructionWorkImage src={constructionWork}/>
                </ConstructionWorkImageContainer>

                <BgImageContainer>
                    <BackgroundImage as={motion.img} style={{scaleX,scaleY,translateX}} src={portalWithBg3} />
                </BgImageContainer>
            </Content>
        </Container>
    )
}