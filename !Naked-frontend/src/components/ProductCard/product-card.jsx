import styled from "styled-components"
import {Link} from "react-router-dom"

const Container = styled.div`
min-width:${({min_width})=>{return (min_width?min_width:"auto")}};
overflow:hidden;
box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
height:auto;
border-radius:6px;
`
const LinkContainer = styled(Link)`
display:flex;
flex-direction:column;
text-decoration:none;
color:black;
height:100%;
`
const ImageContainer = styled.div`
flex:4;
`
const Image  = styled.img`
object-fit: cover; 
width: 100%;
height: 100%;
margin:0;
`
const Details = styled.div`
margin:0;
display:flex;
flex-direction:column;
gap:.5rem;
width:100%;
padding:.5rem;
`
const Name =styled.h2`
margin:0;
font-weight:600;
font-size:clamp(.9rem, 2.6vw, 1.3rem);
`
const Category = styled.p`
margin:0;
color: grey;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const ColorCount = styled.div`
color:grey;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const Price = styled.p`
margin:0;
font-weight:600;
`
const PriceContainer =styled.div`
display:flex;
gap:.5rem;
align-items:flex-end;
flex-wrap:wrap;
width:100%;
`
const NewPrice =styled.p`
margin:0;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const OldPrice =styled.p`
margin:0;
color:grey;
opacity:.6;
font-weight:600;
text-decoration:line-through;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const SalePercentage =styled.p`
margin:0;
color:green;
font-size:1rem;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`

export default function ProductCard({thumbnail, price, name,quantity,type,sale,colors,pk,min_width}){
    const getPrice = ()=>{
        if (sale){
            return(
                <PriceContainer>
                    <div style={{display:"flex", gap:".5rem"}}>
                        <NewPrice>{sale.price_after_sale}$</NewPrice>
                        <OldPrice>{price}$</OldPrice>
                    </div>
                    <SalePercentage>
                        {sale.percentage} % Off
                    </SalePercentage>
                </PriceContainer>
            )
        }
        return `${price} $`
    }
    return(
        <Container min_width={min_width}>
            <LinkContainer to={`/product/${name.replaceAll(" ",'-')}/${pk}`}>
            <ImageContainer>
                <Image src={thumbnail}/>
            </ImageContainer>
            <Details>
                <Name>
                    {name}
                </Name>
                <Category>
                    {type}
                </Category>
                <ColorCount>
                    {colors.length} {colors.length==1 ? "Color" : "Colors"}
                </ColorCount>
                <Price>
                    {getPrice()}
                </Price>
            </Details>
            </LinkContainer>
        </Container>
    )
}