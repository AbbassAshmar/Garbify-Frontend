import { useState } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"
const Container = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
padding:1rem;

`

const Content = styled.div`
width:min(550px, 100%);
display:flex;
flex-direction:column;
gap:3rem;
margin-top:2rem;

`

const Text = styled.div`
text-align:left;
`
const Title =styled.h2`
font-size:2rem;
font-weight:600;
margin: 0 0 1rem 0;
`
const Parg =styled.p`
margin:0;
font-size:1.2rem;
font-weight:500;

`

const Form = styled.form`
display:flex;
flex-direction:column;
gap:2.8rem;
width:100%;
`
const InputWrapper = styled.div`
width:100%;
position:relative;
`
const Input = styled.input`
width:100%;
border-radius:10px;
height:min(10vh, 60px);
border:1px solid ${({color})=>color};
outline:none;
padding:1rem;
font-size:1.1em;
`
const Label =styled.label`
position:absolute;

top:${({position})=>position?'-17%':"30%"};
left:${({position})=>position?'2%':"4%"};
font-size:${({position})=>position?'.9em':"1.2em"};

opacity:1;
z-index:3;
font-weight:600;
color:${({color})=>color};
background:white;
transition:all .3s;
    ${Input}:focus + &{
        top:-17%;
        left:2%;
        font-size:.9em;
    }
`
const ErrorMsg = styled.p`
margin:0;
color:red;
transform:translateY(40%);
font-weight:600;
font-size:.8em;
position:absolute;
`
const Submit = styled.button`
height:min(10vh, 60px);
width:100%;
border-radius:10px;
border:none;
outline:none;
background:#00C2FF;
font-weight:600;
font-size:1.2rem;
cursor:pointer;
transition:background .3s;
    &:hover{
        background:#02abed;
    }
`
const SignInText  = styled.div`
`
const SignIn = styled(Link)`
margin-left:.4rem;
text-decoration:none;
color:#00C2FF;
transition:all .3s;
&:hover{
    font-weight:600;
    color:#02abed;
}
`
const I = styled.i`
font-size:.7em;
`
export default function Registration(){
    const [formData, setFormData] = useState({
        email:"",
        username:"",
        password:"",
        confirm_password:"",
    })
    const [errorMsg, setErrorMsg] = useState({})

    async function requestRegister (formData){
        console.log(formData)
        const request = await fetch("http://127.0.0.1:8000/api/register",{
            method:"POST",
            body:formData,
            headers:{
                "Content-Type":"application/json",
            }
        })
        console.log(request)
        const response = await request.json();
        console.log(response)
        if (request.status == 200){
            
        }
        if (request.status == 400){
            setErrorMsg(response)
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
                            color={errorMsg && errorMsg.error == "email"?"red":"balck"} 
                            onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        />
                        <Label 
                            position={formData.email}
                            color={errorMsg && errorMsg.error == "email"?"red":"grey"} 
                        >Email</Label>
                        {errorMsg && errorMsg.error == "email" ?<ErrorMsg>{errorMsg.msg}</ErrorMsg>:null}

                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                            type="text" 
                            value={formData.username} 
                            color={errorMsg && errorMsg.error == "username"?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,username:e.target.value})}
                        />
                        <Label 
                            color={errorMsg && errorMsg.error == "username"?"red":"grey"} 
                            position={formData.username}
                        >Usename</Label>
                        {errorMsg && errorMsg.error == "username" ?<ErrorMsg>{errorMsg.msg}</ErrorMsg>:null}
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                            type="password"
                            value={formData.password} 
                            color={errorMsg && (errorMsg.error == "password"||errorMsg.error == "passwordConfirm")?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        />
                        <Label 
                            position={formData.password}
                            color={errorMsg && (errorMsg.error == "password"||errorMsg.error == "passwordConfirm")?"red":"gey"} 
                        >Passowrd</Label>
                        {errorMsg && errorMsg.error == "password" ?<ErrorMsg>{errorMsg.msg}</ErrorMsg>:null}
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                            type="password" 
                            value={formData.confirm_password} 
                            color={errorMsg && (errorMsg.error == "confirm_password"||errorMsg.error == "passwordConfirm")?"red":"black"} 
                            onChange={(e)=>setFormData({...formData,confirm_password:e.target.value})}
                        />
                        <Label 
                            position={formData.confirm_password}
                            color={errorMsg && (errorMsg.error == "confirm_password"||errorMsg.error == "passwordConfirm")?"red":"grey"} 
                        >Confirm Password</Label>
                        {errorMsg && (errorMsg.error == "confirm_password" || errorMsg.error == "passwordConfirm" ) ?<ErrorMsg>{errorMsg.msg}</ErrorMsg>:null}
                    </InputWrapper>
                    <SignInText>
                        Already have an account?   
                        <SignIn to="#">
                            Sign in <I className="fa-solid fa-greater-than"/>
                        </SignIn>
                    </SignInText>
                    <Submit type="submit">Submit</Submit>
                </Form>
            </Content>
        </Container>
    )
}