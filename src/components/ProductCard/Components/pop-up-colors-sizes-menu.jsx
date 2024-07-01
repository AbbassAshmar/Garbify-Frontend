import {motion,AnimatePresence} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ActionButton from './action-button';
import {AvailableColors,AvailableSizes} from "../../../pages/Product/Components/details-container";

const PopUp = styled.div`
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
position:fixed;
z-index:100;
top:0;
left:0;
&:before{
    content:"";
    position:absolute;
    background:black;
    opacity:.7;
    width:100%;
    height:110%;
    z-index:-1;
    top:0;
    left:0;
}
@media screen and (min-width:1300px){
    display:none;
}
`

const Content = styled.div`
width:80%;
background:white;
border-radius:10px;
padding:1.3rem;
display:flex;
flex-direction:column;
gap:.75rem;
min-height:35%;
max-width:500px;
`

const CloseIcon = styled.i`
color:black;
font-size: clamp(1rem, 2.6vw, 1.3rem);
align-self:flex-end
`

const SizesColors = styled.div`
display:flex;
flex-direction:column;
gap:1.7rem;
align-items:space-between;
`


export default function PopUpColorsSizesMenu({sizePicked,setSizePicked,colorPicked,setColorPicked,product,showMenu,actionLoading,setActionLoading,closeMenu}){
    const contentRef = useRef()
    
    useEffect(() => {
        if (showMenu ) document.addEventListener("mousedown", handleClickOutside);
        function handleClickOutside(event) {
            if (contentRef.current && !contentRef.current.contains(event.target) && window.innerWidth < 1300){
                closeMenu()
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }
    }, [showMenu]);
    
    return(
        <AnimatePresence>
            { showMenu &&
                <PopUp
                as={motion.div}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.3}}>
                    <Content
                    ref={contentRef}
                    as={motion.div} 
                    transition={{type: "Tween", stiffness: 100 }}
                    initial={{y:100,opacity:0}} 
                    animate={{y:0,opacity:1}} 
                    exit={{y:100,opacity:0}}>
                        <CloseIcon onClick={closeMenu} className="fa-solid fa-xmark"/>
                        <SizesColors>
                            <AvailableSizes sizePicked={sizePicked} setSizePicked={setSizePicked} product={product}/>
                            <AvailableColors colorPicked={colorPicked} setColorPicked={setColorPicked} product={product}/>
                            <ActionButton 
                            actionLoading={actionLoading} 
                            setActionLoading={setActionLoading}
                            product={product}
                            sizePicked={sizePicked}
                            colorPicked={colorPicked}
                            showMenu={showMenu}/>
                        </SizesColors>
                    </Content>
                </PopUp>
            }
        </AnimatePresence>
    )
}