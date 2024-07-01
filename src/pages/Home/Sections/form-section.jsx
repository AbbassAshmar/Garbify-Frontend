import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
align-items:center;
justify-content:center;
padding:0 1rem;
margin-bottom:8rem;
`
const Text = styled.h2`
font-size:var(--heading-5);
font-weight:800;
text-align:center;
`
const InputContainer = styled.form`
display:flex;
width:50%;
display:flex;
justify-content:center;
gap:2rem;
@media screen and (max-width:800px){
    width:100%;
}
`
const Input = styled.input`
width:100%;
border:2px solid #00C2FF;
outline:none;
padding :.5rem 1rem;
color:black;
border-radius:20px;
font-size:var(--body);
font-weight:600;
`

const Submit = styled.button`
background:var(--main-color);
width:30%;
max-width:110px;
padding:.5rem 1rem;
color:black;
font-weight:800;
border:none;
cursor:pointer;
transition:opacity .3s;
border-radius:20px;
font-size:var(--body);
&:hover{
    background:#009BCC;
}
@media screen and (max-width:340px){
    font-size:.8em;
    padding:0 0;
}

`
const text = "Sign up for exclusive offers and stay up to date"

export default function FormSection(){
    const [formData, setFormData] =useState("")
    const Navigate= useNavigate()

    function handleFormSubmit(e){
        e.preventDefault();
        Navigate("/register", {state:formData})
    }

    return (
        <Container>
            <Text>
                {text}
            </Text>
            <InputContainer onSubmit={handleFormSubmit}>
                <Input 
                    value = {formData}
                    type="email" 
                    placeholder="Your Email"
                    onChange={(e)=>{setFormData(e.currentTarget.value)}}
                />
                <Submit>Sign Up</Submit>
            </InputContainer>
        
        </Container>
    )
}