import { useEffect, useState } from "react";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom"

export const Container = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
padding:1rem;
`

export const Content = styled.div`
width:min(550px, 100%);
display:flex;
flex-direction:column;
gap:3rem;
margin-top:2rem;

`

export const Text = styled.div`
text-align:left;
`
export const Title =styled.h2`
font-weight:600;
margin: 0 0 1rem 0;

font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}
`
const Parg =styled.p`
margin:0;
font-weight:600;
opacity:.7;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}

`

export const Form = styled.form`
display:flex;
flex-direction:column;
gap:2.8rem;
width:100%;
`
export const InputWrapper = styled.div`
width:100%;
position:relative;
`
export const Input = styled.input`
width:100%;
border-radius:10px;
height:min(10vh, 60px);
border:1px solid ${({color})=>color};
outline:none;
padding:1rem;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}`
export const Label =styled.label`
position:absolute;
top:${({position})=>position?'-17%':"30%"};
left:${({position})=>position?'2%':"4%"};
font-size:${({position})=>position?'.8em':"1rem"};
opacity:1;
z-index:3;
color:${({color})=>color};
background:white;
transition:all .3s;
${Input}:focus + &{
    top:-17%;
    left:2%;
    font-size:.8rem;
}
font-weight:600;

`
export const ErrorMsg = styled.p`
margin:0;
color:red;
transform:translateY(40%);
font-weight:600;
position:absolute;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
export const Submit = styled.button`
height:min(10vh, 60px);
width:100%;
border-radius:10px;
border:none;
outline:none;
background:#00C2FF;
cursor:pointer;
transition:background .3s;
&:hover{
    background:#02abed;
}
font-weight:600;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}


`

export const SignIn = styled(Link)`
margin-left:.4rem;
text-decoration:none;
color:#00C2FF;
transition:all .3s;
&:hover{
    font-weight:600;
    color:#02abed;
}
`
export const I = styled.i`
font-size:.7em;
`
export default function Registration(){
    const location =useLocation()
    const {state} = location

    const [formData, setFormData] = useState({
        email:state?state:"",
        username:"",
        password:"",
        confirm_password:"",
    })
    const [errorMsg, setErrorMsg] = useState({})
    
   

    async function requestRegister (formData){
        const request = await fetch("http://127.0.0.1:8000/api/register",{
            method:"POST",
            body:formData,
            headers:{
                "Content-Type":"application/json",
                "accept":"application/json"
            }
        })
        const response = await request.json();
        if (request.status == 200){
            setErrorMsg({})
        }
        if (request.status == 422){
            console.log(response.errors)
            setErrorMsg(response.errors)
        }
    }
    function handleFormSubmit(e){
        e.preventDefault();
        requestRegister(JSON.stringify(formData));
    }
    return(
        <Container>
            <Content>
                <Text>
                    <Title>
                        Create Account
                    </Title>
                    <Parg>
                        be the first to receive latest offers! 
                    </Parg>
                </Text>
                <Form onSubmit={handleFormSubmit}>
                    <InputWrapper>
                        <Input 
                            type="email" 
                            value={formData.email} 
                            color={errorMsg && errorMsg.email?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        />
                        <Label 
                            position={formData.email}
                            color={errorMsg && errorMsg.email?"red":"grey"} 
                        >Email</Label>
                        <ErrorMsg>{errorMsg.email}</ErrorMsg>
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                            type="text" 
                            value={formData.username} 
                            color={errorMsg && errorMsg.username?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,username:e.target.value})}
                        />
                        <Label 
                            color={errorMsg && errorMsg.username?"red":"grey"} 
                            position={formData.username}
                        >Username</Label>
                        <ErrorMsg>{errorMsg.username}</ErrorMsg>
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                            type="password"
                            value={formData.password} 
                            color={errorMsg && errorMsg.password ?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        />
                        <Label 
                            position={formData.password}
                            color={errorMsg && errorMsg.password?"red":"grey"} 
                        >Password</Label>
                        <ErrorMsg>{errorMsg.password}</ErrorMsg>
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                            type="password" 
                            value={formData.confirm_password} 
                            color={errorMsg && errorMsg.confirm_password?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,confirm_password:e.target.value})}
                        />
                        <Label 
                            position={formData.confirm_password}
                            color={errorMsg && errorMsg.confirm_password?"red":"grey"} 
                        >Confirm Password</Label>
                        <ErrorMsg>{errorMsg.confirm_password}</ErrorMsg>
                    </InputWrapper>
                    <div style={{fontWeight:"600"}}>
                        Already have an account?   
                        <SignIn to="/login">
                            Sign in <I className="fa-solid fa-greater-than"/>
                        </SignIn>
                    </div>
                    <Submit type="submit">Submit</Submit>
                </Form>
            </Content>
        </Container>
    )
}