import styled from "styled-components";
import TwoGirlsWearingHoodies from "../../assets/TwoGirlsWearingHoodies.png";
import SimplifiedProductCardHorizontal from "../../components/SimplifiedProductCard/Simplified-product-card-horizontal";
import { PRODUCTS } from "../../components/products-data";
import { useEffect, useRef, useState } from "react";
import useUserState from "../../hooks/use-user-state";
import { useFetchData } from "../../hooks/use-fetch-data";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { useScroll, useTransform,motion, useMotionValueEvent } from "framer-motion";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import { Link } from "react-router-dom";

const Container = styled.div`
width:100%;
position:static; // fixed
top:8vh;
z-index:-1;
overflow:hidden;
display:flex;
flex-direction:column;
gap:6rem;
`
const HeroSectionContainer = styled.div`
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

const SliderContainer = styled.div`
padding:0 2rem;
@media screen and (max-width:800px){
padding: 0 1rem;
}
`

function HeroSection(){
    const SECONDARY_TEXT = 'Explore our premium collection of hoodies, crafted with high-quality materials for maximum comfort and style';

    return (
        <HeroSectionContainer>
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
        </HeroSectionContainer>
    )
}

function CardsSlider(){
    const userContext = useUserState();

    let uri = '/api/products?categories[]=hoodies&limit=10';
    const {data,setData:setProducts,loading,error} = useFetchData(uri,[],userContext);
    let products = data || PRODUCTS;

    const [currentSlideId,setCurrentSlidId] = useState(0);
    const [transition,setTransition] = useState(true);
    
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
        <>
        {products&&(
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
        )}
        </>
    )
}


const GalleryContainer= styled.div`
margin: 0 0 4rem 0;
@media screen and (max-width:800px){
    padding: 0 1rem;
}
`

const Gallery = styled.div`
height:190vh;
overflow:hidden;
padding:0 2rem;
justify-content:center;
display:flex;
gap:2vw;
`
const ImagesColumn = styled.div`
width:${({$width})=>$width};
// overflow:hidden;
display:flex;
flex-direction:column;
gap:2vw;
position:relative;
top:${({$height})=> -$height}px;
transition:transform .2s;
`
const ProductImageContainer = styled(Link)`
display:block;
width:100%;
height:100%;
border-radius:1vw;
overflow:hidden;
transition:transform .3s , box-shadow .3s;
&:hover{
    box-shadow:0px 0px 7px #00C2FF;
    transform:scale(1.1);
}
`
const ProductImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`

export default function RecommendationsErrorPage(){
    const {height,width} = useWindowDimensions();
    const GalleryContainerRef = useRef();

    const userContext = useUserState();
    let uri = '/api/products?limit=10';

    const {data,loading,error} = useFetchData(uri,[],userContext);
    let products = data || PRODUCTS;

    const columnsCount = width < 600 ? 2 : width < 800 ? 3 : 4;
    const imagesPerColumn = products.length / columnsCount;

    const {scrollYProgress}  = useScroll({
        target:GalleryContainerRef,
        offset:['start end','end start']
    });

    const columnsArray =Array.from({length:columnsCount},(_,index)=>{
        let start= (index * columnsCount)-index; //0  //4
        let end = start + imagesPerColumn; //3 0-1-2 //7 4-5-6
        return products.slice(start,end);
    }) 
   
    const valuesArray = Array.from({length:columnsCount},(_)=>{
        let randomNum = Math.random() * (columnsCount) 
        console.log(randomNum)
        const y = useTransform(scrollYProgress,[0,1],[0, height*randomNum]);

        return [randomNum*height,y];
    })

    return (
        <Container>
            <HeroSection />
            <SliderContainer>
                <ProductsSlider title={'You may Like'} url={'/api/products?limit=10'} />
            </SliderContainer>

            <GalleryContainer ref={GalleryContainerRef}>
                <Gallery>
                    {columnsArray.map((array,index)=>{
                        return (
                            <ImagesColumn $width={100/columnsCount + "%"} $height={valuesArray[index][0]/2} as={motion.div} key={index} style={{y:valuesArray[index][1]}}>
                                {array.map((element)=>{
                                    return (
                                        <ProductImageContainer to={'/product/'+element.name+"/"+element.id} key={element.id}>
                                            <ProductImage src={element.thumbnail} />
                                        </ProductImageContainer>
                                    )
                                })}
                            </ImagesColumn>
                        )
                    })}
                </Gallery>
            </GalleryContainer>
        </Container>
    )
}