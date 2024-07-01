import SuccessOrErrorPopUp from "../../SuccessOrErrorPopUp/success-or-error-pop-up";
import AddToCartButton from "../../AddToCartButton/add-to-cart-button";
import { useSendRequest } from "../../../hooks/use-fetch-data";
import useUserState from "../../../hooks/use-user-state";
import Loading from "../../Loading/loading";
import styled from "styled-components";

const BuyNowButton = styled.button`
width:100%;
height:15%;
height:45px;
background:#00C2FF;
display:flex;
justify-content:center;
align-items:center;
color: Black;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
border:none;
cursor:pointer;
border-radius:6px;

&:disabled{
    background:grey;
}
`

export default function ActionButton({sizePicked,colorPicked,showMenu,product,actionLoading,setActionLoading}){
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    async function handleBuyProduct(){
        setActionLoading(true)
        const uri = '/checkout/products';
        const products = [{id:product.id,size:sizePicked,color:colorPicked,quantity:1}];
        const init = {method:"post", body:{products}};

        let {request,response} = await sendRequest(uri, init);

        if (request?.status == 201){
            let form_url = response?.data?.form_url;
            window.location.href = form_url; //navigate to stripe's checkout form 
        }

        setActionLoading(false)
    }
        
    const renderSuitableButton = ()=>{
        if (!sizePicked)
        return <BuyNowButton disabled={true}>Pick a Size</BuyNowButton>;

        if (!colorPicked)
        return <BuyNowButton disabled={true}>Pick a Color</BuyNowButton>;

        if (showMenu === "Buy")
        return (
            <>
                <SuccessOrErrorPopUp serverError={serverError} />
                {actionLoading ?
                    <BuyNowButton disabled="true">
                        <Loading style={{transform:"scale(.2)"}}/>
                    </BuyNowButton>:
                    <BuyNowButton onClick={handleBuyProduct}>
                        Buy Now
                    </BuyNowButton>
                }
            </>
        );

        if (showMenu === "Cart")
        return (
            <AddToCartButton 
            background={"#00C2FF"}
            style={{color:"black",height:'45px'}}
            addToCartLoading={actionLoading} 
            setAddToCartLoading={setActionLoading} 
            size={sizePicked} 
            color={colorPicked} 
            product_id={product.id} 
            availableQuantity={product.quantity}/>
        );
    }

    return(<>{renderSuitableButton()}</>)
}