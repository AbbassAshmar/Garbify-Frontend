import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom"
import {  useRef, useState } from 'react'
import ConfirmationPopUp from '../ConfirmationPopUp/confirmation-pop-up';

export const Container = styled.div`
box-shadow: 1px 1px 10px #A8AAAE;
border-radius:4px;
background :#F1F4F9;
padding:20px;
width:100%;
display:flex;
flex-direction:column;
gap:20px;
`

export const Header = styled.div`
display:flex;
flex-direction:column;
gap:20px;
`

export const DetailsContainer = styled.div`
display:flex;
justify-content:space-between;
@media screen and (max-width:600px){
    justify-content:start;
    gap:15px;
}
`
export const OrderSummary = styled.div`
display:flex;
gap:max(10%,20px);
flex:3;
@media screen and (max-width:600px){
    flex:none;
}
`

const StatusIdContainer = styled.div`
display:flex;
gap:max(10%,20px);
flex:1.5;
justify-content:end;

@media screen and (max-width:600px){
    flex:none;
}
`
export const ShippingState = styled.p`
margin:0;
font-size: clamp(.8rem , 2.3vw ,1.1rem);
font-weight:600;
`
export const Text = styled.p`
margin:0;
color:black;
font-size: clamp(.7rem,2vw,.9rem);

font-weight:600;
@media screen and (max-width:600px){
    display:none;
}
`

const SummaryValue = styled.span`
color:rgba(100,100,100);
font-size:clamp(.65rem,1.8vw,.8rem);
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
flex:.7;
@media screen and (max-width:800px){
    flex:1.2;
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
font-size: clamp(.7rem,2vw,.9rem);
font-weight:600;
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
padding: .4rem 0;
font-weight:600;
cursor:pointer;
font-size:clamp(.65rem,1.8vw,.8rem);
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
width:max(20%, 160px);
background:red;
@media screen and (max-width:340px){
    width:120px;
}
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


export default function OrderCard({order}){
    const [showCancelConfirmation,setShowCancelConfirmation] = useState(false);
    
    const cancelButtonRef = useRef();
    const navigate = useNavigate();
    function handleWriteAReviewClick(id){
        navigate("/review/"+id);
    }

    function handleCancelOrderButtonClick(e){
        setShowCancelConfirmation(true);
    }

    return(
        <Container>
            <Header>
                <DetailsContainer>
                    <OrderSummary>
                        <Text style={{display:'inline'}}>
                            ordered at : <br/>
                            <SummaryValue>{order.created_at}</SummaryValue>
                        </Text>
                        <Text>
                            total cost : <br/>
                            <SummaryValue>${order.total_cost}</SummaryValue>
                        </Text>
                        <Text>
                            ship to : <br/>
                            <SummaryValue>{order.recipiant_name}</SummaryValue>
                        </Text>
                    </OrderSummary>
                    <StatusIdContainer>
                        <Text style={{display:"inline"}}>
                            order status : <br/>
                            <SummaryValue>{order.status}</SummaryValue>
                        </Text>
                        <Text>
                            order id : <br/>
                            <SummaryValue>#{order.id}</SummaryValue>
                        </Text>
                    </StatusIdContainer>
                </DetailsContainer>
                <ShippingState>
                    {order.shipping_state}
                </ShippingState>
            </Header>

            <ProductsContainer>
                {
                    order.products.map((product)=>{
                        return(
                            <Product key={product.id}>
                                <ThumbnailContainer>
                                    <Thumbnail src={product.thumbnail} />
                                </ThumbnailContainer>
                                <NameContainer>
                                    <Name>{product.name} (x{product.ordered_quantity})</Name>
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
                                    {order.status === "delivered" && <Button onClick={(e)=>handleWriteAReviewClick(product.id)}>write a review</Button>}
                                    {order.status == "delivered" && <Button>return product</Button>}
                                    {order.status == "paid" && <Button>remove product</Button>}
                                    {order.status == "paid" && <Button>edit shipping address</Button>}
                                </ButtonsContianer>
                            </Product>
                        )
                    })
                }
            </ProductsContainer>
            <Footer>
                {
                    order.status==="paid" && 
                    <div>
                        <CancelOrderButton ref={cancelButtonRef} onClick={handleCancelOrderButtonClick}>cancel order</CancelOrderButton>
                        <ConfirmationPopUp 
                        uri = {"/api/orders/"+order.id}
                        show={showCancelConfirmation} 
                        setShow={setShowCancelConfirmation} 
                        cancelButtonRef={cancelButtonRef}
                        subTitle={'Are You sure You want to cancel this order ?'}
                        title={'Cancel Order'}
                        cancelAction={'keep Order'}
                        confirmAction={'Cancel Order'}/>
                    </div>
                }
                {order.status!="paid" && <ArchiveOrderButton>Archive order</ArchiveOrderButton>}
                <OrderDetailsLink>
                    order details <i className="fa-solid fa-arrow-right"/>
                </OrderDetailsLink>
            </Footer>

        </Container>
    )
}

