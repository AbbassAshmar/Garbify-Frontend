import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`

`
const Button = styled.button`
font-weight:600;
background:none;
border:none;
font-size:1em;
cursor:pointer;

&:hover{
    opacity:.7;
}
`
const Icon = styled.i`
margin-left:.7rem;
font-size:.8em;
`

export default function ShowFilter(props){
    function handleButtonClick(){
        props.setShow(!props.show)
    }

    return (
        <Container>
            <Button onClick={handleButtonClick}>
                {props.show? "Close Filter" : "Show Filter" }
                <Icon className="fa-solid fa-filter"></Icon>
            </Button>
        </Container>
    )
}