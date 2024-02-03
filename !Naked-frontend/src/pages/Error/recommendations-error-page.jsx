import styled from "styled-components";
import TwoGirlsWearingHoodies from "../../assets/TwoGirlsWearingHoodies.png";
import SimplifiedProductCardHorizontal from "../../components/SimplifiedProductCard/Simplified-product-card-horizontal";
import { PRODUCTS } from "../../components/products-data";
import { useEffect, useState } from "react";

const Container = styled.div`
width:100%;
position:static; // fixed
top:8vh;
z-index:-1;
overflow:hidden;
`
const HeroSection = styled.div`
width:100%;
`
const ContentMediaContainer = styled.div`
display:flex;
justify-content:space-between;
position:relative;
gap:4rem;
min-height:82vh;
align-items:stretch;
@media screen and (min-width:1200px){
    gap:10rem;
}
@media screen and (max-width:800px){
    flex-direction:column-reverse;
    gap:0;
    margin:0 .5rem 0 .5rem;
}
`

const ContentContainer = styled.div`
flex:.8;
gap:2rem;
padding:2rem;
display:flex;
margin:4rem 0 4rem 0;
background:#F1F4F9;
align-self:flex-start;
overflow:hidden;
flex-direction:column;
border-radius: 0 22px 22px 0 ;
box-shadow:0px 0px 22px rgba(0,0,0,0.6);
@media screen and (max-width:800px){
    border-radius: 22px;
    padding: 2rem .5rem 2rem .5rem ;
    width:100%;
    margin:0 0 .5rem 0;
}
@media screen and (min-width:1200px){
    flex:none;
    width:38%;
    margin:4rem 0 10rem 0;
}
`

const PrimaryText = styled.h2`
font-size:var(--heading-2);
font-weight:600;
color:#00C2FF;
padding-bottom:1rem;
position:relative;

@media screen and (max-width:1200px){
    font-size:var(--heading-3);
}
@media screen and (max-width:800px){
    width:70%;
}

@media screen and (max-width:600px){
    width:100%;
}

@media screen and (max-width:400px){
    font-size:var(--heading-1-mobile);
}
&:before{
    content : "";
    left: 0;
    bottom : 0;
    height: 1px;
    width: 20%;  
    position:absolute;
    border-bottom:3px solid #00C2FF;
}
`
const SecondaryText = styled.h5`
font-size:var(--heading-6);
font-weight:600;
color:grey;
@media screen and (max-width:1200px){
    font-size:var(--heading-6);
}
@media screen and (max-width:800px){
    width:70%;
}
@media screen and (max-width:600px){
    width:100%;
}
@media screen and (max-width:400px){
    font-size:var(--heading-5-mobile);
}
`
const ShopNowButton = styled.button`
width:220px;
height:35px;
border:none;
color:white;
outline:none;
box-shadow:0px 0px 6px rgba(0,0,0,0.4);
background: #00C2FF;
font-weight:600;
border-radius:3px;
cursor:pointer;
font-size:var(--body);
transition:background .3s;
&:hover{
    background: #00C2FF;
}
@media screen and (max-width:800px){
    width:100%;
}
@media screen and (min-width:1440px){
    width:330px;
    height:43px;
}
`
const MediaContainer = styled.div`
flex:1;
position:relative;
z-index:1;
display:flex;
align-items:flex-end;
justify-content:center;
@media screen and (max-width:1200px){
    justify-content:flex-end;
}

@media screen and (max-width:800px){
    padding-right:.5rem;
}
`


const ImageContainer = styled.div`
width:70%;
@media screen and (max-width:1200px){
    width:70%;
}

@media screen and (max-width:900px){
    width:81%;

}
`

const Image = styled.img`
width:100%;
height:100%;
transform:translateY(4px);
z-index:0;
`
const HoodiesWord = styled.h1`
font-size:140px;
position:absolute;
z-index:-1;
top:15%;
right:9%;
color:white;
text-shadow: 1px 1px black, -1px -1px black;
@media screen and (max-width:1200px){
    font-size:90px;
    top:25%;
    right:3%;
}

@media screen and (max-width:1000px){
    font-size:80px;
    top:30%;
    right:0%;
}

@media screen and (max-width:800px){
    font-size:18vw;
    top:0%;
    right:none;
    left:.5rem;
}

@supports(-webkit-text-stroke: 1px black){
    color: transparent;
    -webkit-text-stroke: 3px black;
    text-shadow: none;
}

`
const OdiesSpan = styled.span`
opacity:.9;
color:#00C2FF;;
text-shadow: 1px 1px black, -1px -1px black;
@supports(-webkit-text-stroke: 1px black){
    color: transparent;
    -webkit-text-stroke: 2px white;
    text-shadow: none;
}
`
const BgCircle = styled.div`
width:60vw;
height:60vw;
background: #00C2FF;
border-radius:50%;
position:absolute;
top:-29%;
right:-40%;
z-index:-2;
@media screen and (max-width:1200px){
    width:70vw;
    height:70vw;
    top:-30%;
    right:-70%;
}
@media screen and (max-width:900px){
    width:80vw;
    height:80vw;
    top:-30%;
    right:-90%;
}
@media screen and (max-width:800px){
    width:100vw;
    height:100vw;
    top:-30%;
    right:-30%;
}

`

const SliderWindow = styled.div`
width:100%;
overflow:hidden;
`

const SlidesContainer = styled.div`
display:flex;
width:100%;
`

function CardsSlider(){
    const [currentSlideId,setCurrentSlidId] = useState(0);
    const [products , setProducts] = useState(PRODUCTS)
    const [transition,setTransition] = useState(true);

    // function to request hoodies products
    

    function slideLeft(){
        setTransition(true)
        setCurrentSlidId(1);
        setTimeout(()=>{
            setTransition(false)
            setProducts([...products.slice(1), products[0]]);
            setCurrentSlidId(0);
        },1000)
    }

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            slideLeft();
        },4000)
        return ()=>{clearInterval(intervalId)};
    },[products])

    return (
        <SliderWindow>
            <SlidesContainer style={{transform:`translateX(${-currentSlideId*(100)}%)`,transition:`${transition?'transform .3s':'none'}`}}>
                {products.map((product,index)=>{
                    return(
                        <div key={product.id} style={{minWidth:'100%'}}>
                            <SimplifiedProductCardHorizontal product={product}/>
                        </div>
                    )
                })}
            </SlidesContainer>
        </SliderWindow>
    )
}
export default function RecommendationsErrorPage(){
    const SECONDARY_TEXT = 'Explore our premium collection of hoodies, crafted with high-quality materials for maximum comfort and style';

    return (
        <Container>
            <HeroSection>
                <ContentMediaContainer>
                    <ContentContainer>
                        <CardsSlider/>
                        <PrimaryText>New Hoodies Collection</PrimaryText>
                        <SecondaryText>{SECONDARY_TEXT}</SecondaryText>
                        <ShopNowButton>Shop Now</ShopNowButton>
                    </ContentContainer>
                    <MediaContainer>
                        <BgCircle/>
                        <HoodiesWord><span style={{opacity:'.47'}}>HO</span><OdiesSpan>ODIES</OdiesSpan></HoodiesWord>
                        <ImageContainer>
                            <Image src={TwoGirlsWearingHoodies}/>
                        </ImageContainer>
                    </MediaContainer>
                </ContentMediaContainer>
            </HeroSection>
        </Container>
    )
}