import styled from "styled-components";
import {Link} from "react-router-dom";
import RatingStars from "../RatingStars/rating-stars";
import {useState } from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useSendRequest} from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up";
import { AvailableColors, AvailableSizes } from "../../pages/Product/Components/details-container";
import Loading from "../Loading/loading";
import AddToCartButton from "../AddToCartButton/add-to-cart-button";

const Container = styled.div`
min-width:${({$min_width})=>{return ($min_width?$min_width:"auto")}};
overflow:hidden;
height:auto;
border-radius:6px;
min-height:200px;
`
const LinkContainer = styled(Link)`
flex:4;
aspect-ratio:1/1.04;
`
const ImageContainer = styled.div`
flex:4;
aspect-ratio:1/1.04;
position:relative;
`
const HighLight =styled.div`
background:#00C2FF;
position:absolute;
padding:.2rem .4rem;
`
const Image  = styled.img`
object-fit: cover; 
width: 100%;
height: 100%;
margin:0;
`
const Details = styled.div`
margin:0;
display:flex;
flex-direction:column;
align-items:center;
gap:.5rem;
width:100%;
padding-top:.5rem;
background:white;
position:relative;
`
const RatingContainer = styled.div`
display:flex;
line-height:0;
gap:10px;
justify-content:center;
align-items:center;
`
const Rating = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem)
`
const ReviewsCount = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
color:grey;
`
const Name =styled(Link)`
text-decoration:none;
color:black;
margin:0;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const Category = styled.p`
margin:0;
color: grey;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

const Price = styled.div`
margin:0;
font-weight:600;
`
const PriceContainer =styled.div`
display:flex;
gap:.5rem;
align-items:flex-end;
flex-wrap:wrap;
width:100%;
`
const NewPrice =styled.p`
margin:0;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const OldPrice =styled.p`
margin:0;
color:grey;
opacity:.6;
font-weight:600;
text-decoration:line-through;
font-size:clamp(.6rem,2vw,.9rem);
`
const SalePercentage =styled.p`
margin:0;
color:black;
font-size:clamp(.6rem,2vw,.9rem);
font-weight:600;
`

const PriceButtonsContainer = styled.div`
display:flex;
width:100%;
justify-content:space-between;
align-items:center;
`

const ButtonsContainer = styled.div`
display:flex;
gap:10px;
`
const Icon = styled.i`
font-size:.9rem;
margin-top:2px;
transition:transform .3s;
`
const ActionIconContainer = styled.div`
overflow:hidden;
background:transparent;
display:flex;
align-items:center;
justify-content:center;

`

const ToggleFavoritesButton = styled.button`
width:28px;
height:28px;
padding-top:2px;
background:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
border:1px solid #C0C3C7;
cursor:pointer;

