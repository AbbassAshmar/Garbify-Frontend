import styled from "styled-components";
import ReactDOM from "react-dom";
import PopUpShoppingCartItem from "./pop-up-shopping-cart-item";
import { useEffect, useState } from "react";
import { useSendRequest } from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import Loading from "../Loading/loading";
import { useNavigate } from "react-router-dom";
import ProductsSlider from "../ProductsSlider/products-slider";

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
    height:100%;
    z-index:-1;
    top:0;
    left:0;
}
`
const Container = styled.div`
width:50%;
background:white;
padding :min(7vh,40px);
min-width:550px;
display:flex;
flex-direction:column;
gap:min(7vh,40px);
@media screen and (max-width:600px){
    width:100%;
    height:100vh;
    min-width:0;
    overflow-y:scroll;
}
`

const Content = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:min(7vh,40px);
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
width:100%;
gap:15px;

@media screen and (max-width:600px){
    flex-direction:column;
}
`

const ViewBagButton = styled.button`
padding: 1rem 1rem;
background:white;
border:1px solid grey;
outline : none;
border-radius: 25px;
color:black;
font-weight:600;
width:100%;
cursor:pointer;
font-size:clamp(.7rem,2vw,.9rem);
height:7.5vh;
transition:border .3s;
&:hover{
    border:1px solid black;
}

`

const CheckoutButton = styled.button`
padding: 1rem 1rem;
background: #00C2FF;
border:none;
outline : none;
border-radius: 25px;
color:white;
font-weight:600;
width:100%;
cursor:pointer;
font-size:clamp(.7rem,2vw,.9rem);
display:flex;
align-items:center;
justify-content:center;
height:7.5vh;
transition:background .3s;
&:hover{
    background:#009BCC;
}
`
const SliderContainer = styled.div`
width:100%;
@media screen and (min-width:600px){
    display:none;
}
`

export default function PopUpShoppingCart({cartData,setShow}){
    const userContext= useUserState();
    const [amountSubtotal, setAmountSubtotal] = useState(cartData?.shopping_cart_item?.shopping_cart?.amount_subtotal||1)
    const {sendRequest,serverError} = useSendRequest(userContext);
    const [checkoutButtonLoading,setCheckoutButtonLoading]= useState(false)
    const navigate = useNavigate();

    function handleCloseButtonClick (e){
        setShow(false);
    }

    function handleViewBagButtonClick(e){
        navigate('/shopping_cart')
    }
    
    async function handleCheckoutButtonClick(e){
        setCheckoutButtonLoading(true)
        let uri = '/api/checkout/shopping_cart'
        let init = {method:"POST"};
        let {request,response} = await sendRequest(uri,init)

        if (request?.status == 201){
            window.location.href = response.data.form_url;
        }
        setCheckoutButtonLoading(false)
    }

    return (
        <>
            {   
                ReactDOM.createPortal(
                    <DropDownCart>
                        <Container>
                            <Content>
                                <Header>
                                    <AddedToCart>Item added to your cart</AddedToCart> 
                                    <CloseButton onClick={handleCloseButtonClick} className="fa-solid fa-xmark"/>
                                </Header>
                                <ItemsContainer>
                                    <PopUpShoppingCartItem cartData={cartData} setAmountSubtotal={setAmountSubtotal} />
                                </ItemsContainer>
                                <SummaryContainer>
                                    <SubTotal>Subtotal ({cartData?.shopping_cart_item?.shopping_cart?.count_items} items)</SubTotal>
                                    <SubTotal>{amountSubtotal}$</SubTotal>
                                </SummaryContainer>
                                <ButtonsContainer>
                                    <ViewBagButton onClick={handleViewBagButtonClick}>
                                        View Bag ({cartData?.shopping_cart_item?.shopping_cart?.count_items})
                                    </ViewBagButton>
                                    <CheckoutButton onClick={handleCheckoutButtonClick}>
                                      {checkoutButtonLoading ? <Loading style={{transform:"scale(.2)"}}/> :"Check out"}
                                    </CheckoutButton>                                                                
                                </ButtonsContainer>
                            </Content>
                            <SliderContainer>
                                <ProductsSlider title={'You would also like'} url={'/api/favorites?limit=10'} />
                            </SliderContainer>
                        </Container>
                    </DropDownCart>,
                    document.body
                )
            }
        </>
    )
}