import styled from "styled-components";
import { Link } from "react-router-dom";
import RatingStars from "../../../components/RatingStars/rating-stars";

const Container = styled.div`
`

const Content = styled.div`
width : 100%;
display:flex;
flex-direction:column;
gap:15px;
`
const KeyValuePair = styled.div`
display:grid;
justify-content:space-between;
grid-template-columns: 1fr 80px 120px;
grid-gap:20px;
align-items:center;
@media screen and (max-width:800px){
    grid-template-columns: 1fr 1fr 1fr;
}
@media screen and (max-width:600px){
    grid-template-columns: 42% 20% 25%;
}
`
const Key = styled.p`
font-weight:600;
font-size:clamp(.8rem,2vw,1rem);
text-wrap:nowrap;
`
const Value = styled.div`
text-wrap:nowrap;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
width:fit-content;
color:grey;

@media screen and (max-width:800px){
    justify-self:center;
}
`

export default function UserInformationSection(){

    let RenderKeyValue = (key,value,link=null)=>{
        return(
            <KeyValuePair>
                <Key>{key}</Key>
                <Value>{value}</Value>
                {   
                    link && 
                    <Value>
                        <Link 
                        to={link.to} 
                        style={{color:"#00C2FF",
                        fontWeight:"600",
                        fontSize:"clamp(.7rem,2vw,.9rem)",
                        textDecoration:"none"}}>
                        {link.text}
                        </Link>
                    </Value>
                }
            </KeyValuePair>
        )
    }
    
    return (
        <Container>
            <Content>
                {RenderKeyValue('joined at','12-2-2023')}
                {RenderKeyValue('number of orders',304,{text:'view orders',to:'/orders'})}
                {RenderKeyValue('number of reviews',103,{text:'manage reviews ',to:'/reviews'})}
                {RenderKeyValue('average ratings',<RatingStars rating={4}/>)}
            </Content>
        </Container>
    )
}