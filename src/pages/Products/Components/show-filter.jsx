import { useState } from "react"
import styled from "styled-components"

const Button = styled.button`
background:none;
cursor:pointer;
border:none;
line-height:1;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
display:flex;
align-items:center;
justify-content:center;
gap:5px;
&:hover{
    opacity:.7;
}
@media screen and (max-width:800px){
    border:1px solid #C0C3C7;
    padding: .2rem .7rem 0.1rem .7rem;    height:100%;
    width:100%;
    border-radius:10px;
}
`

const Icon = styled.i`
font-size:clamp(.6rem,2vw,.9rem);
`

export default function ShowFilter(props){
    function handleButtonClick(){
        props.setShow(!props.show)
    }

    return (
        <div>
            <Button onClick={handleButtonClick}>
                <p style={{margin:'0',}}>
                    {
                        window.innerWidth >800 ?
                        (props.show? "Close Filter" : "Show Filter" ):
                        'filters'
                    }
                </p>
                <Icon className="fa-solid fa-sliders"/>
            </Button>
        </div>
    )
}