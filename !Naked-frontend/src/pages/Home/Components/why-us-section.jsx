import styled from "styled-components"
import WhyUsBox1 from "./why-us-box1"
import WhyUsBox2 from "./why-us-box2"
import airplane from "../../../assets/airplane.png"
import clothes from "../../../assets/clothes.png"
import { SectionContainer } from "./featured-section"
import { Title } from "./featured-section"
import { SectionContent } from "./category-section"


const Boxes= styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
gap:25px;

@media screen and (max-width:940px){
    flex-direction:column;
}
`
const SmallBoxes = styled.div`
display:flex;
justify-content:space-between;
gap:25px;
width:60%;
@media screen and (max-width:945px){
    width:520px;
}
@media screen and (max-width:600px){
    flex-direction:column;
    width:100%;
}
`

const BigBox = styled.div`
overflow:hidden;
width:50%;
@media screen and (max-width:945px){
    width:520px;
}
@media screen and (max-width:600px){
    width:100%;
}
`
export default function WhyUsSection(){
    return (
        <SectionContainer>
            <SectionContent>
                <Title>
                    Why Us ?
                </Title>
                <Boxes>
                    <BigBox>
                        <WhyUsBox1 />
                    </BigBox>
                    <SmallBoxes>
                        <WhyUsBox2 
                        title="Fast Delivery" 
                        text="Enjoy free, speedy global shipping, 
                        with the option cash payment on arrival !"
                        color="#00C2FF"
                        border="#85E2FF"
                        img={airplane}
                        imgRotate='-20deg'
                        />
                        <WhyUsBox2 
                        title="Quick Exchange" 
                        text="Hassle-free returns or
                        exchange if it doesn't fit"
                        color="#DEDADA"
                        border="#B7BBBC"
                        img={clothes}
                        reverse={true}
                        />
                    </SmallBoxes>
                </Boxes>
            </SectionContent>
        </SectionContainer>

    )
}