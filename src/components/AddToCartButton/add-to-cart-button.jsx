import {useState } from "react"
import styled from "styled-components"
import useUserState from "../../hooks/use-user-state"
import ReactDOM from 'react-dom';
import Loading from "../Loading/loading";
import PopUpShoppingCart from "../PopUpShoppingCart/pop-up-shopping-cart";
import {useSendRequest } from "../../hooks/use-fetch-data";
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up";
import Hoody2 from "../../assets/Hoody2.jpg"

const AddToCart = styled.button`
width : 100%;
height:8.4vh;
border-radius:7px;
max-height: 60px;
background:${({$background})=>$background}; 
color:white;
border:none;
outline:none;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);

&:disabled{
    background:grey;
}
`
const OutOfStock = styled.button`
background:#9C9C9C;
width : 100%;
height:8.4vh;
max-height: 50px;
color:white;
border:none;
outline:none;
margin : 0 0 .4rem 0;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
border-radius:7px;
`
const cartData1={
    shopping_cart_item : {
        id:3,
        color:"red",
        size:"M",
        quantity:2,
        amount_subtotal: 2342,

        product:{
            name:"red shoes with black stains",
            id : 4,
            thumbnail : Hoody2,
            price:324,
            quantity:19,
        },

        shopping_cart:{
            amount_subtotal:23432,
            count_items : 43,
        },
    },
}

export default function AddToCartButton({background,style,addToCartLoading,setAddToCartLoading,product_id,color,size,availableQuantity}){
    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const [cartData,setCartData] = useState(cartData1);
    const [showPopUpShoppingCart, setShowPopUpShoppingCart] = useState(false);

    async function handleAddToCartClick(e){
        setAddToCartLoading(true)

        let payload = {
            product_id ,
            color,
            size,
            quantity:1,
        }   

        let uri = userContext.token?'/api/users/user/shopping_carts/items':'/api/users/anonymous/shopping_carts/items' ;
        const {response,request} = await sendRequest(uri,{method:"POST",body:payload});

        if(request?.status == 201){
            setCartData(response)
            setShowPopUpShoppingCart(true)
        }

        setAddToCartLoading(false)
    }
        
    return (
        <>
            <SuccessOrErrorPopUp serverError={serverError} />

            {
                availableQuantity > 0 && 
                <AddToCart $background={background?background:'black'} style={style} disabled={addToCartLoading || ""} onClick={handleAddToCartClick}>
                    {addToCartLoading ?<Loading style={{transform:"scale(.2)"}}/> : 
                    <>Add to Cart &nbsp;<i className="fa-solid fa-cart-shopping"/></>}
                </AddToCart>
            }
            {
                availableQuantity <= 0 && 
                <OutOfStock disabled="true">
                    Out of Stock
                </OutOfStock>
            }
            {
                showPopUpShoppingCart && 
                <PopUpShoppingCart cartData={cartData} setShow={setShowPopUpShoppingCart}/>
            }
        </>
    )
}