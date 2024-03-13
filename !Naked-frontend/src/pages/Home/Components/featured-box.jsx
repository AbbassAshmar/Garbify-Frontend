import styled from "styled-components"
import {Link} from "react-router-dom"
import { useScroll, useTransform, motion} from "framer-motion";
import { useRef } from "react";

const LinkContainer = styled(Link)`
text-decoration:none;
aspect-ratio:1/.8;
width:100%;
overflow:hidden;
display:flex;
align-items:center;
position:relative;
z-index:0;
cursor:pointer;

&::before{
    content:"";
    background:black;
    opacity:.4;
    width:100%;
    height:100%;
    position:absolute;
    z-index:1;
}

@media screen and (max-width:1024px){
    aspect-ratio:1/1.1;
}

@media screen and (max-width:800px){
    width:100%;
    aspect-ratio:1/.8;
}
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
display:block;
scale:1.05;
`

const Content = styled.div`
width:100%;
margin:30% 0 0 0;
padding: 0 2rem;
position:absolute;
z-index:2;
display:flex;
flex-direction:column;
align-items:flex-start;
gap:2rem;
`

const TextContainer = styled.div`
display:flex;
flex-direction:column;
gap:.5rem;
`

const Heading = styled.h4`
color:white;
font-weight:800;
font-size:var(--heading-4);
@media screen and (max-width:600px){
    font-size:var(--heading-1-mobile);
}
`

const SubTitle = styled.p`
color:white;
font-weight:600;
font-size:var(--body);
max-width:80%;
`

const Button = styled.button`
padding : .4rem 2rem;
background:var(--main-color);
border:none;
border-radius:30px;
font-weight:600;
cursor :pointer;
transition: background .3s;
color:white;
font-size:var(--body);

&:hover{
    background:#009BCC;
}
`

const Container = motion(LinkContainer);



export default function FeaturedBox({subTitle,title,image,imageAlt}){
    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target:containerRef,
        offset: ['start end' , 'end start']
    })

    const imageY = useTransform(scrollYProgress, [0,1], [-100, 100]);
    const imageScale = useTransform(scrollYProgress, [0,.7], [1.15, 1.05]);

    const containerY = useTransform(scrollYProgress, [0,1], [50, -50]);

    return (
        <Container to="/products/abc" ref={containerRef} style={{y:containerY}}>
            <Image as={motion.img} loading="lazy" style={{y:imageY,scale:imageScale}} src={image} alt={imageAlt}/>
            <Content>
                <TextContainer>
                    <Heading>{title}</Heading>
                    <SubTitle>{subTitle}</SubTitle>
                </TextContainer>  
                <Button>Shop Now</Button>
            </Content>
        </Container>
    )
}