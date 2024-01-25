import styled from "styled-components";
import { ProductCardContainer, ProductCardDetailsContainer, ProductCardImage, ProductCardImageContainer, ProductCardInfo, ProductLinkImage, ToggleFavoritesButton } from "../ProductCard/product-card";

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
export default function SimplifiedReviewProductCard({product,style}){
    return (
        <ProductCardContainer style={style}>
            <div style={{position:"relative"}}>
                <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    <ProductCardImageContainer>
                        <ProductCardImage src={product?.thumbnail}/>
                    </ProductCardImageContainer>
                </ProductLinkImage>  
                <ToggleFavoritesButton style={{position:'absolute',top:'2.9%',right:'3%'}} />
            </div>
 
            <ProductCardDetailsContainer style={{background:"transparent"}}>
                <ProductCardInfo average_ratings={product?.reviews_summary.average_ratings} reviews_count={product?.reviews_summary.reviews_count} name={product.name} name_first={true}/>
                <ReviewProductButton>Review product</ReviewProductButton>
            </ProductCardDetailsContainer>
        </ProductCardContainer>
        
    )
}