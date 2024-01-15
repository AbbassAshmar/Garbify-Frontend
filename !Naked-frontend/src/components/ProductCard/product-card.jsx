import styled from "styled-components";
import {Link} from "react-router-dom";
import RatingStars from "../RatingStars/rating-stars";
import {useState } from "react";
import {useSendRequest} from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up";
import OverlayColorsSizesMenu from "./Components/overlay-colors-sizes-menu";
import ShoppingButtons from "./Components/shopping-buttons";
import PopUpColorsSizesMenu from "./Components/pop-up-colors-sizes-menu";

const Container = styled.div`
min-width:${({$min_width})=>{return ($min_width?$min_width:"auto")}};
// overflow:hidden;
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
gap:10px;
justify-content:center;
align-items:center;
`
const Rating = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem)
`
const ReviewsCount = styled.div`
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
position:relative;
`
export const Icon = styled.i`
font-size:clamp(.7rem,2vw,.9rem);
transition:transform .3s;

@media screen and (max-width:800px){
    font-size:clamp(.65rem,1.8vw,.8rem);
}
`


const ToggleFavoritesButton = styled.button`
outline:none;
position:relative;
width:25px;
height:25px;
padding:1px;
display:flex;
align-items:center;
justify-content:center;
background:white;
border:1px solid #C0C3C7;
cursor:pointer;
border-radius:50%;

&:hover ${Icon}{
    transform:scale(1.1);
}

@media screen and (max-width:1300px){
    width: 24px;
    height: 24px;
}
@media screen and (max-width:600px){
    width: 22px;
    height: 22px;
}
@media screen and (max-width:460px){
    width: 20px;
    height: 20px;
}
`



const ReviewsWord = styled.p`
font-size:inherit;
color:inherit;
display:inline;
font-weight:inherit;
margin:0;

@media screen and (max-width:600px){
    display : none;
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
                    <Icon style={{color:"red"}} className="fa-solid fa-heart"/>:
                    <Icon className="fa-regular fa-heart"/>
                }
            </ToggleFavoritesButton>
        </>
    )
}

export default function ProductCard({product,min_width}){
    const [showColorsSizesMenu,setShowColorsSizesMenu] = useState(null);
    const [sizePicked,setSizePicked] = useState(null);
    const [colorPicked,setColorPicked] = useState(null);
    const [actionLoading,setActionLoading] = useState(false);

    function handleCloseSizesColorsMenu(e){
        if (actionLoading)
            return null;
        
        setSizePicked(null);
        setColorPicked(null);
        setShowColorsSizesMenu("");
    }

    const getPrice = ()=>{
        if (product?.sale){
            return(
            <PriceContainer>
                <div style={{display:"flex", gap:".5rem",alignItems:'flex-end'}}>
                    <NewPrice>{product?.sale.price_after_sale}$</NewPrice>
                    <OldPrice>{product?.price}$</OldPrice>
                </div>
            </PriceContainer>)
        }
        return <NewPrice>{product?.price}$</NewPrice>
    }

    return(
        <>
        <PopUpColorsSizesMenu 
        product={product} 
        sizePicked={sizePicked} 
        colorPicked={colorPicked} 
        setSizePicked={setSizePicked} 
        setColorPicked={setColorPicked} 
        actionLoading={actionLoading} 
        showMenu={showColorsSizesMenu} 
        setActionLoading={setActionLoading}
        closeMenu={handleCloseSizesColorsMenu}/>

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
                <OverlayColorsSizesMenu 
                product={product} 
                sizePicked={sizePicked} 
                colorPicked={colorPicked} 
                setSizePicked={setSizePicked} 
                setColorPicked={setColorPicked} 
                actionLoading={actionLoading} 
                showMenu={showColorsSizesMenu} 
                setActionLoading={setActionLoading}/>
            </div>
            <Details>
                <RatingContainer>
                    <Rating>{product?.reviews_summary.average_ratings}</Rating>
                    <RatingStars rating={product?.reviews_summary.average_ratings} />
                    <ReviewsCount>
                        ({product?.reviews_summary.reviews_count}
                        <ReviewsWord> reviews</ReviewsWord>)
                    </ReviewsCount>
                </RatingContainer>
                <Name>{product?.name}</Name>
                <Category>{product?.type}</Category>
                <PriceButtonsContainer>
                    {getPrice()}
                    <ButtonsContainer>
                        <ShoppingButtons actionLoading={actionLoading} setShowColorsSizes={setShowColorsSizesMenu}/>
                        <ToggleFavoritesComponent />
                    </ButtonsContainer>
                </PriceButtonsContainer>
            </Details>
        </Container>
        </>
    )
}