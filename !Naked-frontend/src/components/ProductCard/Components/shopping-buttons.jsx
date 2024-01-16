import styled from "styled-components"
import {motion,AnimatePresence} from "framer-motion";
import { useState } from "react";
import { Icon } from "../product-card";

export const ButtonsDisplayer = styled.div`
height:25px;
background:#00C2FF;
padding: 0 8px;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
border-radius:30px;
transition:width .3s;
width:${({$hover})=>$hover?"65px":"25px"};
@media screen and (max-width:1300px){
    width: 28px;
    height: 28px;
}
@media screen and (max-width:600px){
    width: 20px;
    height: 20px;
}

`

const ButtonsContainer = styled.div`
display: flex;
gap: 2px;
cursor: pointer;
height: 100%;
width: 100%;
justify-content: space-between;
align-items: center;

`

const Button = styled.button`
background:transparent;
height:100%;
outline:none;
border:none;
position:relative;
cursor:pointer;
width:25px;
padding:1px;
display:flex;
align-items:center;
justify-content:center;

@media screen and (max-width:1300px){
    width:100%;
    height:auto;
    font-weight:600;
    font-size:clamp(.65rem,1.8vw,.7rem);
    text-wrap:nowrap;
    justify-content:space-between;
    gap:3px;
    padding:0;
}
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
display:none;
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
${Button}:hover &{
    display:block;
}
`

const ButtonsDropDown = styled.div`
top:105%;
overflow:hidden;
right:62%;
background: #00C2FF;
border-radius: 4px;
z-index: 1;
transform-origin:center;
position:absolute;
transition:max-height .5s;
margin: 0 auto;
`
const ButtonsDropDownContent = styled.div`
padding:3px 5px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:4px;
width:100%;
`

const IconContainer = styled.div`
overflow:hidden;
background:transparent;
height:100%;
display:flex;
padding-top: 2px;
align-items:center;
justify-content:center;
`


export default function ShoppingButtons({actionLoading,setShowColorsSizes}){
    const [hover, setHover] = useState(false);

    function handleButtonsDisplayerClick(){
        if (window.innerWidth < 1300)
        setHover(!hover);
    }

    function handleMouseEnterButtonsDisplayer(){
        setHover(true)
    }

    function handleMouseLeaveButtonsDisplayer(){
        setHover(false)
    }

    function handleAddToCartClick(e){
        if(!actionLoading)
        setShowColorsSizes("Cart")
    }

    function handleBuyNowClick(e){
        if(!actionLoading)
        setShowColorsSizes("Buy")
    }

    return (
        <ButtonsDisplayer $hover={hover} onClick={handleButtonsDisplayerClick} onMouseEnter={handleMouseEnterButtonsDisplayer}  onMouseLeave={handleMouseLeaveButtonsDisplayer}>
            {(!hover || window.innerWidth<1300) && <Icon className="fa-solid fa-bag-shopping"/>}

            { hover && window.innerWidth > 1300 &&
                <ButtonsContainer>
                    <Button onClick={handleBuyNowClick} as={motion.div} initial={{ zIndex:'-1'}} animate={{zIndex:'0'}} transition={{delay:.14}}>
                        <IconContainer as={motion.div} initial={{width: 0}} animate={{ width: "100%" }} transition={{duration:.03,delay:.14}}>
                            <Icon className="fa-regular fa-credit-card"/>
                        </IconContainer>
                        <PopUpText style={{right:"-20px"}}>Buy now</PopUpText>
                    </Button>
                    <Button as={motion.div} initial={{zIndex:'-1'}} animate={{zIndex:'0'}} onClick={handleAddToCartClick}>
                        <IconContainer as={motion.div} initial={{width:0}} animate={{width:"100%"}} transition={{duration:.03,delay:.14}}>
                            <Icon className="fa-solid fa-cart-shopping"/>
                        </IconContainer>
                        <PopUpText style={{right:"-27px"}}>Add to cart</PopUpText>
                    </Button>
                </ButtonsContainer>
            }

            <AnimatePresence>
            {hover && window.innerWidth < 1300 &&
            <ButtonsDropDown as={motion.div} initial={{ height: 0 }} animate={{ height: "auto" }} transition={{ duration: .3}} exit={{ height: 0 }} key={"container"}>
                <ButtonsDropDownContent>
                    <Button onClick={handleBuyNowClick}>
                        Buy now <Icon className="fa-regular fa-credit-card"/>
                    </Button>
                    <Button onClick={handleAddToCartClick}>
                        Add to cart <Icon className="fa-solid fa-cart-shopping"/>
                    </Button>
                </ButtonsDropDownContent>
            </ButtonsDropDown>
            }
            </AnimatePresence>
            
            
        </ButtonsDisplayer>
    )
}