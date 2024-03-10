import styled from "styled-components"
import CatgegoryCard from "../Components/category-card"
import littleGirl from "../../../assets/littleGirl.jpg";
import guyInCoat from "../../../assets/guyInCoat.jpg";
import girlInCoat from "../../../assets/girlInCoat.jpg"
import { SectionContainer } from "./featured-section"
import {motion} from "framer-motion";
export const SectionContent =styled.div`
width:100%;
overflow:hidden;
display:flex;
flex-direction:column;
align-items:center;
gap:4rem;
padding: 0 min(2rem ,5%);
`

const Title = styled.h4`
font-weight:800;
text-align:center;
display:inline-block;
font-size:var(--heading-4);
color:var(--main-color);
display:inline-block;
`

const CategoryCardsContainer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
gap:2rem;
@media screen and (max-width:600px){
    flex-direction:column;
    gap:3rem;
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
const title = "Shop Now Online And Put Some Clothes On";

export default function CategorySection(){

    return (
            <SectionContainer>
                <SectionContent>
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
                </SectionContent>
            </SectionContainer>

    )
}