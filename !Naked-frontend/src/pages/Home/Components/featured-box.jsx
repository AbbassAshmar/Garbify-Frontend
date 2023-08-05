import styled from "styled-components"
import {Link} from "react-router-dom"
const Container = styled.div`
// height:70vh;
aspect-ratio:1/.8;

width:46.5vw;
overflow:hidden;
background:url(${({image})=> image});
background-position:center;
background-size:cover;
display:flex;
align-items:center;
position:relative;
z-index:0;

&::before{
    content:"";
    background:black;
    opacity:.4;
    width:100%;
    height:100%;
    position:absolute;
    z-index:-1;
}

@media screen and (max-width:670px){
    width:100%;

}
`
const Content = styled.div`
width:100%;
margin:30% 0 0 0;
padding: 0 0 0 1rem;
`
const TextContainer = styled.div`
margin: 0 0 1rem 0 ;
@media screen and (max-width:385px){
    margin:0 0 .3rem 0 ;
}
`

const Text1 = styled.p`
margin: 0 0 .5rem 0;
color:white;
font-weight:600;
font-size:16px;
@media screen and (max-width:475px){
    font-size:14px;

}
@media screen and (max-width:385px){
    font-size:12px;
}
@media screen and (max-width:385px){
    font-size:10px;
    margin: 0 0 .1rem 0;

}
`
const Text2 = styled.p`
color:white;
font-weight:600;
font-size:20px;
@media screen and (max-width:475px){
    font-size:16px;
}
@media screen and (max-width:385px){
    font-size:14px;
}
@media screen and (max-width:385px){
    font-size:12px;
}
`

const OrderButton = styled.button`
padding : .3rem 1rem;
background:rgba(0,194,255,1);
border:none;
border-radius:30px;
font-weight:bold;
cursor :pointer ;
transition: background .3s;
&:hover {
    background:rgba(0,194,255,.3);
}
@media screen and (max-width:475px){
    font-size:12px;
}
@media screen and (max-width:385px){
    font-size:10px;
}
@media screen and (max-width:300px){
    font-size:8px;
    padding:.2rem .5rem;
}
`
export default function FeaturedBox(props){
    return (
        <Link style={{textDecoration:"none",width:"100%"}}>
        <Container image={props.image}>
            <Content>
                <TextContainer>
                    <Text1>{props.category}</Text1>
                    <Text2>{props.text}</Text2>
                </TextContainer>  
                <OrderButton>Order Now</OrderButton>
            </Content>
        </Container>
        </Link>
    )
}