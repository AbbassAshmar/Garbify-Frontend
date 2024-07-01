import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom"
import { Container,Header,DetailsContainer,OrderSummary,Text,ShippingState} from '../OrderCard/order-card'
import { useEffect } from 'react'
// Main title :clamp(.9rem,3vw,1.5rem);

// main title (shipping state) : 1.3rem --> 1.1rem (800px)
// name - text in header: 1rem -->.8rem (800px)
// buttons and subtext : .9rem -->.7rem (800px)

// max-widths : 1 ->800px , 2->600px

const StatusIdContainer = styled.div`
display:flex;
gap:max(10%,20px);
flex:1.5;
justify-content:end;

@media screen and (max-width:600px){
    flex:none;
}
`



const ProductsContainer = styled.div`
width:100%;
padding: 0 20px;
display:flex;
flex-direction:column;
gap:20px;
@media screen and (max-width:800px){
    padding:0;
}
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

export default function CanceledOrderCard(props){

    
    return(
        <Container>
            <Header>
                <DetailsContainer>
                    <OrderSummary>
                    <Text style={{display:'inline'}}>
                            ordered at : <br/>
                            <span style={{color:"rgba(100,100,100)",fontSize:"clamp(.65rem,1.8vw,.8rem);"}}>{props.order.created_at}</span>
                        </Text>
                        <Text>
                            total cost : <br/>
                            <span style={{color:"rgba(100,100,100)",fontSize:"clamp(.65rem,1.8vw,.8rem);"}}>${props.order.total_cost}</span>
                        </Text>
                        <Text>
                            ship to : <br/>
                            <span style={{color:"rgba(100,100,100)",fontSize:"clamp(.65rem,1.8vw,.8rem);"}}>{props.order.recipiant_name}</span>
                        </Text>
                    </OrderSummary>
                    <StatusIdContainer>
                    <Text style={{display:"inline"}}>
                            order status : <br/>
                            <span style={{color:"rgba(100,100,100)",fontSize:"clamp(.65rem,1.8vw,.8rem);"}}>canceled</span>
                        </Text>
                        <Text>
                            order id : <br/>
                            <span style={{color:"rgba(100,100,100)",fontSize:"clamp(.65rem,1.8vw,.8rem);"}}>#{props.order.id}</span>
                        </Text>
                    </StatusIdContainer>
                </DetailsContainer>
                <ShippingState>
                    canceled at 23-3-2033
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
                                            <i style={{color:"black",margin:"1px 3px 0 0",}}  class="fa-solid fa-cart-shopping"></i>
                                            Add to bag
                                        </BuyAgainButton>
                                        <ViewProductButton>view product</ViewProductButton>
                                    </BuyViewButtonsContainer>
                                </NameContainer>
                                <ButtonsContianer>
                                    <Button>Add to favorites</Button>
                                </ButtonsContianer>
                            </Product>
                        )})
                }
            </ProductsContainer>

        </Container>
    )
}

