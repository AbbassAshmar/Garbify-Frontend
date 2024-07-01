import styled from "styled-components";
import { useState,useRef,useEffect } from "react";
import { motion } from "framer-motion";

const Image = styled.img`
box-shadow:0px 0px 7px rgba(0,0,0,0.6);
width:100%;
border-radius:3px;
object-fit:cover;
`


export default function MovableImage({Container , src}){
    const [imageCoordinatesOffset,setImageCoordinatesOffset] = useState({x:0, y:0});
    const [imageOrigin,setImageOrigin] = useState({x:0,y:0});

    let imageRef = useRef();

    useEffect(()=>{
        setImageOrigin({
            x:imageRef?.current?.getBoundingClientRect().left + (imageRef?.current?.getBoundingClientRect().width/2), 
            y:imageRef?.current?.getBoundingClientRect().top + (imageRef?.current?.getBoundingClientRect().height/2)
        })
    },[])


    function handleMouseMoveOverImage(e){
        let XMouserelativeToViewport = e.clientX;
        let YMouserelativeToViewport = e.clientY;
        
        let XMouseRelativeToImage =XMouserelativeToViewport - imageOrigin.x;
        let YMouseRelativeToImage =YMouserelativeToViewport - imageOrigin.y;
        
        setImageCoordinatesOffset({x:Math.max(-30, Math.min(XMouseRelativeToImage, 30)), y:Math.max(-30, Math.min(YMouseRelativeToImage, 30))})
    }
    
    return (
        <Container as={motion.div} ref={imageRef} onMouseMove={handleMouseMoveOverImage}  style={{x:imageCoordinatesOffset.x, y:imageCoordinatesOffset.y}}>
            <Image src={src} />
        </Container>
    )
}
