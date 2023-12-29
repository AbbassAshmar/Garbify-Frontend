import {useState } from "react"
import styled from "styled-components"
import useUserState from "../../hooks/use-user-state"
import ReactDOM from 'react-dom';
import Loading from "../Loading/loading";
import PopUpShoppingCart from "../PopUpShoppingCart/pop-up-shopping-cart";
import {useSendRequest } from "../../hooks/use-fetch-data";

const Button = styled.button`
width : 100%;
height:8.4vh;
max-height: 50px;
background:${({loading})=> loading?'grey':'black'};
color:white;
border:none;
outline:none;
margin : 0 0 .4rem 0;
display:flex;
align-items:center;
justify-content:center;

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

export default function AddToCartButton({product, color,size,quantity}){
    const userContext = useUserState();
    const {sendRequest, isServerError} = useSendRequest(userContext);

    const [buttonLoading,setButtonLoading] = useState(false);
    const [showPopUpShoppingCart, setShowPopUpShoppingCart] = useState(false);


    // function cartItemEquals(item_1 , item_2){
    //     let keys = Object.keys(obj);
    //     for (let key of keys){
    //         if (key === 'quantity') continue;
    //         if (obj[key] != obj2[key] ) return false;
    //     }
    //     return true;
    // }
    
    // function addToLocalStorageCart(product){
    //     cart = localStorage.getItem('shopping_cart');
    //     if (cart){
    //         for (let item of cart){
    //             if (cartItemEquals(item, product)){
    //                 item.quantity ++
    //                 localStorage.setItem('shopping_cart' , cart)
    //                 return null;
    //             }
    //         }
    //         cart.push(product);
    //     }else{ 
    //         cart = [product];
    //     }
    //     localStorage.setItem('shopping_cart' , cart)
    //     return null;
    // }

    async function handleAddToCartClick(e){
        setButtonLoading(true)

        let payload = {
            product_id : product.id,
            color,
            size,
            quantity
        }   

        try {
            if (token){
                // send request to add to cart
                let uri = '/api/users/user/shopping_carts/items';
                const {response,request} = await sendRequest(uri,{method:"POST",body:payload},token);
              
                if(request.status == 201){
                    setShowPopUpShoppingCart(true)
                }
            }else{
                let uri = '/api/users/anonymous/shopping_carts/items';
                const {response,request} = await sendRequest(uri,{method:"POST",body:payload},token);
                if(request.status == 201){
                    setShowPopUpShoppingCart(true)
                }
                setShowPopUpShoppingCart(true)
            }

        }catch(error){

        }finally{
            setButtonLoading(false)
        }
    }

    return (
        <div>
            <Button loading={buttonLoading} onClick={handleAddToCartClick}>
                { buttonLoading ?<Loading style={{transform:"scale(.2)"}}/> : 'Add to Cart' }
            </Button>
            
            {
                showPopUpShoppingCart && 
                <PopUpShoppingCart product={product} quantity={quantity} color={color} size={size}/>
            }
        </div>
    )
}