import { useContext } from "react"
import styled from "styled-components"
import { userStateContext } from "../../Contexts/user-state"
import useUserState from "../../hooks/use-user-state"
import ReactDOM from 'react-dom';

const DropDownCart = styled.div`
height:100vh;
width:100%;
display:flex;
align-items:center;
justify-content:center;
position:fixed;
top:0;
left:0;
z-index:2000;

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
const Content = styled.div`
width:300px;
height:500px;
background:white;
`
const Button = styled.button`
width : 100%;
height:8.4vh;
max-height: 50px;
background:black;
color:white;
border:none;
outline:none;
margin : 0 0 .8rem 0;

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

export default function AddToCartButton(){
    const {token ,user} = useUserState();

    const p = {
        product_id:3,
        size : 'xl',
        color : 'green',
        quantity : 32
    };

    function addToLocalStorageCart(product){
        cart = localStorage.getItem('shopping_cart');
        if (cart){
            cart.push(product);
        }else{ 
            cart = [product];
        }
        localStorage.setItem('shopping_cart' , cart)
    }

    async function handleAddToCartClick(e){
        if (token){
            // send request to add to cart
            let uri = '/api/users/user/shopping_carts';
            const {response,request} = await sendRequest(uri,{method:"POST",body:formData},token);

        }else{
            // add cart to local storage

        }
    }

    return (
        <div>
            
            <Button onClick={handleAddToCartClick}>Add to Cart</Button>
            
            {
                ReactDOM.createPortal(
                    <DropDownCart>
                        <Content>
                            <p>jdfajsfio</p>
                        </Content>
                    </DropDownCart>,
                    document.body
                )
            }

        </div>
    )
}