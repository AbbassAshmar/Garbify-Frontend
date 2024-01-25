

import styled from "styled-components";
import { ProductCardContainer, ProductCardDetailsContainer, ProductCardImage, ProductCardImageContainer, ProductCardInfo, ProductLinkImage, ToggleFavoritesButton } from "../ProductCard/product-card";


const ImageContainer = styled(ProductCardImageContainer)`
width: ${({$width})=>$width};
`

const ProductCardContainerHorizontal = styled(ProductCardContainer)`
display:flex;
flex-direction:row;
gap:1rem;
`
const Details = styled(ProductCardDetailsContainer)`
align-items:flex-start;
padding:0;
`
export default function SimplifiedProductCardHorizontal({style,product,image_width}){
    return (
        <ProductCardContainerHorizontal style={style}>
            <div style={{position:"relative"}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    <ImageContainer $width={image_width}>
                        <ProductCardImage  src={product?.thumbnail}/>
                    </ImageContainer>
                </ProductLinkImage>  
                <ToggleFavoritesButton style={{position:'absolute',top:'2.9%',right:'3%'}} />
            </div>
 
            <Details>
                <ProductCardInfo average_ratings={product?.reviews_summary.average_ratings} reviews_count={product?.reviews_summary.reviews_count} name={product.name} type={product.type} product={product} name_first={true}/>
            </Details>
        </ProductCardContainerHorizontal>
        
    )
}