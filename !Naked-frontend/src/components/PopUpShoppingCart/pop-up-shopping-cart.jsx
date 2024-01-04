import styled from "styled-components";
import ReactDOM from "react-dom";
import PopUpShoppingCartItem from "./pop-up-shopping-cart-item";
import { useState } from "react";

const DropDownCart = styled.div`
height:100vh;
width:100%;
display:flex;
align-items:center;
justify-content:center;
position:fixed;
top:0;
left:0;
z-index:100;

&:before{
    content:"";
    position:absolute;
    background:black;
    opacity:.7;
    width:100%;
    height:100vh;
    z-index:-1;
    top:0;
    left:0;
}
`
const Container = styled.div`
width:50%;
// height:45%;
background:white;
padding :2.5rem;
`
const Content = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:2.5rem;
`
const Header = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const AddedToCart = styled.p`
font-weight:600;
`
const CloseButton = styled.i`

`
const ItemsContainer = styled.div`

`
const SummaryContainer = styled.div`
display:flex;
justify-content:space-between;
`
const SubTotal = styled.p`
font-weight:600;
`
const ButtonsContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`

const ViewBagButton = styled.button`
padding: 1rem 1rem;
background:white;
border:1px solid black;
outline : none;
border-radius: 25px;
color:black;
font-weight:600;
width:48%;
cursor:pointer;
font-size:clamp(.7rem,2vw,.9rem);
`

const CheckoutButton = styled.button`
padding: 1rem 1rem;
background: #00C2FF;
border:none;
outline : none;
border-radius: 25px;
color:white;
font-weight:600;
width:48%;
cursor:pointer;
font-size:clamp(.7rem,2vw,.9rem);
`

export default function PopUpShoppingCart({cartData}){
    const [amountSubtotal, setAmountSubtotal] = useState(cartData?.shopping_cart_item?.shopping_cart?.amount_subtotal||1)

    return (
        <>
            {   
                ReactDOM.createPortal(
                    <DropDownCart>
                        <Container>
                            <Content>
                                <Header>
                                    <AddedToCart>Item added to your cart</AddedToCart> 
                                    <CloseButton className="fa-solid fa-xmark"/>
                                </Header>
                                <ItemsContainer>
                                    <PopUpShoppingCartItem cartData={cartData} setAmountSubtotal={setAmountSubtotal} />
                                </ItemsContainer>
                                <SummaryContainer>
                                    <SubTotal>Subtotal ({cartData?.shopping_cart_item?.shopping_cart?.count_items} items)</SubTotal>
                                    <SubTotal>{amountSubtotal}$</SubTotal>
                                </SummaryContainer>
                                <ButtonsContainer>
                                    <ViewBagButton>View Bag ({cartData?.shopping_cart_item?.shopping_cart?.count_items})</ViewBagButton>
                                    <CheckoutButton>Checkout</CheckoutButton>
                                </ButtonsContainer>
                            </Content>
                        </Container>
                    </DropDownCart>,
                    document.body
                )
            }
        </>
    )
}