import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import crane from "../../../../assets/crane.png";
import portalWithBg3 from "../../../../assets/portalWithBg3.png";
import constructionWork from "../../../../assets/constructionWork.png";
import useWindowDimensions from "../../../../hooks/use-window-dimensions";
import {motion,useMotionValueEvent,useScroll, useTransform} from "framer-motion";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
height:100vh;
width:100%;
background:transparent;
position:sticky;
top:0vh;
z-index:2;
overflow:hidden;
`

const Wrapper = styled.div`
height:100%;
width:100%;

`
const Content = styled.div`
display:flex;
align-items:center;
background:rgba(0,0,0,1);
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

export default function OverlayErrorPortal({isTransitioning,setIsTransitioning,setPageScale,error}){
    const {width} = useWindowDimensions();
    
    const getMaxTranslateX = () => {
        if (width <= 850) {
            return '370%';
        } else if (width <= 900) {
            return '390%';
        } else if (width <= 1000) {
            return '395%';
        } else if (width <= 1200) {
            return '385%';
        } else {
            return '374%';
        }
    };
    
    const containerRef = useRef();
    const [current,setCurrent] = useState(0);

    const navigate = useNavigate();
    const {scrollYProgress} = useScroll({offset:['7vh','1']})

    const scaleX = useTransform(scrollYProgress, [0,0.45],['1','23']);
    const scaleY = useTransform(scrollYProgress, [0,0.45],['1','10']);
    const translateX = useTransform(scrollYProgress,[0,0.45],['0%', getMaxTranslateX()]);

    const detailsContainerWidth = useTransform(scrollYProgress,[0.01,0.02,0.03,0.045,0.06,0.069,0.095,0.22,0.26,0.28,0.32],['76%','74.5%','72%','68%','64%','61%','56%','28%','20.5%','15%','0%']);
    const constructionWorkImageWidth = useTransform(scrollYProgress,[0,0.02,0.03,0.04,0.2],['18vw','17vw','15vw','12.6vw','0vw']);
    const contentBackground = useTransform(scrollYProgress,[0,0.1,0.3],['rgba(0,0,0,1)','rgba(0,0,0,0.3)','rgba(0,0,0,0)']);
    const recommendationsPageScale = useTransform(scrollYProgress,[0,0.3], [.9,1]);

    const containerScale = useTransform(scrollYProgress,[0,0.3],[1,1.2]);
    const containerBlur = useTransform(scrollYProgress,[0,0.3],['blur(0px)', 'blur(10px)']);

    useMotionValueEvent(recommendationsPageScale,'change',(prev)=>{
        if (isTransitioning) {
            setPageScale(prev)
        }else{
            setPageScale(null)
        }
    })

    useMotionValueEvent(scrollYProgress,'change',(prev)=>{
        setCurrent(width)
    })

    useMotionValueEvent(detailsContainerWidth,'change',(prev)=>{
        if(prev === "0%") setIsTransitioning(false);
    })

    function handleGoHomeButtonClick (e){
        navigate('/products',{replace:true});
    }
    
    return (
        <Container style={{display:`${isTransitioning?'sticky':'none'}`}} ref={containerRef}>
            <Wrapper as={motion.div} style={{scale:containerScale,filter:containerBlur}}>
                <Content as={motion.div} style={{background:contentBackground}}>
                    <DetailsContainer as={motion.div} style={{width:detailsContainerWidth}}>
                        <ErrorDetails> 
                            <div>                      
                                <OopsWord>Oops...</OopsWord>
                                <StatusCode>{error.statusCode}</StatusCode>
                            </div> 

                            <Message>
                                {error.message}
                            </Message>

                            <GoBackButton onClick={handleGoHomeButtonClick}>Go home</GoBackButton>
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
            </Wrapper>
        </Container>
    )
}