import { useState } from "react"
import styled from "styled-components"

const Button = styled.button`
background:none;
border:none;
cursor:pointer;
&:hover{
    opacity:.7;
}

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

const Icon = styled.i`
margin-left:.7rem;
font-size:clamp(.6rem,2vw,.9rem);
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