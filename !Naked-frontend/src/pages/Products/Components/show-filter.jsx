import { useState } from "react"
import styled from "styled-components"

const Button = styled.button`
font-weight:600;
background:none;
border:none;
cursor:pointer;
&:hover{
    opacity:.7;
}

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Icon = styled.i`
margin-left:.7rem;


font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`

export default function ShowFilter(props){
    function handleButtonClick(){
        props.setShow(!props.show)
    }

    return (
        <div>
            <Button onClick={handleButtonClick}>
                {props.show? "Close Filter" : "Show Filter" }
                <Icon className="fa-solid fa-filter"></Icon>
            </Button>
        </div>
    )
}