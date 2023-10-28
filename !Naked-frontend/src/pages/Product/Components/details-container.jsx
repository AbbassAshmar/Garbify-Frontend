import { styled } from "styled-components"
import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"

const Container = styled.div`
flex:3.5;
margin-left:2rem;
position:sticky;
top:60px;
gap:2rem;
display:flex;
flex-direction:column;
@media screen and (max-width:600px){
    margin:0;
    position:static;
    width: 100%;
}
`

const TitleContainer = styled.div`

`
const SoldOut = styled.p`
margin:0 0 .5rem 0;
width:fit-content;
padding: .3em .8em;
color:white;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const Title = styled.h2`
margin:0 0 .8rem 0;
font-weight:600;
font-size:clamp(.9rem, 2.6vw, 1.3rem);
`
const ReviewsContainer = styled.div`
display:flex;
gap: 2rem;
// margin: 0 0 2rem 0;
`
const StarsContainer = styled.div`
display:flex;
align-items:start;
gap:4px;
`
const Rating = styled.p`
font-weight:600;
display:inline;
margin:0;

font-size:clamp(.6rem,2vw,.9rem);
`
const Stars = styled.div`
margin:0;
`
const ReviewsNumber = styled(Link)`
color:black;
opacity:.7;
font-weight:800;
&:hover{ 
    opacity:1;
}

font-size:clamp(.6rem,2vw,.9rem);
`
const PriceContainer = styled.div`
display:flex;
align-items:flex-end;
gap:1.3rem;
// margin: 0 0 2rem 0;
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
// margin:0 0 2rem 0;
`
const ColorSizeTitle = styled.div`
width:100%;
font-weight:600;
margin: 0 0 .5em 0;

font-size:clamp(.6rem,2vw,.9rem);

`
const Colors= styled.div`
width:100%;
display:flex;
gap:1.3rem;
// margin:0 0 2rem 0;
`
const ColorImage = styled.img`
border:${({border})=>border};
overflow:hidden;
cursor:pointer;
border-radius:2px;
object-fit:cover;
flex:1;
max-width:80px;
max-height:80px;
`
const SizesContainer = styled.div`
// margin: 0 0 2rem 0 ;

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const SizesTitles = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-start;
margin: 0 0 .5em 0;

`
const SizeGuideLink = styled(Link)`
color:black;
opacity:.7;
text-decoration:none;
`
const Sizes = styled.div`
display:flex;
flex-wrap:wrap;
gap:.2em;
`
const Size =styled.div`
font-weight:600;
padding: .3em .8em ;
border:${({border})=>border};
border-radius:2px;
cursor:pointer;
background: #F1F4F9;
transition:background .3s;

&:hover{
    opacity:.8;
}
`
const ButtonContainer = styled.div`
// margin: 0 0 2rem 0;
`
const AddToBag = styled.button`
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
const OutOfStock = styled(AddToBag)`
background:#9C9C9C;
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
// margin:0 0 2rem 0;

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
const Star = styled.img`
width:15px;
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
max-height:${({maxHeight})=>maxHeight};
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

// converts rating (int) to array ([star,star,half,empty,empty])
// result is rendered in jsx as images
export function ratingToStars(rating){
    let result = [];
    let i =0 ;
    for (; i < parseInt(rating);  i++ ){
        result.push("star")
    }
   
    if (((rating*10) % 10 ) != 0 ){
        result.push("half")
        i++;
    }
    for (; i <5 ; i++){
        result.push('empty')
    }
    return result;
}

export default function DetailsContainer({ quantity,product,setImagesColor,ImagesColor,setSizePicked, sizePicked}){
    const [showTable, setShowTable] = useState(false)
    const sizeTableRef  = useRef(null)
    
    function handleSizeGuideClick(ref){
        setShowTable(true)
        ref.current.scrollIntoView({ behavior: 'smooth'})
    }
    
    return (
        <Container>
            <TitleContainer>
                { !quantity && <SoldOut>Sold out</SoldOut>}
                <Title>{product.name}</Title>
                <ReviewsContainer>
                    <StarsContainer>
                        <Rating>{product.reviews_summary.average_ratings}</Rating>
                        <Stars>
                            {ratingToStars(product.reviews_summary.average_ratings).map((value)=>{
                                if (value === "star") return <Star src={star} />
                                if (value=== "half") return <Star src={half_star} />
                                if (value=== "empty") return <Star src={empty_star} /> 
                            })}
                        </Stars>
                    </StarsContainer>
                    <ReviewsNumber>
                            {product.reviews_summary.reviews_count} reviews
                    </ReviewsNumber>
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
            <ColorsContainer>
                <ColorSizeTitle>   
                    colors :  <span style={{opacity:".7",color:`${ImagesColor}`}}>{ImagesColor&&ImagesColor}</span>
                </ColorSizeTitle>
                <Colors>
                {
                    product.colors.map((color)=>{
                        return(<ColorImage 
                            border={ImagesColor === color?"2px solid #00C2FF":"none"}
                            onClick={(e)=>{return setImagesColor(color)}}
                            src={product.images[color][0].url} 
                            alt={product.images[color][0].image_details}
                        />
                        )
                    })
                }
                </Colors>
            </ColorsContainer>
            <SizesContainer>
                <SizesTitles>
                    <p style={{flex:"1"}}>
                        sizes : <span style={{opacity:".7"}}>{sizePicked&&sizePicked}</span>
                    </p>
                    <SizeGuideLink  onClick={(e)=>{return handleSizeGuideClick(sizeTableRef)}}>size guide</SizeGuideLink>
                </SizesTitles>
                <Sizes>
                    {product.sizes.map((size)=>{
                        return (
                            <Size   
                            border={sizePicked == size ? "2px solid #00C2FF":"1px solid  rgba(0,0,0,.3)"}
                            onClick={(e)=>{return setSizePicked(size)}}>
                                {size}
                            </Size>
                        )
                    })}
                </Sizes>
            </SizesContainer>
            <ButtonContainer>
                {
                    quantity > 0 ?
                    <AddToBag>Add to Bag</AddToBag>
                    :
                    <div>
                        <OutOfStock disabled="true">
                            Out of Stock
                        </OutOfStock>
                        <p style={{margin:'.5em auto',width:"fit-content",fontWeight:600}}>
                            Coming back soon !
                        </p>
                    </div>
                }
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
            </ButtonContainer>
            <OverViewContainer>
                <OverViewTitle>Overview : </OverViewTitle>
                <OverView> 
                    {product.description}
                </OverView>
            </OverViewContainer>
            <div ref={sizeTableRef}>
                <SizeGuideTitle  onClick={()=>{setShowTable(!showTable)}}>
                    <p style={{margin:"0"}}>Size guide </p>
                    <i style={{transition:"transform .3s",margin:"0",transform:`rotateX(${showTable?'180deg':"0"})`}} className="fa-solid fa-angle-down"></i>
                </SizeGuideTitle>
                <TableWrapper maxHeight={showTable?"100vh":"0px"}>
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