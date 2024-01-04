import styled from "styled-components"
import Hoody2 from "../../assets/Hoody2.jpg"
import { useEffect, useState } from "react"
import { useSendRequest } from "../../hooks/use-fetch-data"
import useUserState from "../../hooks/use-user-state"
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up"

const Container = styled.div`
width: 100%;
display:flex;
align-items:flex-start;
justify-content:space-between;
gap:1rem;
`
const ProductImage = styled.img`
flex:1.5;
min-width:0%;
`
const ProductDetails = styled.div`
flex:4;
display:flex;
flex-direction:column;
gap:10px;
`
const Name = styled.p`
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const Color = styled.div`
color:grey;
font-weight:600;
display:flex;
gap:6px;
font-size:clamp(.7rem,2vw,.9rem);
`
const Size = styled.div`
color:grey;
font-weight:600;
display:flex;
gap:6px;
font-size:clamp(.7rem,2vw,.9rem);

`
const PriceQuantityContainer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
`

const Price = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`
const Quantity = styled.div`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
border-radius:20px;
border:1px solid black;
display:flex;
justify-content:space-between;
padding:0.1rem 10px;
align-items:center;
`
const PlusSign = styled.button`
cursor:pointer;
width:100%;
padding:0 2px;
border:none;
outline:none;
background:none;
font-weight:inherit;
font-size:inherit;
`
const CurrentQuantity = styled.div`
padding : 0 23px;
`
const MinusSign = styled.button`
cursor:pointer;
width:100%;
padding:0 2px;
border:none;
outline:none;
background:none;
font-weight:inherit;
font-size:inherit;
`




export default function PopUpShoppingCartItem({cartData,setAmountSubtotal}){
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    const [currentQuantity , setCurrentQuantity] = useState(cartData?.shopping_cart_item?.quantity || 1);
    const [price,setPrice] = useState(cartData?.shopping_cart_item?.amount_subtotal || 1);

    const [popUpSettings,setPopUpSettings] = useState({show:false,status:"",message:""});
    const [disableQuantityButtons,setDisableQuantityButtons] = useState(false);

    const updated_cart  = {
        shopping_cart_item : { 
            quantity : 2 ,
            new_price : 2343,
            shopping_cart:{
                amount_subtotal:23432,
                count_items : 43,
            },
        },
    }

    async function handleQuantityUpdate(new_quantity){
        setDisableQuantityButtons(true)
        let init = {method:"PATCH", body:{quantity:new_quantity}};
        let url = "/users/user/shopping_carts/items"
        const {request, response}  = await sendRequest(url,init);

        if (request?.status === 400){
            setPopUpSettings({show:true,status:"Error",message:response.error.message})
        }

        if (request?.status === 200) {
            setCurrentQuantity(response.data.shopping_cart_item.quantity)
            setPrice(response.data.shopping_cart_item.amount_subtotal)
            setAmountSubtotal(response.data.shopping_cart_item.shopping_cart.amount_subtotal)
        }

        setDisableQuantityButtons(false)
    }

    function handleDecrementQuantity (e){
        let new_quantity = cartData.shopping_cart_item.quantity-1;
        handleQuantityUpdate(new_quantity);
    }

    function handleIncrementQuantity (e){
        let new_quantity = cartData.shopping_cart_item.quantity+1;
        handleQuantityUpdate(new_quantity);
    }

    let renderMinusSign = ()=>{
        let isDisabled= currentQuantity <=0 || disableQuantityButtons;
        return <MinusSign disabled={isDisabled || ""} onClick={handleDecrementQuantity}>-</MinusSign>
    }

    let renderPlusSign = ()=>{
        let isDisabled= cartData.shopping_cart_item.product.quantity <= currentQuantity || disableQuantityButtons;
        return <PlusSign disabled={isDisabled || ''} onClick={handleIncrementQuantity}>+</PlusSign>
    }

    return (
        <Container>
            <SuccessOrErrorPopUp serverError={serverError} settings={popUpSettings} setSettings={setPopUpSettings}/>
            <ProductImage src={cartData.shopping_cart_item.product.thumbnail}/> 
            <ProductDetails>
                <Name>{cartData.shopping_cart_item.product.name}</Name>
                <Color><p style={{color:'black'}}>Color </p> {cartData.shopping_cart_item.color}</Color>
                <Size><p style={{color:'black'}}>Size </p> {cartData.shopping_cart_item.size} </Size>
                <PriceQuantityContainer>
                    <Price>{price}$</Price>
                    <Quantity>
                        {renderMinusSign()}
                        <CurrentQuantity>{currentQuantity}</CurrentQuantity>
                        {renderPlusSign()}
                    </Quantity>
                </PriceQuantityContainer>
            </ProductDetails>
        </Container>
    )
}