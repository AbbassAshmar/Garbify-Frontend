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
`

const TitleContainer = styled.div`

`
const SoldOut = styled.p`
margin:0 0 .5rem 0;
width:fit-content;
padding: .3em .8em;
font-size:.8em;
color:white;
font-weight:600;
`
const Title = styled.h2`
margin:0 0 .8rem 0;
font-weight:600;
font-size:1.8em;
`
const ReviewsContainer = styled.div`
display:flex;
gap: 2rem;
margin: 0 0 2rem 0;
`
const StarsContainer = styled.div`
display:flex;
align-items:start;
gap:4px;
`
const Rating = styled.p`
font-weight:600;
display:inline;
font-size:.8em;
margin:0;
`
const Stars = styled.div`
margin:0;
`
const ReviewsNumber = styled(Link)`
color:black;
opacity:.7;
font-weight:800;
font-size: .8em; 
&:hover{ 
    opacity:1;
}
`
const PriceContainer = styled.div`
display:flex;
align-items:flex-end;
gap:1.3rem;
margin: 0 0 2rem 0;
`
const NewPrice = styled.p`
margin:0;
font-weight:600;
font-size:1.8em;

`
const OldPrice = styled.p`
margin:0;
font-size:1.2em;
font-weight:600;
color:black;
opacity:.7;
text-decoration-line: line-through;
`
const SalePercent = styled.p`
margin:0;
font-weight:600;
color:green;
font-size:1.2em;



`
const Price = styled.p`
margin:0;
font-weight:600;
font-size:1.2em;

`

const ColorsContainer = styled.div`
width:100%;
margin:0 0 2rem 0;
`
const ColorsTitle = styled.div`
width:100%;
font-size:1.2em;
font-weight:600;
margin: 0 0 .5em 0;
`
const Colors= styled.div`
width:100%;
display:flex;
gap:1.3rem;
margin:0 0 2rem 0;
`
const ColorImage = styled.img`
border:${({border})=>border};
width:80px;
height:auto;
overflow:hidden;
cursor:pointer;
border-radius:2px;
`
const SizesContainer = styled.div`
margin: 0 0 2rem 0 ;
`
const SizesTitles = styled(ColorsTitle)`
display:flex;
justify-content:space-between;
align-items:flex-end;
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
background: rgba(239, 239, 240,.4);
transition:background .3s;

&:hover{
    background: rgba(239, 239, 240,1);
}
`
const ButtonContainer = styled.div`
margin: 0 0 2rem 0;
`
const AddToBag = styled.button`
width : 100%;
height:8.4vh;
background:black;
color:white;
font-size:1.2em;
font-weight:600;
border:none;
outline:none;
margin : 0 0 .8rem 0;
`
const OutOfStockContainer = styled.div`

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
`
const ShippingBadge =styled.div`
display:flex;
align-items:center;
gap:3px;
font-weight:600;
opacity:.7;
`
const ReturnsBadge =styled(ShippingBadge)`

`
const OverViewContainer = styled.div`
margin:0 0 2rem 0;
`
const OverViewTitle = styled.h2`
font-size:1.2em;
font-weight:600;
margin: 0 0 .8em 0 ;
`
const OverView = styled.p`
margin:0;
white-space: pre-line;
font-size:1.2em;
font-weight:600;
`
const Star = styled.img`
width:15px;
`

const SizeGuideContainer =styled.div`

`
const SizeGuideTitle = styled.div`
display:flex;
align-items:flex-end;
gap:5px;
font-size:1em;
font-weight:600;
margin: 0 0 .5em 0;
cursor:pointer;

`
const TableWrapper = styled.div`
max-height:${({maxHeight})=>maxHeight};
height:auto;
overflow:hidden;
transition:max-height .3s;
`
const SizeGuideTable = styled.table`
border-collapse:collapse;

`
const TableHead = styled.th`
border:1.4px solid rgba(0,194,255,1);
font-weight:600;
background:rgba(0,194,255,.3);
padding : .4rem 0;
`
const TableRow = styled.tr`

`
const TableData  = styled.td`
font-weight:600;
border:1.4px solid rgba(0,194,255,1);
padding:.4rem 3rem;


`

// converts rating (int) to array ([star,star,half,empty,empty])
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
    // from 3.5 to [star, star,star, half, empty, empty]
    
    function handleSizeGuideClick(ref){
        setShowTable(true)
        ref.current.scrollIntoView({ behavior: 'smooth'})
    }
    
    return (
        <Container>
            <TitleContainer>
                { !quantity && <SoldOut>Sold out</SoldOut>}
                <Title>
                    {product.name}
                </Title>
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
                        <NewPrice>  
                            ${product.sale.price_after_sale}
                        </NewPrice>
                        <OldPrice>
                            ${product.price}
                        </OldPrice>
                        <SalePercent>
                            {product.sale.percentage}% Off
                        </SalePercent>
                    </>:
                    <Price>
                        ${product.price}
                    </Price>
                }
            </PriceContainer>
            <ColorsContainer>
                <ColorsTitle>   
                    colors :  <span style={{fontSize:".7em",opacity:".7",fontWeight:"600",color:`${ImagesColor}`}}>{ImagesColor&&ImagesColor}</span>
                </ColorsTitle>
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
                    <p styled={{margin:"0"}}>
                        sizes : <span style={{fontSize:".7em",opacity:".7"}}>{sizePicked&&sizePicked}</span>
                    </p>
                    <SizeGuideLink  onClick={(e)=>{return handleSizeGuideClick(sizeTableRef)}}>size guide</SizeGuideLink>
                </SizesTitles>
                <Sizes>
                    {product.sizes.map((size)=>{
                        return (
                            <Size   
                            border={sizePicked == size ? "1px solid #00C2FF":"1px solid black"}
                            onClick={(e)=>{return setSizePicked(size)}}>
                                {size}
                            </Size>
                        )
                    })}
                </Sizes>
            </SizesContainer>
            <ButtonContainer>
                {quantity > 0 ?
                <AddToBag>Add to Bag</AddToBag>
                :
                <OutOfStockContainer>
                    <OutOfStock disabled="true">
                        Out of Stock
                    </OutOfStock>
                    <p style={{margin:'.5em auto',width:"fit-content",fontWeight:600}}>
                        Coming back soon !
                    </p>
                </OutOfStockContainer>
                }
                <BadgesContainer>
                    <ShippingBadge>
                        <i className="fa-solid fa-truck-fast"/>
                        <p>Free shipping over $99</p>
                    </ShippingBadge>
    
                    <ReturnsBadge>
                        <i className="fa-solid fa-rotate"></i>
                        <p>Free returns</p>
                    </ReturnsBadge>
                </BadgesContainer>
            </ButtonContainer>
            <OverViewContainer>
                <OverViewTitle>Overview : </OverViewTitle>
                <OverView> 
                    {product.description}
                </OverView>
            </OverViewContainer>
            <SizeGuideContainer ref={sizeTableRef}>
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
                            <TableRow key={size}>
                                {size.map((s)=>{
                                    return <TableData key={s}>{s}</TableData>
                                })}
                            </TableRow>
                        )
                    })}
                    
                </SizeGuideTable>
                </TableWrapper>
            </SizeGuideContainer>
        </Container>
    )
}