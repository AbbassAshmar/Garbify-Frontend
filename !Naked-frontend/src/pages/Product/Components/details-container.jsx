import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import AddToCartButton from "../../../components/AddToCartButton/add-to-cart-button"
import RatingStars from "../../../components/RatingStars/rating-stars"

const Container = styled.div`
flex:1;
background:white;
position:sticky;
top:60px;
gap:2rem;
display:flex;
flex-direction:column;
overflow:hidden;
@media screen and (max-width:600px){
    margin:0;
    position:static;
    width: 100%;
}
`

const TitleContainer = styled.div`
display:flex;
flex-direction:column;
gap:.3rem;
`

const Title = styled.h2`
font-weight:600;
font-size:clamp(.9rem, 2.6vw, 1.3rem);
`
const Type= styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
color:grey;
margin: 0 0 .5rem 0;
`
const ReviewsContainer = styled.div`
display:flex;
gap: 2rem;
`
const RatingContainer = styled.div`
display:flex;
align-items:center;
gap:4px;
line-height:0;
`
const Rating = styled(Link)`
color:black;
text-decoration:none;
font-weight:600;
display:inline;
margin:0;
font-size:clamp(.6rem,2vw,.9rem);
`
const PriceContainer = styled.div`
display:flex;
align-items:flex-end;
gap:1rem;
`
const NewPrice = styled.p`
margin:0;
font-weight:600;
font-size:clamp(.9rem, 2.6vw, 1.3rem);
`
const OldPrice = styled.p`
margin:0;
color:black;
opacity:.7;
text-decoration-line: line-through;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const SalePercent = styled.p`
margin:0;
color:green;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const Price = styled.p`
margin:0;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

const ColorsContainer = styled.div`
width:100%;
`
const ColorSizeTitle = styled.div`
width:100%;
font-weight:600;
margin: 0 0 .4em 0;
font-size:clamp(.6rem,2vw,.9rem);
color:black;
`
const Colors= styled.div`
width:100%;
display:flex;
gap:1.3rem;
`
const ColorImage = styled.img`
border:${({$border})=>$border};
overflow:hidden;
cursor:pointer;
border-radius:2px;
object-fit:cover;
flex:1;
max-width:80px;
max-height:80px;
`
const SizesContainer = styled.div`
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const SizesTitles = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-start;
margin: 0 0 .4em 0;

`
const SizeGuideLink = styled(Link)`
color:black;
opacity:.7;
text-decoration:none;
`
const Sizes = styled.div`
display:flex;
flex-wrap:wrap;
gap:.4em;
`
const Size =styled.div`
font-weight:600;
padding: .3em .8em ;
border:${({$border})=>$border};
border-radius:2px;
cursor:pointer;
background:white;
transition:background .3s, box-shadow .3s;
&:hover{
    box-shadow:3px 3px 5px rgba(0,0,0,.4);
}
`

const AddToFavoritesButton = styled.button`
background:white;
color:black;
width : 100%;
height:8.4vh;
max-height: 50px;
border:1px solid #C0C3C7;
border-radius:7px;
margin : 0 0 .4rem 0;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
&:hover{
    border:1px solid black;
}
`
const BadgesContainer = styled.div`
display:flex;
align-items:center;
margin:0 auto;
width:fit-content;
gap:1.6em;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const ShippingReturnsBadge =styled.div`
display:flex;
align-items:center;
gap:3px;
opacity:.7;
`
const OverViewContainer = styled.div`
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const OverViewTitle = styled.p`
margin: 0 0 .5em 0;
`
const OverView = styled.p`
margin:0;
white-space: pre-line;
`

const SizeGuideTitle = styled.div`
display:flex;
align-items:flex-end;
gap:5px;
margin: 0 0 .5em 0;
cursor:pointer;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const TableWrapper = styled.div`
max-height:${({$maxHeight})=>$maxHeight};
height:auto;
overflow:hidden;
transition:max-height .3s;
`
const SizeGuideTable = styled.table`
border-collapse:collapse;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const TableHead = styled.th`
border:1.4px solid rgba(0,194,255,1);
background:rgba(0,194,255,.3);
padding : .4rem 0;
font-weight:600;
`

const TableData  = styled.td`
border:1.4px solid rgba(0,194,255,1);
width:100vw;
text-align:center;
height:5vh;
`

export function AvailableSizes({sizePicked,setSizePicked,product,handleSizeGuideClick=null}){
    

    if (!product?.sizes) return <></>

    function handleSizeClick(size){
        setSizePicked(size);
    }

    return (
        <SizesContainer>
            <SizesTitles>
                <p style={{flex:"1"}}>
                    Sizes : <span style={{color:"grey"}}>{sizePicked&&sizePicked}</span>
                </p>
                {handleSizeGuideClick && <SizeGuideLink onClick={handleSizeGuideClick}>size guide</SizeGuideLink>}
            </SizesTitles>
            <Sizes>
                {product.sizes.map((size)=>{
                    return (
                        <Size   
                            $border={sizePicked == size ? "1px solid #00C2FF":"1px solid #D8DBE0"}
                            onClick={(e)=> {
                                e.preventDefault()
                                handleSizeClick(size)}
                            }>
                            {size}
                        </Size>
                    )
                })}
            </Sizes>
        </SizesContainer>
    )
}

