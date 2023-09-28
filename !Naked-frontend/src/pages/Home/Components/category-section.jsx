import styled from "styled-components"
import CatgegoryCard from "./category-card"
import woman from "../../../assets/woman.jpg"
import man from "../../../assets/man.jpg"
import kid from "../../../assets/kid.jpg"
import { SectionContainer } from "./featured-section"

export const SectionContent =styled.div`
width:100%;
overflow:hidden;
display:flex;
flex-direction:column;
align-items:center;

gap:min(17vh, 7rem);
padding: 0 min(2rem ,5%);
`

const Section2Title = styled.div`
font-size:20px;
font-weight:bold;
text-align:center;
`

const CategoryCardsContainer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
gap:25px;
@media screen and (max-width:700px){
    gap:2px;
}

@media screen and (max-width:550px){
    flex-direction:column;
    gap:10px;
}
    

`

export default function CategorySection(){

    return (
            <SectionContainer>
                <SectionContent>
                    <Section2Title>
                        Shop Now <span style={{color:"#00C2FF"}}>Online</span>  And Put Some Clothes On
                    </Section2Title>
                    <CategoryCardsContainer>
                        <CatgegoryCard color="blue" text="men" image={man} />
                        <CatgegoryCard color="pink" text="women" image={woman} />
                        <CatgegoryCard color="purple" text="kids" image={kid} />
                    </CategoryCardsContainer>
                </SectionContent>
            </SectionContainer>

    )
}