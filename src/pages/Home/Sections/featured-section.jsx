import styled from "styled-components"
import FeaturedBox from "../Components/featured-box"
import girlInSweater from "../../../assets/girlInSweater.jpg";
import guyGirlInWhiteShirts from "../../../assets/guyGirlInWhiteShirts.jpg";
import {motion} from "framer-motion";


const Container = styled.section`
width:100%;
padding: 0 2rem;
overflow:hidden;
margin-bottom:8rem;

@media screen and (max-width:800px){
    padding : 0 1rem;
}
`

const Content =styled.div`
width:100%;
overflow:hidden;
display:flex;
flex-direction:column;
align-items:center;
gap:2rem;
`

const TextContainer = styled.div`
display:flex;
flex-direction:column;
gap:.5rem;
text-align: center;
align-items:center;
`

const Title = styled.div`
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
    top:40%;
    z-index:-1;
}
@media screen and (max-width:600px){
    font-size:var(--heading-1-mobile);
}
`
const SubTitle = styled.h6`
font-size:var(--heading-6);
font-weight:600;
color:grey;
@media screen and (max-width:600px){
    font-size:var(--heading-6-mobile);
}
`


const Boxes = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-between;
gap:11px;
overflow:hidden;

@media screen and (max-width:800px){
    flex-direction:column;
    gap:2rem;
}
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


const title = "Featured picks";

export default function FeaturedSection(){
    return (
        <Container>
            <Content>
                <TextContainer>
                    <Title as={motion.div} variants={titleVariant} initial="initial" whileInView="animate" viewport={{once:"true"}}>
                        {title.split("").map((letter,index)=>(
                            <motion.span style={{display:"inline-block"}} key={index} variants={titleVariant}>
                               {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </Title>    
                    <SubTitle>Discover our top-rated products curated just for you!</SubTitle>
                </TextContainer>
                <Boxes>
                    <FeaturedBox imageAlt={"Girl in Sweater Sitting"} image={girlInSweater} title={"Explore Cozy Elegance"} subTitle={"Indulge in warmth with our collection of stylish sweaters for her"} />
                    <FeaturedBox imageAlt={"Fashionable man and woman in chic T-shirts"} image={guyGirlInWhiteShirts} title={"Everyday Style Essentials"} subTitle={"Elevate your wardrobe with our versatile collection of T-shirts"} />
                </Boxes>
            </Content>
        </Container>

    )
}