import styled from "styled-components"
import RecommendationsErrorPage from "../DesktopError/Components/recommendations-error-page"
import SecondSection from "../../ReviewSuccess/Sections/second-section"
import { motion,useScroll,useTransform } from "framer-motion"
import { useRef } from "react"

const Container = styled.div`
width:100%;
background:white;
overscroll-behavior:none;
scroll-behavior:smooth;
position:relative;
z-index:-1;
`

const FirstSection = styled.div`
padding:1rem;
z-index:0;
position:sticky;
top:0;
display:flex;
height:90vh;
width:100%;
`
const FirstSectionContent = styled.div`
gap:3rem;
display:flex;
margin-bottom:4rem;
align-items:center;
flex-direction:column;
justify-content:center;
`

const OopsWord = styled.h1`
`

const StatusCode = styled.h1`
line-height:30vw;
font-size:40vw;
color:#00C2FF;
`

const Message = styled.h5`
text-align:center;
font-size:var(--heading-5-mobile);
color:grey;
`

const GoHomeButton = styled.button`
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
    width:50%;
}
@media screen and (min-width:1440px){
    width:330px;
    height:43px;
}
`

const SecondSectionContainer = styled.div`
background:white;
// transform:translateY(100vh);
position:relative;
z-index:2;
overscroll-behavior:none;
scroll-behavior:smooth;
`

export default function MobileError(){
    const firstSectionRef = useRef();
    const {scrollYProgress} = useScroll({})
    const firstSectionY = useTransform(scrollYProgress,[0,.5],['0%','-100%'])

    return (
        <Container>
            <FirstSection as={motion.div} style={{y:firstSectionY}} ref={firstSectionRef}>
                <FirstSectionContent>
                    <StatusCode>400</StatusCode>

                    <div style={{display:'flex', flexDirection:"column", gap:'1rem',alignItems:'center'}}>
                        <OopsWord>Oops...</OopsWord>
                        <Message>Looks Like our servers are Down, maybe try again later ?</Message>
                    </div>
                    
                    <GoHomeButton>Go home</GoHomeButton>
                </FirstSectionContent>
            </FirstSection>
            <SecondSectionContainer>
                <RecommendationsErrorPage />
            </SecondSectionContainer>
        </Container>

    )
}