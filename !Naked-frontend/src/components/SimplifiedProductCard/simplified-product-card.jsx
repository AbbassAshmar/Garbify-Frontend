import styled from "styled-components";
import { ProductCardContainer, ProductCardDetailsContainer, ProductCardImage, ProductCardInfo, ProductLinkImage, ToggleFavoritesButton } from "../ProductCard/product-card";


export default function SimplifiedProductCard({product,style}){
    return (
        <ProductCardContainer style={style}>
            <div style={{position:"relative"}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    <ProductCardImage src={product?.thumbnail}/>
                </ProductLinkImage>  
                <ToggleFavoritesButton style={{position:'absolute',top:'2.9%',right:'3%'}} />
            </div>
 
            <ProductCardDetailsContainer>
                <ProductCardInfo average_ratings={product?.reviews_summary.average_ratings} reviews_count={product?.reviews_summary.reviews_count} name={product.name} type={product.type}/>
            </ProductCardDetailsContainer>
        </ProductCardContainer>
        
    )
}