&:hover ${Icon}{
    transform:scale(1.1);
}
`
const HeartIcon = styled(Icon)`
color:black;
`
const ShoppingActionsButton = styled.div`
height:28px;
background:#00C2FF;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
width:${({$hover})=>$hover?"65px":"28px"};
border-radius:30px;
transition:width .3s;
padding:8px;
`
const ActionButtonsContainer = styled.div`
display:flex;
gap:2px;
cursor:pointer;
width:100%;
justify-content:space-between;
align-items:center;
`
const ActionButton = styled.button`
background:transparent;
outline:none;
border:none;
position:relative;
cursor:pointer;
width:25px;
padding:1px;
display:flex;
align-items:center;
justify-content:center;
`

const PopUpText = styled.div`
position:absolute;
top:-30px;
text-wrap:nowrap;
background:#D8DBE0;
padding:2px 6px;
border-radius:20px;
font-weight:600;
font-size:clamp(.65rem,1.8vw,.7rem);
&:before{
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background:#D8DBE0;
    bottom: -3px;
    left: 50%;
    z-index:-1;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

display:none;

${ActionButton}:hover &{
    display:block;
}
`

const SizesColorsMenu = styled.div`
width:100%;
height:82%;
display:flex;
flex-direction:column;
gap:1.7rem;
position:absolute;
bottom:0;
left:0;
background:white;
`

const BuyOrCartButton = styled.button`
width:100%;
height:15%;
background:#00C2FF;
display:flex;
justify-content:center;
align-items:center;
color: Black;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
padding: .9rem 0;
border:none;
cursor:pointer;
border-radius:6px;

&:disabled{
    background:grey;
}
`

function ToggleFavoritesComponent(){
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    const [isInFavorites,setIsInFavorites] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    async function handleHeartClick(e){
        setIsLoading(true)
        const uri = "/favorites"
        const init = {method:"POST"};

        let {request , response} = await sendRequest(uri, init)
        if (request?.status == 201){
            setIsInFavorites(true)
        }
        if (request?.status == 200){
            setIsInFavorites(false)
        }

        setIsLoading(false)
    }

    return (
        <>
            <SuccessOrErrorPopUp serverError={serverError} />
            <ToggleFavoritesButton disabled={isLoading||""} onClick={handleHeartClick} >
                {isInFavorites?
                    <HeartIcon tyle={{color:"red"}} className="fa-solid fa-heart"/>:
                    <HeartIcon className="fa-regular fa-heart"/>
                }
            </ToggleFavoritesButton>
        </>
    )
}

export default function ProductCard({product,min_width}){
    const [hover, setHover] = useState(false)
    const [showSizesMenu,setShowSizesMenu] = useState(null);

    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    const [sizePicked,setSizePicked] = useState();
    const [colorPicked,setColorPicked] = useState();

    const [productActionLoading,setProductActionLoading] = useState(false);

    function handleCloseSizesColorsMenu(e){
        if (productActionLoading){
            return null;
        }
        setSizePicked(null);
        setColorPicked(null);
        setShowSizesMenu(false);
    }

    function handleMouseEnterActionsButtons (){
        setHover(true)
    }

    function handleMouseLeaveActionsButtons(){
        setHover(false)
    }

    //when buy now icon is clicked
    function handleBuyNowClick(e){
        if(!productActionLoading)
        setShowSizesMenu("Buy")
    }

    //when add to cart icon is clicked
    function handleAddToCartClick(e){
        if(!productActionLoading)
        setShowSizesMenu("Cart")
    }

    async function handleAddProductToCart(){
        setProductActionLoading(true)
        

        setProductActionLoading(false)
    }

    async function handleBuyProduct(){
        setProductActionLoading(true)
        const uri = '/checkout/products';
        const products = [{id:product.id,size:sizePicked,color:colorPicked,quantity:1}];
        const init = {method:"post", body:{products}};

        let {request,response} = await sendRequest(uri, init);

        if (request?.status == 201){
            let form_url = response?.data?.form_url;
            window.location.href = form_url; //navigate to stripe's checkout form 
        }

        setProductActionLoading(false)
    }

    const getPrice = ()=>{
        if (product?.sale){
            return(
                <PriceContainer>
                    <div style={{display:"flex", gap:".5rem",alignItems:'flex-end'}}>
                        <NewPrice>{product?.sale.price_after_sale}$</NewPrice>
                        <OldPrice>{product?.price}$</OldPrice>
                    </div>
                </PriceContainer>
            )
        }
        return `${product?.price} $`
    }

    const renderBuyOrCartButton=()=>{
        if (!sizePicked)
        return <BuyOrCartButton disabled='true'>Pick a Size</BuyOrCartButton>

        if (!colorPicked)
        return <BuyOrCartButton disabled='true'>Pick a Color</BuyOrCartButton>

        if (showSizesMenu==="Buy")
        return (
            <>
            <SuccessOrErrorPopUp serverError={serverError} />
            {productActionLoading ?
                <BuyOrCartButton disabled="true" onClick={handleBuyProduct}>
                    <Loading style={{transform:"scale(.2)"}}/>
                </BuyOrCartButton>:
                <BuyOrCartButton onClick={handleBuyProduct}>
                    Buy Now
                </BuyOrCartButton>
            }
            </>
        )

        if(showSizesMenu==="Cart")
        return (
            <AddToCartButton 
            background={"#00C2FF"}
            style={{color:"black",height:'15%'}}
            addToCartLoading={productActionLoading} 
            setAddToCartLoading={setProductActionLoading} 
            size={sizePicked} 
            color={colorPicked} 
            product_id={product.id} 
            availableQuantity={product.quantity}/>
        )
    }

    return(
        <Container onMouseLeave={handleCloseSizesColorsMenu} $min_width={min_width}>
            <div style={{position:'relative'}}>
                <LinkContainer to={`/product/${product?.name.replaceAll(" ",'-')}/${product?.id}`}>
                    <ImageContainer>
                        {product?.sale &&
                            <HighLight>
                                    <SalePercentage>
                                    {product?.sale.percentage} % Off
                                </SalePercentage>
                            </HighLight>
                        }
                        <Image src={product?.thumbnail}/>
                    </ImageContainer>
                </LinkContainer>
                <AnimatePresence>
                    {showSizesMenu && 
                        <SizesColorsMenu 
                        as={motion.div} 
                        transition={{type: "Tween", stiffness: 100 }}
                        initial={{y:100,opacity:0}} 
                        animate={{y:0,opacity:1}} 
                        exit={{y:100,opacity:0}} >
                            <div style={{padding:"1rem",display:'flex',flexDirection:"column",gap:"1.7rem"}}>
                                <AvailableSizes 
                                sizePicked={sizePicked} 
                                setSizePicked={setSizePicked} 
                                product={product}/>
                                <AvailableColors 
                                colorPicked={colorPicked} 
                                setColorPicked={setColorPicked} 
                                product={product}/>
                            </div>
                            {renderBuyOrCartButton()}
                        </SizesColorsMenu>
                    }
                </AnimatePresence>
            </div>
            
            <Details>
                <RatingContainer>
                    <Rating>{product?.reviews_summary.average_ratings}</Rating>
                    <RatingStars rating={product?.reviews_summary.average_ratings} />
                    <ReviewsCount>({product?.reviews_summary.reviews_count} reviews)</ReviewsCount>
                </RatingContainer>
                <Name>{product?.name}</Name>
                <Category>{product?.type}</Category>
                <PriceButtonsContainer>
                    <Price>{getPrice()}</Price>
                    <ButtonsContainer>
                        <ShoppingActionsButton 
                        $hover={hover} 
                        onMouseEnter={handleMouseEnterActionsButtons} 
                        onMouseLeave={handleMouseLeaveActionsButtons}>
                            {!hover && <Icon className="fa-solid fa-bag-shopping"/>}
                            {
                                hover && 
                                <ActionButtonsContainer>
                                    <ActionButton
                                    onClick={handleBuyNowClick} 
                                    as={motion.div}
                                    initial={{ zIndex:'-1'}}
                                    animate={{zIndex:'0'}}
                                    transition={{delay:.14}}>
                                        <ActionIconContainer 
                                        as={motion.div}
                                        initial={{width: 0}}
                                        animate={{ width: "100%" }}
                                        transition={{duration:.03,delay:.14}}>
                                            <Icon className="fa-regular fa-credit-card"/>
                                        </ActionIconContainer>
                                        <PopUpText style={{right:"-20px"}}>Buy now</PopUpText>
                                    </ActionButton>
                                    <ActionButton 
                                    as={motion.div}
                                    initial={{ zIndex:'-1'}}
                                    animate={{zIndex:'0'}}
                                    onClick={handleAddToCartClick}>
                                        <ActionIconContainer  
                                        as={motion.div}
                                        initial={{ width: 0}}
                                        animate={{width: "100%" }}
                                        transition={{duration:.03,delay:.14}}>
                                            <Icon className="fa-solid fa-cart-shopping"/>
                                        </ActionIconContainer>
                                        <PopUpText style={{right:"-27px"}}>Add to cart</PopUpText>
                                    </ActionButton>
                                </ActionButtonsContainer>
                            } 
                        </ShoppingActionsButton>
                        <ToggleFavoritesComponent />
                    </ButtonsContainer>
                </PriceButtonsContainer>
            </Details>
        </Container>
    )
}