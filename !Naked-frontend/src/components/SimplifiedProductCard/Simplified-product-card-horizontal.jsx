

import styled from "styled-components";
import { ProductCardContainer, ProductCardDetailsContainer, ProductCardImage, ProductCardImageContainer, ProductCardInfo, ProductLinkImage, ToggleFavoritesButton } from "../ProductCard/product-card";

const ProductCardContainerHorizontal = styled(ProductCardContainer)`
display:flex;
flex-direction:row;
gap:1rem;
`
const Details = styled(ProductCardDetailsContainer)`
align-items:flex-start;
padding:0;
`
export default function SimplifiedProductCardHorizontal({style,product}){
    return (
        <ProductCardContainerHorizontal style={style}>
            <div style={{position:"relative"}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    <ProductCardImageContainer>
                        <ProductCardImage  src={product?.thumbnail}/>
                    </ProductCardImageContainer>
                </ProductLinkImage>  
                <ToggleFavoritesButton style={{position:'absolute',top:'2.9%',right:'3%'}} />
            </div>
 
            <Details>
                <ProductCardInfo product={product} name_first={true}/>
            </Details>
        </ProductCardContainerHorizontal>
        
    )
}