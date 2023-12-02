import styled from "styled-components";
import { Link } from "react-router-dom";
import Share from "./share";

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
`
const Key = styled.p`
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const Value = styled.div`
font-weight:600;
color:grey;
font-size:clamp(.6rem,2vw,.9rem);
width:fit-content;

@media screen and (max-width:800px){
    justify-self:center;
}
`

export default function FavoritesDetailsSection(){
    return (
        <Container>
            <Content>
                <KeyValuePair>
                    <Key>favorites</Key>
                    <Value>23</Value>
                    <Value>
                        <Link style={{color:"#00C2FF",fontWeight:"600",fontSize:"clamp(.6rem,2vw,.9rem)"}}>
                            view all ->
                        </Link>
                    </Value>
                </KeyValuePair>
                <KeyValuePair>
                    <Key>last edited at</Key>
                    <Value>23-2-2024</Value>
                </KeyValuePair>
                <div style={{margin:"0 0 5px 0"}}>
                    <Key style={{margin:"0 0 5px 0"}}>Interactions</Key>
                    <div style={{margin:"0 0 0 1rem",display:"flex",flexDirection:"column",gap:'5px'}}>
                        <KeyValuePair>
                            <Key>views</Key>
                            <Value>342</Value>
                            <Value>(4 last week)</Value>
                        </KeyValuePair>
                        <KeyValuePair>
                            <Key>likes</Key>
                            <Value>322</Value>
                            <Value>(2 last week)</Value>
                        </KeyValuePair>
                    </div>
                </div>
                <div>
                    <Value>
                        <Share/>
                    </Value>
                </div>
            </Content>
        </Container>
    )
}