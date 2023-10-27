import styled from "styled-components"
import logo from "../assets/logo.png"

const Logoo = styled.img`
width:120px;
cursor:pointer;
margin:0;
@media screen and (max-width:800px){
    width:100px;
    display:${({off})=>off?"none":"inline-block"};
}
@media screen and (max-width:400px){
    width:90px;
}
`

export default function Logo({style,hide_for_mobile=false}){
    return (
        <Logoo src={logo} style={style} off={hide_for_mobile}/>
    )
}