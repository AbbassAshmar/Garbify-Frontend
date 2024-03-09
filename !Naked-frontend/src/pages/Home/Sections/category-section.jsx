import styled from "styled-components"
import CatgegoryCard from "../Components/category-card"
import kid from "../../../assets/kid.jpg";
import guyInCoat from "../../../assets/guyInCoat.jpg";
import girlInCoat from "../../../assets/girlInCoat.jpg"
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
font-weight:800;
text-align:center;
font-size:clamp(.8rem,4vw,1.7rem);
`

const CategoryCardsContainer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;

@media screen and (max-width:600px){
    flex-direction:column;
    gap:3rem;
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
                        <CatgegoryCard color="blue" text="men" image={guyInCoat} />
                        <CatgegoryCard color="pink" text="women" image={girlInCoat} />
                        <CatgegoryCard color="purple" text="kids" image={kid} />
                    </CategoryCardsContainer>
                </SectionContent>
            </SectionContainer>

    )
}