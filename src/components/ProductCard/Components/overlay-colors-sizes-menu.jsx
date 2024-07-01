import styled from "styled-components"
import ActionButton from "./action-button"
import {motion,AnimatePresence} from "framer-motion";
import {AvailableColors,AvailableSizes} from "../../../pages/Product/Components/details-container";

const Overlay = styled.div`
width:100%;
max-height:100%;
justify-content:space-between;

display:flex;
flex-direction:column;
gap:1.7rem;
position:absolute;
bottom:0;
left:0;
background:white;

@media screen and (max-width:1300px){
    display:none;
}
`
const SizesColors = styled.div`
padding:3.5% 3.5%  0 3.5%;
display:flex;
flex-direction:column;
gap:1.7rem;
`

export default function OverlayColorsSizesMenu({actionLoading,setActionLoading,product,sizePicked,colorPicked,showMenu,setSizePicked,setColorPicked}){
    return (
        <AnimatePresence>
            {showMenu && 
                <Overlay 
                as={motion.div} 
                transition={{type: "Tween", stiffness: 100 }}
                initial={{y:100,opacity:0}} 
                animate={{y:0,opacity:1}} 
                exit={{y:100,opacity:0}} >
                    <SizesColors>
                        <AvailableSizes sizePicked={sizePicked} setSizePicked={setSizePicked} product={product}/>
                        <AvailableColors colorPicked={colorPicked} setColorPicked={setColorPicked} product={product}/>
                    </SizesColors>
                    <ActionButton 
                    actionLoading={actionLoading} 
                    setActionLoading={setActionLoading}
                    product={product}
                    sizePicked={sizePicked}
                    colorPicked={colorPicked}
                    showMenu={showMenu}/>
                </Overlay>
            }
        </AnimatePresence>
    )
}