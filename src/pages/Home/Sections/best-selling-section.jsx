import girlInWhiteHoody from "../../../assets/girlInWhiteHoody.jpg"
import guyInHoody from "../../../assets/guyInHoody.jpg"
import styled from "styled-components";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useWindowDimensions from "../../../hooks/use-window-dimensions";

const Container = styled.section`
display:grid;
gap:10vw;
align-items:start;
justify-content:center;
width:100%;
padding:0 2rem;

/* grid-template-columns: 1fr 1fr; */
grid-template-rows : .2fr 1fr;
grid-gap:2rem;
grid-row-gap:10rem;
overflow:hidden;

@media screen and (max-width:1200px){
    display:block;
    position:relative;
    padding:0 2rem;
    height:130vh;
}

@media screen and (max-width:1000px){
    height:120vh;
    overflow:visible;
}

@media screen and (max-height:2000px) and (max-width:1024px){
    height:100vh;
}

@media screen and (max-height:700px) and (max-width:1024px){
    height:130vh;
}
`
const TextContainer = styled.div`
mix-blend-mode: difference;
position:relative;
z-index:2;
`
const Text = styled.h1`
color:white;
font-size:var(--big-1);
font-weight:bold;
grid-row:1/span 1;
grid-column:1/span 1;
white-space:nowrap;

@media screen and (max-width:1400px){
    font-size:var(--big-2);
}

@media screen and (max-width:1200px){
    top:0vh;
    position:absolute;
}

@media screen and (max-width:1024px){
    font-size:var(--heading-1);
}

@media screen and (max-width:600px){
    font-size:var(--heading-1-mobile);
}
`

const ImageContainer = styled.div`
width:46vw;
overflow:hidden;
grid-row:1/span 1;
grid-column:2/span 1;


@media screen and (max-width:1200px){
    position:absolute;
    right:2rem;
    width:49vw;
}

@media screen and (max-width:900px){
    width:70vw;
    right:0rem;
}
@media screen and (max-width:600px){
    width:80vw;
}
`
const ImageContainer2 =styled(ImageContainer)`
grid-row:2/span 1;
grid-column:1/span 1;
justify-self:end;
width:40vw;


@media screen and (max-width:1200px){
    position:absolute;
    left:0;
    right:unset;
    width:49vw;
    bottom:0;
}
@media screen and (max-width:900px){
    width:70vw;
    bottom:-30vh;
    height:auto;
    left:1rem;
}
@media screen and (max-width:600px){
    width:80vw;
}
`
const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
transform-origin:center;
will-change:transform;
`
export default function BestSellingSection(){
    const {width,height} = useWindowDimensions();
    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:containerRef,
        offset:['start end' , 'end start']
    })

    const containerY = useTransform(scrollYProgress,[0,1],[0,0]);
    const imageScale = useTransform(scrollYProgress, [0,1], [1.2,1]);
    const textY = useTransform(scrollYProgress, [0,1], ['0vw',  `${width<=600 ? '0vw' : '50vw'}`]);

    const image1Y = useTransform(scrollYProgress, [0,1], [100, -100]);
    const imageContainer1Y = useTransform(scrollYProgress, [0,1], [0, 300]);

    const image2Y = useTransform(scrollYProgress, [0,1], height>700 ? [-100 , 250]:[-100,140]);
    const imageContainer2Y = useTransform(scrollYProgress, [0,1], [0, -300]);

  
    return  (
        <Container as={motion.div} style={{y:containerY}} ref={containerRef}>
            <TextContainer as={motion.div} style={{y:textY}}>
                <Text>
                    New Arrivals<br/>
                    New Experience
                </Text>
            </TextContainer>
            <ImageContainer as={motion.div} style={{y:imageContainer1Y}}>
                <Image loading="lazy" as={motion.img} style={{scale:imageScale,y:image1Y}} src={guyInHoody} alt="guy in a hoody"/>
            </ImageContainer>
            <ImageContainer2 as={motion.div} style={{x:width>1024?"20%":"0",y:imageContainer2Y}}>
                <Image loading="lazy" as={motion.img} style={{scale:imageScale,y:image2Y}} src={girlInWhiteHoody} alt="girl in a white hoody"/>
            </ImageContainer2>
        </Container>
    )

}