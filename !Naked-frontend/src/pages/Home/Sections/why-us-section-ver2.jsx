import styled from "styled-components";
import modelGirlGrey from "../../../assets/modelGirlGrey.png";
import blueDeliveryGirl from "../../../assets/blueDeliveryGirl.png";
import modelGirlInBlack from "../../../assets/modelGirlInBlack.png";
import manInHoodyUnderlay from "../../../assets/manInHoodyUnderlay.png";


const Container = styled.section`
width:100%;
padding: 0 2rem;
@media screen and (max-width:600px){
    padding: 0 1rem;
}

`
const Content = styled.div`
gap:2rem;
width:100%;
display:grid;
grid-template-columns:1.06fr 1fr 1fr;
grid-template-rows:.3fr .6fr 1fr;
align-items:start;

@media screen and (max-width:1024px){
    grid-template-columns:1fr 1fr;
    grid-template-rows:.2fr 1fr 1fr;
}

@media screen and (max-width:600px){
    gap:4rem;
    grid-template-columns:1fr;
    grid-template-rows:.2fr .8fr .8fr 2fr;
}

`
const WhyUsTitle = styled.div`
border-radius:10px;
height:100%;
width:100%;
font-weight:bold;
color:var(--main-color);
font-size: var(--heading-1);
display:flex;
align-items:center;
justify-content:center;
grid-column: 1 / span 1;
grid-row: 1 / span 1;
text-shadow:4px 6px 6px rgba(0,0,0,0.5);
background: linear-gradient(to right, #f1f4f9, #dddddb, #f1f4f9);

@media screen and (max-width:800px){
    font-size:var(--heading-1-mobile);
}
`
const BlackHoodyImageContainer = styled.div`
transform:translateX(-2rem);
grid-column: 1 / span 1;
grid-row: 2 / span 2;
width:calc(100% + 2rem);

@media screen and (max-width:1024px){
    display:none;
}
`
const BlackHoodyImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`

const BoxTitle = styled.h2`
text-shadow:1px 4px 4px rgba(0,0,0,0.5);
font-size:var(--heading-2);
font-weight:600;
color:white;
line-height:52px;
@media screen and (max-width:1400px){
    font-size:var(--heading-3);
    line-height:42px;
}
@media screen and (max-width:800px){
    font-size:var(--heading-3-mobile);
    line-height:27.5px;
}
`
const BoxSubtitle = styled.h5`
font-size:var(--heading-5);
font-weight:600;
color:white;
width:90%;
@media screen and (max-width:1400px){
    font-size:var(--heading-6);
}
@media screen and (max-width:800px){
    font-size:var(--heading-6-mobile);
}
`

const FastDeliveryBox = styled.div`
width:100%;
height:100%;
padding:3rem 1rem;
background:url(${blueDeliveryGirl});
background-size:cover;
background-position:top;
border-radius:10px;
grid-column: 2 / span 1;
grid-row: 1 / span 2;
display:flex;
gap:2rem;
flex-direction:column;
@media screen and (max-width:1024px){
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
}
@media screen and (max-width:600px){
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
}
`
const QuickExchangeBox = styled.div`
width:100%;
padding:3rem 1rem;
height:100%;
border-radius:10px;
background:url(${modelGirlInBlack});
background-size:cover;
background-position:top;

