import { styled } from "styled-components"
import SimpleProductCard from "../SimpleProductCard/simple-product-card";
import { useRef } from "react"
import { useFetchData } from "../../hooks/use-fetch-data"
import useUserState from "../../hooks/use-user-state"
import Loading from "../Loading/loading"
import { PRODUCTS } from "../products-data"
import { SliderTitle } from "../StyledComponents/styled-components"


const Container = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
`

const SliderContainer = styled.div`
position:relative;
`
const Slider = styled.div`
display:flex;
padding: 0 0 1rem 0;
gap:1rem;
overflow-x: scroll;
scroll-behavior: smooth;
`
export const SlideButton = styled.button`
background:white;
cursor:pointer;
border-radius:50%;
position :absolute;
padding:.8rem;
top:40%;
border:none;
outline:none;
transition:background .3s;
z-index:70;
&:hover{
    background:rgba(0,194,255,1);
}
`
export const ArrowIcon = styled.i`
font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}
`
export default function ProductsSlider({title ,url}){
    const userContext = useUserState();
    let {data, error, loading}= useFetchData(url,[],userContext);

    let products = data?.products || PRODUCTS;
    
    const sliderRef = useRef(null)
    function handleLeftButtonClick(leftOffset){
        sliderRef.current.scrollLeft += leftOffset
    }

    if (loading){
        return <Loading />;
    }

    // if (error){
    //     return <></>
    // }

    return(
        <Container> 
            <SliderTitle>{title}</SliderTitle>
            <SliderContainer>
                <SlideButton onClick={()=>{handleLeftButtonClick(-300)}} style={{left:"1%"}}>
                    <ArrowIcon className="fa-solid fa-arrow-left"/>
                </SlideButton>
                <SlideButton onClick={()=>{handleLeftButtonClick(300)}} style={{right:"1%"}} >
                    <ArrowIcon className="fa-solid fa-arrow-right"/>
                </SlideButton>
                <Slider ref={sliderRef}>
                    {products.map((product)=>(
                        <SimpleProductCard 
                            min_width={"max(200px ,28%)"}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </Slider>
            </SliderContainer>
        </Container> 
    )
}