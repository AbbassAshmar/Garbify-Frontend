import styled from "styled-components";
import { ProductCardContainer, ProductCardDetailsContainer, ProductCardImage, ProductLinkImage, ToggleFavoritesButton, renderHighLight, renderRatingCont } from "../ProductCard/product-card";
import { productNameAndType } from "../SimpleProductCardHorizontal/Simple-product-card-horizontal";

const ReviewProductButton = styled.button`
width:100%;
height:40px;

outline:none;
border:none;
border-radius: 4px;
box-shadow:0px 4px 6px rgba(0,0,0,0.4);
font-weight:600;
border-radius:3px;
cursor:pointer;
color:black;
background:white;
transition:background .3s;
&:hover{
    background: rgb(200,200,200);
}

`
export default function SimpleProductCardReview({product,style}){
    return (
        <ProductCardContainer style={style}>
            <div style={{position:"relative"}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    {renderHighLight(product.sale)}
                    <ProductCardImage src={product?.thumbnail}/>
                </ProductLinkImage>  
                <ToggleFavoritesButton style={{position:'absolute',top:'2.9%',right:'3%'}} />
            </div>
            <ProductCardDetailsContainer style={{background:"transparent"}}>
                {productNameAndType(product.name,product.type)}
                {renderRatingCont(product.reviews_summary.average_ratings,product.reviews_summary.reviews_count)}
                <ReviewProductButton>Review product</ReviewProductButton>
            </ProductCardDetailsContainer>
        </ProductCardContainer>
        
    )
}