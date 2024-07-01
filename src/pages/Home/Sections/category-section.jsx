import {motion} from "framer-motion";
import styled from "styled-components";
import CatgegoryCard from "../Components/category-card";
import littleGirl from "../../../assets/littleGirl.jpg";
import guyInCoat from "../../../assets/guyInCoat.jpg";
import girlInCoat from "../../../assets/girlInCoat.jpg";
import useWindowDimensions from "../../../hooks/use-window-dimensions";

const Container = styled.section`
padding: 0 2rem;
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
gap:3rem;
`

const Title = styled.span`
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

const CategoryCardsContainer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
gap:2rem;

@media screen and (max-width:600px){
    flex-direction:column;
}
`

const titleVariant ={ 
    initial:{
        y:20,
        opacity:0
    },
    animate:{
        y:0,
        opacity:1,
        transition:{
            staggerChildren:.02
        },
    }
}

export default function CategorySection(){
    const {width} = useWindowDimensions();

    const title = width > 800 ? "Elevate Every Wardrobe Now": "Style Boost";

    return (
        <Container>
            <Content>
                <Title as={motion.span} variants={titleVariant} initial="initial" whileInView="animate" viewport={{once:"true"}}>
                    {title.split("").map((letter,index)=>(
                        <motion.span style={{display:"inline-block"}} key={index} variants={titleVariant}>
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </Title>
                <CategoryCardsContainer>
                    <CatgegoryCard color="blue" text="Men" image={guyInCoat} />
                    <CatgegoryCard color="pink" text="Women" image={girlInCoat} />
                    <CatgegoryCard color="purple" text="Kids" image={littleGirl} />
                </CategoryCardsContainer>
            </Content>
        </Container>

    )
}