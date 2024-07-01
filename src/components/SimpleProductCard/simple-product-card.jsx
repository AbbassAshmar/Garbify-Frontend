import styled from "styled-components";
import { renderHighLight,ProductCardContainer, ProductCardDetailsContainer, ProductCardImage, ProductLinkImage, ToggleFavoritesButton, getPrice, renderRatingCont } from "../ProductCard/product-card";
import { productNameAndType } from "../SimpleProductCardHorizontal/Simple-product-card-horizontal";

export default function SimpleProductCard({product,style,min_width}){

    return (
        <ProductCardContainer style={style} $min_width={min_width}>
            <div style={{position:"relative"}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    {renderHighLight(product?.sale)}
                    <ProductCardImage src={product?.thumbnail}/>
                </ProductLinkImage>      
                <ToggleFavoritesButton style={{position:'absolute',top:'2.9%',right:'3%'}} />
            </div>
            <ProductCardDetailsContainer>
                {productNameAndType(product.name,product.type)}
                {renderRatingCont(product.reviews_summary.average_ratings,product.reviews_summary.reviews_count)}
                {getPrice(product.price,product.sale)}
            </ProductCardDetailsContainer>
        </ProductCardContainer>
        
    )
}