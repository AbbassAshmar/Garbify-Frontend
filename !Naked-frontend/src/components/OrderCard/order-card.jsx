import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom"

// Main title :clamp(.9rem,3vw,1.5rem);

// main title (shipping state) : 1.3rem --> 1.1rem (800px)
// name - text in header: 1rem -->.8rem (800px)
// buttons and subtext : .9rem -->.7rem (800px)

// max-widths : 1 ->800px , 2->600px

const Container = styled.div`
// box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
border-radius:4px;
border:1px solid  rgba(0,0,0,.3);
background :#F1F4F9;
padding:20px;
width:100%;
display:flex;
flex-direction:column;
`
const Header = styled.div`
display:flex;
flex-direction:column;
gap:20px;
`

const DetailsContainer = styled.div`
display:flex;
justify-content:space-between;
`
const OrderSummary = styled.div`
display:flex;
gap:max(10%,20px);
flex:3;
`

const StatusIdContainer = styled.div`
display:flex;
gap:max(10%,20px);
flex:1.5;
justify-content:end;
`
const ShippingState = styled.p`
margin:0;
font-size:1.3rem;
font-weight:600;
@media screen and (max-width:800px){
    font-size:1.1rem;
}
`
const Text = styled.p`
margin:0;
color:black;
font-size:1rem;
font-weight:600;
@media screen and (max-width:800px){
    font-size:.8rem;
}

`

const ProductsContainer = styled.div`
width:100%;
padding:25px;
display:flex;
flex-direction:column;
gap:30px;


`
const Product = styled.div`
box-shadow: 0 0 4px rgba(0, 0, 0,.3);
background:white;
padding:15px;
display:flex;
gap:20px;

@media screen and (max-width:600px){
    flex-direction:column;
    align-items:center;
    text-align:center;
}
`
const ThumbnailContainer = styled.div`
flex:1;
@media screen and (max-width:800px){
    flex:1.4;
}
`
const Thumbnail = styled.img`
width:100%;
@media screen and (max-width:600px){
    width:100%;
}
`
const NameContainer = styled.div`
flex:2;
display:flex;
flex-direction:column;
justify-content:flex-start;
gap:15px;
@media screen and (max-width:600px){
    width:100%;
}
`
const Name = styled.p`
margin:0;
font-size:1rem;
font-weight:600;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const ReturnTimeText = styled.p`
margin:0;
font-size:.9rem;
font-weight:600;
opacity:.7;
@media screen and (max-width:800px){
    font-size:.7rem;
}
`
const ButtonsContianer = styled.div`
width:25%;
flex:1;
display:flex;
flex-direction:column;
gap:10px;
@media screen and (max-width:600px){
    width:100%;
}

`
const Button = styled.button`
box-shadow: 0 0 3px rgba(0, 0, 0,.4);
background:#F1F4F9;
display:flex;
align-items:center;
justify-content:center;
width:100%;
outline:none;
border:none;
border-radius:2px;
padding: .2rem 0;
font-size:.9rem;
font-weight:600;
cursor:pointer;
@media screen and (max-width:800px){
    font-size:.7rem;
}
&:hover{
    opacity:.8;
}
`

const BuyViewButtonsContainer = styled.div`
display:flex;
gap:9px;
`
const BuyAgainButton = styled(Button)`
background:#00C2FF;
width:100%;
max-width:180px;
@media screen and (max-width:600px){
    max-width:100%;
}
`

const ViewProductButton  = styled(BuyAgainButton)`
background:white;
`

const Footer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const CancelOrderButton  = styled(Button)`
width:max(20%, 100px);
background:red;
`
const ArchiveOrderButton = styled(CancelOrderButton)`
background:rgb(0, 255, 0);
`
const OrderDetailsLink = styled(Link)`
font-size:.9rem;
font-weight:600;
cursor:pointer;
@media screen and (max-width:800px){
    font-size:.7rem;
}
`
export default function OrderCard(props){
    const navigate = useNavigate();
    function handleWriteAReviewClick(id){
        navigate("/review/"+id);
    }
    return(
        <Container>
            <Header>
                <DetailsContainer>
                    <OrderSummary>
                        <Text>ordered at : <br/>{props.order.created_at}</Text>
                        <Text>total cost : <br/>${props.order.total_cost}</Text>
                        <Text>ship to : <br/>{props.order.recipiant_name}</Text>
                    </OrderSummary>
                    <StatusIdContainer>
                        <Text>order status : <br/>{props.order.status}</Text>
                        <Text>order id : <br/>#{props.order.id}</Text>
                    </StatusIdContainer>
                </DetailsContainer>
                <ShippingState>
                    {props.order.shipping_state}
                </ShippingState>
            </Header>

            <ProductsContainer>
                {
                    props.order.products.map((product)=>{
                        return(
                            <Product>
                                <ThumbnailContainer>
                                <Thumbnail src={product.thumbnail} />
                                </ThumbnailContainer>
                                <NameContainer>
                                    <Name>
                                        {product.name} (x{product.ordered_quantity})
                                    </Name>
                                    <ReturnTimeText>
                                        {product.return_cancellation_info}
                                    </ReturnTimeText>
                                    <BuyViewButtonsContainer>
                                        <BuyAgainButton>
                                            <i style={{color:"black",margin:"1px 3px 0 0",}} className="fa-solid fa-rotate"/>
                                            buy again
                                        </BuyAgainButton>
                                        <ViewProductButton>view product</ViewProductButton>
                                    </BuyViewButtonsContainer>
                                </NameContainer>
                                <ButtonsContianer>
                                    <Button>Add to favorites</Button>
                                    {
                                        props.order.status === "delivered" && <Button onClick={(e)=>handleWriteAReviewClick(product.id)}>write a review</Button>
                                    }
                                    {
                                        props.order.status == "delivered" && <Button>return product</Button>
                                    }
                                    {
                                        props.order.status == "paid" && <Button>remove product</Button>
                                    }
                                    {
                                        props.order.status == "paid" && <Button>edit shipping address</Button>
                                    }
                                    
                                </ButtonsContianer>
                            </Product>
                        )})
                }
            </ProductsContainer>

            <Footer>
                {
                    props.order.status==="paid" && <CancelOrderButton>cancel order</CancelOrderButton>
                }
                {
                    props.order.status!="paid" && <ArchiveOrderButton>Archive order</ArchiveOrderButton>
                }
                <OrderDetailsLink>
                    order details <i class="fa-solid fa-arrow-right"/>
                </OrderDetailsLink>
            </Footer>

        </Container>
    )
}