export function AvailableColors({setColorPicked,colorPicked,product}){
    if (!product?.images) return <></>

    function handleColorClick(color){
        setColorPicked(color);
    }
    
    return(
        <ColorsContainer>
            <ColorSizeTitle>   
                Colors :  <span style={{color:`grey`}}>{colorPicked&&colorPicked}</span>
            </ColorSizeTitle>
            <Colors>
            { 
                Object.keys(product.images).map((color)=>{
                    return(<ColorImage 
                        $border={colorPicked === color?"2px solid #00C2FF":"none"}
                        onClick={(e)=>{
                            e.preventDefault; 
                            handleColorClick(color)}
                        }
                        src={product.images[color][0].url} 
                        alt={product.images[color][0].image_details}
                    />)
                })
            }
            </Colors>
        </ColorsContainer>
    )
}

export default function DetailsContainer({quantity,product,setImagesColor,ImagesColor,setSizePicked, sizePicked}){
    const [addToCartLoading,setAddToCartLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const sizeTableRef  = useRef(null);
    
    function handleSizeGuideClick(e){
        setShowTable(true)
        sizeTableRef.current.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <Container>
            <TitleContainer>
                <Title>{product.name}</Title>
                <Type>{product.type}</Type>
                <ReviewsContainer>
                    <RatingContainer>
                        <RatingStars rating={product.reviews_summary.average_ratings}/>
                        <Rating>
                            {product.reviews_summary.average_ratings}&nbsp;(
                            <span style={{textDecoration:"underline"}}>
                                {product.reviews_summary.reviews_count}
                            </span>)
                        </Rating>
                    </RatingContainer>
                </ReviewsContainer>
            </TitleContainer>
            <PriceContainer>
                {
                    product.sale ? 
                    <>
                        <NewPrice>${product.sale.price_after_sale}</NewPrice>
                        <OldPrice>${product.price}</OldPrice>
                        <SalePercent>{product.sale.percentage}% Off</SalePercent>
                    </>:
                    <Price>${product.price}</Price>
                }
            </PriceContainer>

            <AvailableColors 
            setColorPicked={setImagesColor} 
            colorPicked={ImagesColor} 
            product={product}/>

            <AvailableSizes
            setSizePicked={setSizePicked}
            sizePicked={sizePicked}
            product={product}
            handleSizeGuideClick={handleSizeGuideClick}/>

            <div>
                <AddToCartButton 
                    product_id={product.id} 
                    size={sizePicked} 
                    color={ImagesColor} 
                    availableQuantity={quantity}
                    addToCartLoading={addToCartLoading}
                    setAddToCartLoading={setAddToCartLoading}
                />
                <AddToFavoritesButton>
                    Add to Favorites&nbsp;<i className="fa-solid fa-heart"/>
                </AddToFavoritesButton>
                <BadgesContainer>
                    <ShippingReturnsBadge>
                        <i className="fa-solid fa-truck-fast"/>
                        <p>Free shipping over $99</p>
                    </ShippingReturnsBadge>
                    <ShippingReturnsBadge>
                        <i className="fa-solid fa-rotate"/>
                        <p>Free returns</p>
                    </ShippingReturnsBadge>
                </BadgesContainer>
            </div>
            <OverViewContainer>
                <OverViewTitle>Overview : </OverViewTitle>
                <OverView>{product.description}</OverView>
            </OverViewContainer>
            <div ref={sizeTableRef}>
                <SizeGuideTitle  onClick={()=>{setShowTable(!showTable)}}>
                    <p style={{margin:"0"}}>Size guide </p>
                    <i style={{transition:"transform .3s",margin:"0",transform:`rotateX(${showTable?'180deg':"0"})`}} className="fa-solid fa-angle-down"></i>
                </SizeGuideTitle>
                <TableWrapper $maxHeight={showTable?"100vh":"0px"}>
                <SizeGuideTable>
                    {product.sizes_table.units.map((unit)=>{
                        return (
                            <TableHead key={unit}>
                                {unit}
                            </TableHead>
                        )
                    })}
                    {product.sizes_table.sizes.map((size)=>{
                        return (
                            <tr key={size}>
                                {size.map((s)=>{
                                    return <TableData key={s}>{s}</TableData>
                                })}
                            </tr>
                        )
                    })}
                </SizeGuideTable>
                </TableWrapper>
            </div>
        </Container>
    )
}