import styled from "styled-components"
import logo from "../assets/logo.png"

const Logoo = styled.img`
width:120px;
cursor:pointer;
margin:0;
`
export default function Logo({style}){
    return (
        <Logoo src={logo} style={style}/>
    )
}