grid-column: 3 / span 1;
grid-row: 1 / span 2;
display:flex;
flex-direction:column;
gap:2rem;
@media screen and (max-width:1024px){
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
}
@media screen and (max-width:600px){
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
}
`
const MaterialQualityContainer = styled.div`
display:flex;
width:100%;
grid-column: 2 / span 2;
grid-row: 3 / span 1;
border-radius:10px;
background: linear-gradient(to right, #F1F2F9, #F1F4F9, #DDDDDB);
@media screen and (max-width:1024px){
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
}
@media screen and (max-width:600px){
    grid-column: 1 / span 1;
    grid-row: 4 / span 1;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:2rem;
}
`

const MaterialQualityContent = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
padding:1.5rem;
flex:2;
position:relative;
@media screen and (max-width:600px){
    padding:1rem;
    padding-bottom:0;
}
`
const MaterialQualityLine = styled.div`
height:100%;
width:30px;
position:absolute;
background:white;
right:-5.5%;
top:-10%;
height:120%;
transform:rotate(22deg);
@media screen and (max-width:600px){
    display:none;
}
`
const MaterialQualityTitle = styled.h2`
font-weight:bold;
color:black;
font-size: var(--heading-2);
line-height:52px;
text-wrap:nowrap;

@media screen and (max-width:1400px){
    line-height:42px;
    font-size: var(--heading-3);
}
@media screen and (max-width:800px){
    font-size:var(--heading-3-mobile);
    line-height:27.5px;
}
@media screen and (max-width:600px){
    text-wrap:wrap;
}

@media screen and (max-width:350px){
    font-size:var(--heading-4-mobile);
}

`
const MaterialQualitySubtitle = styled.h4`
font-weight:600;
color:grey;
font-size: var(--heading-6);
line-height:26px;

@media screen and (max-width:800px){
    font-size:var(--heading-6-mobile);
}
@media screen and (max-width:600px){
    font-size:var(--body);
}
`
const ExploreNowButton = styled.button`
width:50%;
height:50px;
color:white;
outline:none;
border:none;
cursor:pointer;
max-width:312px;
font-weight:600;
border-radius:3px;
transition:background .3s;
font-size:var(--heading-5);
background:var(--main-color);
box-shadow:10px 9px 12px -3px rgba(0,0,0,0.4) ;
@media screen and (max-width:1470px){
    font-size:var(--body);
    height:40px;
}
@media screen and (max-width:800px){
    width:55%;
    min-width:164px;
    height:36px;
    max-width:none;
}
@media screen and (max-width:600px){
    height:35px;
}

&:hover{
    background:#009BCC;
}
`
const MaterialQualityImageContainer = styled.div`
flex:1.2;
`

const MaterialQualityImage= styled.img`
width:100%;
height:100%;
object-fit:cover;
`
export default function WhyUseSection(){
    return(
        <Container>
            <Content>
                <WhyUsTitle>
                    Why&nbsp; <span style={{color:"white"}}> Us ?</span>
                </WhyUsTitle>
                <FastDeliveryBox>
                    <BoxTitle><span style={{color:"var(--main-color)"}}>Fast</span><br/>Delivery</BoxTitle>
                    <BoxSubtitle>Enjoy free, speedy global shipping, with the option cash payment on arrival !</BoxSubtitle>
                </FastDeliveryBox>
                <QuickExchangeBox>
                    <BoxTitle>Quick<br/><span style={{color:"var(--main-color)"}}>Exchange</span></BoxTitle>
                    <BoxSubtitle>Hassle-free returns or exchange it it doesn’t fit you !</BoxSubtitle>
                </QuickExchangeBox>
                <BlackHoodyImageContainer>
                    <BlackHoodyImage src={manInHoodyUnderlay} alt="guy in black hoody with deep sky blue underlay" />
                </BlackHoodyImageContainer>
                <MaterialQualityContainer>
                    <MaterialQualityContent>
                        <div style={{display:'flex', flexDirection:"column", gap:'1rem'}}>
                            <MaterialQualityTitle>
                                Outstanding <span style={{color:"var(--main-color)"}}>Material</span><br/>
                                <span style={{color:"var(--main-color)"}}>Exceptional</span> Elegance
                            </MaterialQualityTitle>
                            <MaterialQualitySubtitle>
                                Indulge in a symphony of exquisite fabrics,
                                craftsmanship, and sophistication for timeless allure.
                            </MaterialQualitySubtitle>
                        </div>
                        <ExploreNowButton>Explore now</ExploreNowButton>
                        <MaterialQualityLine />
                    </MaterialQualityContent>
                    <MaterialQualityImageContainer>
                        <MaterialQualityImage src={modelGirlGrey} alt="model girl holding bag" />
                    </MaterialQualityImageContainer>
                </MaterialQualityContainer>
            </Content>
        </Container>
    )
}