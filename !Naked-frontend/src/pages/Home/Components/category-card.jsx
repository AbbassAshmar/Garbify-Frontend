import {styled} from "styled-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";


const ImageContainer = styled.div`
width :100%;
position:relative;
overflow:hidden;
`
const Image = styled.img`
width:100%;
height:100%;
cursor:pointer;
transition:all .3s;
object-fit:cover;
-webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
filter: grayscale(100%);
`

const Border =styled.div`
transition:border .3s;
top:3.5%;
left:5%;
z-index:2;
height:93%;
width:90%;
border:5px solid black;
position:absolute;
display:flex;
align-items:flex-end;
justify-content:center;
`
const Title =styled.h6`
transition:color .3s;
color:black;
cursor:pointer;
font-weight:bold;
font-size:var(--heading-1);
position:absolute;
top:60%;
left:50%;
transform:translate(-50%,-50%);
@media screen and (max-width:800px){
    font-size:.8rem;
    margin-bottom:2rem;
}
`

const CardContainer =styled.div`
overflow:hidden;
position:relative;
display:block;
width:100%;

&:hover ${Image}{
    transform:scale(1.1);
    -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
    filter: grayscale(0%);
}
&:hover ${Border}{
    border:5px solid var(--main-color);
}
&:hover ${Title}{
    color:var(--main-color);

}
@media screen and (max-width:600px){
    aspect-ratio: 1/1.6;
    width:100%;
}
`
const cardVariant = { 
    initial: {
        y : 80,
        opacity:0
    },
    animate:{
        y:0,
        opacity:1,
        transition:{
            delay:.5,
            opacity : { 
                duration:.2,
            },
            y:{
                duration:.8,
            },
            
        }
    }
}
export default function CatgegoryCard({image,color,text}){
    
    return (
        <CardContainer as={motion.div} variants={cardVariant} whileInView='animate' initial="initial" viewport={{once:"true"}}>
            <Border $color={'black'} />
            <Image src={image}/>
            <Title $color={color}>
                {text}
            </Title>
        </CardContainer>
    )
}