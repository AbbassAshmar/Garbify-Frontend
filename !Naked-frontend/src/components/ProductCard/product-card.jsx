import styled from "styled-components"
import {Link} from "react-router-dom"

const Container = styled.div`
// min-width:max(300px ,35%);
min-width:${({min_width})=>{return (min_width?min_width:"auto")}};
overflow:hidden;
// border:1px solid rgba(189, 189, 189,.3);
box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
`
const LinkContainer = styled(Link)`
width:100%;
display:flex;
flex-direction:column;
gap:.4rem;
text-decoration:none;
color:black;

`
const Image  = styled.img`
width:100%;
margin:0;
`
const Details = styled.div`
margin:0;
display:flex;
flex-direction:column;
gap:.3rem;
padding-left:.4rem;
margin-bottom:.4rem;
`
const Name =styled.h2`
margin:0;
font-size:1.4em;
font-weight:600;

`
const Category = styled.p`
margin:0;
color: grey;
`
const ColorCount = styled.div`
color:grey;
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
`
const OldPrice =styled.p`
margin:0;
color:grey;
opacity:.6;
font-weight:400;
text-decoration:line-through;
`
const SalePercentage =styled.p`
margin:0;
color:green;
font-size:1em;
font-weight:400;
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