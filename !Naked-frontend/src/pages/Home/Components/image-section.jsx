import styled from "styled-components"
import FrontGirl from "../../../assets/FrontGirl.jpg"
import SideGirl from "../../../assets/SideGirl.jpg"
import { SectionContainer } from "./featured-section"
const Container = styled(SectionContainer)`
height:min(80vh, 34rem);

background:url(${({$image}) =>$image});
background-size:115%;
background-position:center right;
position:relative;
z-index:0;
&::before{
    content:"";
    width:100%;
    height:100%;
    background:black;
    opacity:.4;
    position:absolute;
    z-index:-1;
}
// @media screen and (max-width:1000px){
//     height:400px;
// }
// @media screen and (max-width:600px){
//     height:auto;
// }
`
const Content = styled.div`
width:100%;
height:100%;
padding: 0 min(2rem ,5%);
display:flex;
align-items:center;
justify-content:space-between;
@media screen and (max-width:600px){
    flex-direction:column;
    gap:40px;
    justify-content:center;
    align-items:center;
}
`
const Text = styled.p`
width:40%;
font-size:50px;
color:white;
font-weight:900;
@media screen and (max-width:600px){
    font-size:40px;
    text-align:center;
    margin: 2rem 0 0 0;
    width:100%;
}
`
const ImgContainer =styled.div`
width:32%;
aspect-ratio:1/1.14;
overflow:hidden;

display:flex;
align-items:center;
justify-content:center;
border:3px solid white;
@media screen and (max-width:600px){
    width:50%;
    margin: 0 0 2rem 0;

}

`
const Img = styled.img`
width:100%;
`
export default function ImageSection(){

    return (
        <Container $image={FrontGirl}>
            <Content>
                <Text>
                    Chic<br/>
                    Elegance,<br/>
                    Discover & Shop 
                </Text>
                <ImgContainer>
                    <Img src={SideGirl}/>
                </ImgContainer>
            </Content>
        </Container>

    )
}