import { styled } from "styled-components"
import ProductCard from "../../../components/ProductCard/product-card"
import { useEffect, useRef } from "react"

const Container = styled.div`

`
const Title = styled.h2`
font-size:1.8em; 
font-weight:800;
// margin:0 0 2rem 0; 
margin:0 0 2% 0 ;

`
const SliderContainer = styled.div`
position:relative;
`
const Slider = styled.div`
padding:1rem 0;
display:flex;
gap:1rem;
overflow-x: scroll;
scroll-behavior: smooth;

`
const SlideButton = styled.button`
background:white;
cursor:pointer;
border-radius:50%;
position :absolute;
padding:.8rem;
top:40%;
left:95%;
border:none;
outline:none;
transition:background .3s;
&:hover{
    background:rgba(0,194,255,1);
}
`
export default function ProductsSlider(props){
    const sliderRef = useRef(null)
    function handleLeftButtonClick(leftOffset){
        sliderRef.current.scrollLeft += leftOffset
    }
    return(
        <Container> 
            <Title>
                You may also like : 
            </Title>
            <SliderContainer>
                <SlideButton onClick={()=>{handleLeftButtonClick(-300)}} style={{left:"1%"}}>
                    <i style={{fontSize:"1.6em"}} className="fa-solid fa-arrow-left"/>
                </SlideButton>
                <SlideButton onClick={()=>{handleLeftButtonClick(300)}} >
                    <i style={{fontSize:"1.6em"}} className="fa-solid fa-arrow-right"/>
                </SlideButton>
                <Slider ref={sliderRef}>
                    {
                        props.products.map((product)=>{
                            return(
                                <ProductCard 
                                    min_width={"max(300px ,32.3%)"}
                                    pk ={product.pk}
                                    name={product.name} 
                                    price={product.price} 
                                    quantity={product.quantity}
                                    colors={product.colors}
                                    type={product.type}
                                    thumbnail={product.thumbnail}
                                    sale={product.sale}
                                />
                            )
                        })
                    }
                </Slider>
            </SliderContainer>
        </Container> 
    )
}