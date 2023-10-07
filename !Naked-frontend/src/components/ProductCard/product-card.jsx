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
// width:100%;
display:flex;
flex-direction:column;
text-decoration:none;
color:black;
height:100%;
`
const Image  = styled.img`
flex:4;
width:100%;
margin:0;
// aspect-ratio:1/1.25;

`
const Details = styled.div`
margin:0;
display:flex;
flex-direction:column;
gap:.3rem;
width:100%;
padding:.5rem;
`
const Name =styled.h2`
margin:0;
font-size:1.3rem;
font-weight:600;

@media screen and (max-width:800px){
    font-size:1rem;
}
`
const Category = styled.p`
margin:0;
color: grey;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const ColorCount = styled.div`
color:grey;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Price = styled.p`
margin:0;
font-weight:600;

`
const PriceContainer =styled.div`
display:flex;
gap:3%;
align-items:flex-end;
`
const NewPrice =styled.p`
margin:0;
font-weight:600;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}

`
const OldPrice =styled.p`
margin:0;
color:grey;
opacity:.6;
font-weight:400;
text-decoration:line-through;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}

`
const SalePercentage =styled.p`
margin:0;
color:green;
font-size:1rem;
font-weight:400;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`

export default function ProductCard({thumbnail, price, name,quantity,type,sale,colors,pk,min_width}){
    const getPrice = ()=>{
        if (sale){
            return(
                <PriceContainer>
                    <NewPrice>
                        {sale.price_after_sale}$
                    </NewPrice>
                    <OldPrice>
                        {price}$
                    </OldPrice>
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
            <Image src={thumbnail}/>
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