import styled from "styled-components";
import { useState } from "react";

const Container = styled.button`
outline:none;
border:none;
cursor:pointer;
border-radius:20px;
padding:2px;
background:${({is_public})=>is_public?'rgba(0, 255, 0,1)':'red' };
justify-content:space-between;
transition:background .3s;

`
const TextCircle = styled.div`
display:flex;
align-items:center;
`

const Text = styled.p`
margin:0;
font-weight:600;
width:40px;
font-size:clamp(.6rem,2vw,.9rem);
position:relative;
right:${({is_public})=> is_public ? '0%':'-24%'};
transition:right .3s;
@media screen and (min-width:500px){
    width:9vw;
}
@media screen and (min-width:700px){
    width:7vw;
}
@media screen and (min-width:1000px){
    width:5vw;
}
@media screen and (min-width:1270px){
    width:60px;
}
`
const Circle = styled.div`
border-radius:50%;
height:13px;
width:13px;
position:relative;

background:${({is_public})=>is_public?'rgba(0,180,0,1)':'rgba(180,0,0,1)'};
left:${({is_public})=> is_public ? '0':'-76%'};
transition:left .3s;
@media screen and (min-width:800px){
    height:15px;
    width:15px;
}
`


export default function PublicPrivateButton(){
    const [isPublic , setIsPublic] = useState(true);

    function handleButtonClick(){
        setIsPublic(!isPublic)
    }

    
    return(
        <Container is_public={isPublic} onClick={()=>handleButtonClick()}>
            <TextCircle>
                <Text  is_public={isPublic}>{isPublic?'public':'private'}</Text>
                <Circle is_public={isPublic} />
            </TextCircle>
        </Container>
    )
}