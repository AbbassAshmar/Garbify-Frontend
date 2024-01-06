import styled from "styled-components"
import { Title } from "./featured-section"
import { SectionContent } from "./category-section"
import { SectionContainer } from "./featured-section"

const Container = styled(SectionContainer)`
display:flex;
align-items:center;
justify-content:center;
`
const Imgs = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
gap:min(10vw,5rem);
overflow:hidden;
@media screen and (max-width: 500px){
    flex-direction: column;
    height:auto;
}
`
const ImgDiv = styled.div`
margin-top: 25%;
width:max(22vw,220px); // 26 vw
overflow:hidden;
display:flex;
align-items:center;
justify-content:center;
@media screen and (max-width: 500px){
    width:100%;
    margin-top:0;
}
`
const ImgDiv2 = styled(ImgDiv)`
align-self:flex-start;
margin-top:0;
`
const Img = styled.img`
width:100%;
`
export default function BestSelling(props){
    return(
        <Container>
            <SectionContent>
                <Title>
                    {props.title}
                </Title>
                <Imgs>
                {
                props.reverse?
                <>
                    <ImgDiv>
                        <Img src={props.img1}/>
                    </ImgDiv>
                    <ImgDiv2>
                        <Img src={props.img2}/>
                    </ImgDiv2>
                </>:
                <>
                    <ImgDiv2>
                        <Img src={props.img2}/>
                    </ImgDiv2>
                    <ImgDiv>
                        <Img src={props.img1}/>
                    </ImgDiv>
                </>
                }
                </Imgs>
            </SectionContent>
        </Container>

    )
}