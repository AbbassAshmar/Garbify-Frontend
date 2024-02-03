

import styled from "styled-components";
import {ToggleFavoritesButton } from "../ProductCard/product-card";
import RatingStars from "../RatingStars/rating-stars";
import Discount from "../../assets/Discount.png";
import { Link } from "react-router-dom";


const ProductLinkImage = styled(Link)`
width:27%;
aspect-ratio:1/1.04;
position:relative;
display:flex;
max-width: 120px;
`
const Image = styled.img`
object-fit: cover; 
width: 100%;
height: 100%;
margin:0;
border-radius: 17px 0 0 17px;
`

const DiscountContainer = styled.div`
position:absolute;
top:4px;
left:4px;
width:40%;
`

const DiscountImg = styled.img`
width:100%;
`

const DiscountPercent = styled.p`
position:absolute;
top: 45%;
left: 53%;
transform: translate(-50%, -50%);
font-size:var(--small-1);
font-weight:600;
color:black;
z-index:5;
@media screen and (max-width:400px){
    font-size:var(--small-2);
}
`

const ProductCardContainerHorizontal = styled.div`
display:flex;
width:100%;
gap:1rem;
align-items:center;
`

const DetailsContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-end;
gap:16px;
flex:1;
`
const Details = styled.div`
display:flex;
flex-direction:column;
gap:8px;
`
const Name = styled.div`
font-weight:600;
font-size:var(--body);
@media screen and (max-width:600px){
    font-size:var(--small-1-mobile);
}
`

const Type = styled.span`
background:#00C2FF;
font-size:var(--small-1);
border-radius:3px;
color:black;
font-weight:600;
padding:0px 6px;
text-wrap:nowrap;
@media screen and (max-width:600px){
    font-size:var(--small-2-mobile);
}
`
const Reviews = styled.div`
display:flex;
gap:8px;
align-items:center;
`

const ReviewsCount = styled.p`
font-size:var(--small-1);
font-weight:600;
color:grey;
@media screen and (max-width:600px){
    font-size:var(--small-2-mobile);
}
`
const NewPrice =styled.h6`
margin:0;
font-weight:600;
font-size:var(--heading-6);
@media screen and (max-width:600px){
    font-size:var(--heading-6-mobile);
}
`
const OldPrice =styled.p`
margin:0;
color:grey;
font-weight:600;
text-decoration:line-through;
font-size:var(--body);
@media screen and (max-width:600px){
    font-size:var(--small-1-mobile);
}
`

const Price = styled.div`
display:flex;
align-items:flex-end;
gap:8px;
`



export default function SimplifiedProductCardHorizontal({style,product,image_width}){
    const getPrice = ()=>{
        if (product?.sale){
            return(
                <>
                    <NewPrice>{product?.sale.price_after_sale}$</NewPrice>
                    <OldPrice>{product?.price}$</OldPrice>
                </>
            )
        }
        return <NewPrice>{product?.price}$</NewPrice>
    }

    return (
        <ProductCardContainerHorizontal>
            <ProductLinkImage to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                <Image  src={product?.thumbnail}/>
                {product.sale &&(
                    <DiscountContainer>
                        <DiscountImg src={Discount} alt={"discount"} />
                        <DiscountPercent>{product.sale.percentage}%</DiscountPercent>
                    </DiscountContainer>
                )}
            </ProductLinkImage>  
            <DetailsContainer>
                <Details>
                    <Name>
                        <spane style={{marginRight:'8px'}}>{product.name}</spane> 
                        <Type>{product.type}</Type>
                    </Name>
                    <Reviews>
                        <RatingStars rating={product.rating} />
                        <ReviewsCount>({product.reviews_summary.reviews_count} reviews)</ReviewsCount>
                    </Reviews>
                    <Price>{getPrice()}</Price>
                </Details>
                <ToggleFavoritesButton />
            </DetailsContainer>
        </ProductCardContainerHorizontal>
        
    )
}