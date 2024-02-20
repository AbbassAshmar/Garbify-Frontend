import styled from "styled-components"
import FeaturedBox from "../Components/featured-box"
import hoody from "../../../assets/Hoody.jpg"
import hoody2 from "../../../assets/Hoody2.jpg"
import { SectionContent } from "./category-section"

export const SectionContainer = styled.div`
margin: min(17vh, 6rem) 0 0 0;
width:100%;
`

export const Title = styled.h2`
font-size:clamp(.8rem,4vw,1.7rem);
font-weight:800;
`

const Boxes = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-between;
gap:11px;
overflow:hidden;
@media screen and (max-width:670px){
    flex-direction:column;
    gap:10px;
}
`
export default function FeaturedSection(){
    return (
        <SectionContainer>
            <SectionContent style={{justifyContent:"center"}}>
                <Title>Featured</Title>
                <Boxes>
                    <FeaturedBox image={hoody}  category={"Hoody"} text={"New High Quality Hoodies"} />
                    <FeaturedBox image={hoody2} category={"Hoody"} text={"Custom Made Hoodies"} />
                </Boxes>
            </SectionContent>
        </SectionContainer>

    )
}