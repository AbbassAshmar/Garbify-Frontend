import styled from "styled-components";
import { useRef, useState } from "react";
import FirstSection from "./Sections/first-section";
import SecondSection from "./Sections/second-section";
import ThirdSection from "./Sections/third-section";
import FourthSection from "./Sections/fourth-section";
import {useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const Container = styled.div`
overflow:hidden;
display:flex;
flex-direction:column;
margin:auto;
scroll-behavior: smooth;
position:relative;
background:white;
`


export const cardsTitleVariant = {
    'initial': {
        x:-100,
        opacity: 0,
    },
    'animate': {
        x:0,
        opacity: 1,
        transition:{
            duration:.4,
            delay:.3
        }
    }
};


export const cardVariant = {
    'initial': {
        y:100,
        opacity: 0,
    },
    'animate': (delay=0)=> ({
        y:0,
        opacity: 1,
        transition:{
            duration:.3,
            delay:delay
        }
    })
}


export default function ReviewSuccess({action}){
    const smallScreen = window.innerWidth < 800;

    const [rotationState, setRotationState] = useState("-14deg");

    const firstSectionRef = useRef();
    const secondSectionRef = useRef();

    const {scrollYProgress:firstSectionScrollYProgress} = useScroll({
        target:firstSectionRef,
        // start of firstSectionRef meets end of viewport = 0
        offset: [smallScreen? '0.3 start' :"-0.2 start" , "end start"]
    });

    const {scrollYProgress:secondSectionScrollYProgress} = useScroll({
        target:secondSectionRef,
        offset:['center start','end start']
    })


    let secondSectionEntranceRotation = useTransform(firstSectionScrollYProgress,[0,1],["-14deg", "0deg"]);
    let secondSectionExitRotation = useTransform(secondSectionScrollYProgress,[0,1],['0deg','30deg']);

    useMotionValueEvent(secondSectionEntranceRotation,'change',(latest)=>{
        setRotationState(latest)
    } )

    useMotionValueEvent(secondSectionExitRotation,'change',(latest)=>{
        setRotationState(latest)
    } )

    return (
        <Container>
            <FirstSection action={action} containerRef={firstSectionRef}/>

            <SecondSection containerRef={secondSectionRef} rotationState={rotationState}/>
    
            <ThirdSection />

            <FourthSection />
        </Container>
    )
}