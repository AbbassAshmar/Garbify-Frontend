import styled from "styled-components";
import { Link } from "react-router-dom";
import { ratingToStars } from "../../Product/Components/details-container";

import star from "../../../assets/star.png"
import half_star from "../../../assets/half_star.png"
import empty_star from "../../../assets/empty_star.png"

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
const Star  = styled.img`
width:16px;
`
export default function UserInformationSection(){
    return (
        <Container>
            <Content>
                <KeyValuePair>
                    <Key>joined at</Key>
                    <Value>12-2-2023</Value>
                </KeyValuePair>
                <KeyValuePair>
                    <Key>number of orders </Key>
                    <Value>302</Value>
                    <Value>
                        <Link style={{color:"#00C2FF",fontWeight:"600",fontSize:"clamp(.7rem,2vw,.9rem)",textDecoration:"none"}}>
                            view orders ->
                        </Link>
                    </Value>
                </KeyValuePair>
                <KeyValuePair>
                    <Key>number of reviews</Key>
                    <Value>103</Value>
                </KeyValuePair>
                <KeyValuePair>
                    <Key>average ratings</Key>
                    <Value>
                        {ratingToStars(4).map((value)=>{
                            if (value === "star") return <Star src={star} />
                            if (value=== "half") return <Star src={half_star} />
                            if (value=== "empty") return <Star src={empty_star} /> 
                        })}
                    </Value>
                </KeyValuePair>
            </Content>
        </Container>
    )
}