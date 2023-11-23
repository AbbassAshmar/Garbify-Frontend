import { useEffect, useState } from "react";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom"
import registerBg from "../../assets/registerBg2.jpg"
import Logo from "../../components/Logo";
import Footer from "../../components/Footer/footer"

export const Container = styled.div`
width:100%;
display:flex;
padding-bottom:2rem;
flex-direction:column;
align-items:center;
justify-content:center;
background:url(${registerBg});
background-position:bottom;
background-size:cover;
min-height:100vh;
position:relative;
overflow:hidden;
z-index:0;
&:before {
    content:" ";
    width:100%;
    height:130%;
    background:black;
    position:absolute;
    z-index:-1;
    opacity:.4;
}
`
const ContentContainer = styled.div`
width:100%;
height:100%;
gap:15px;
display:flex;
align-items:start;
justify-content:space-between;
@media screen and (max-width:1000px){
    justify-content:center
}
`
export const Content = styled.div`
height:90%;
flex:1.5;
width:100%;
max-width:480px;
border-radius:5px;
background:white;
padding:min(2rem ,4%);
display:flex;
flex-direction:column;
gap:30px;
box-shadow:0px 0px 20px rgba(0,0,0,.7);

`
export const Text = styled.div`
text-align:left;
display:flex;
flex-direction:column;
gap:10px;
`
export const Title =styled.h2`
font-weight:600;
font-size:clamp(1.1rem, 3vw, 1.5rem);
`
const Parg =styled.p`
margin:0;
font-weight:600;
opacity:.7;

font-size: clamp(.8rem , 2.3vw ,1.1rem);

`

export const Form = styled.form`
display:flex;
flex-direction:column;
gap:30px;
width:100%;
`
export const InputWrapper = styled.div`
width:100%;
position:relative;
`
export const Input = styled.input`
width:100%;
border-radius:5px;
border:2px solid ${({color})=>color};
outline:none;
padding:.7rem 1rem;
font-size: clamp(.8rem , 2.3vw ,1.1rem);
&:focus{
    border:2px solid #00C2FF;
}
`
export const Label =styled.label`
position:absolute;
top:${({position})=>position?'-17%':"30%"};
left:${({position})=>position?'2%':"4%"};
font-size:${({position})=>position?'.8rem':".9rem"};
opacity:1;
z-index:3;
color:${({color})=>color};
background:white;
transition:all .3s;
${Input}:focus + &{
    top:-17%;
    left:2%;
    font-size:.8rem;
    color:#00C2FF;
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
border-radius:5px;
border:none;
outline:none;
background:#00C2FF;
cursor:pointer;
transition:background .3s;
&:hover{
    background:#02abed;
}
font-weight:600;

font-size: clamp(.8rem , 2.3vw ,1.1rem);
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
const TextContainer = styled.div`
flex:2;
display:flex;
flex-direction:column;
gap:15px;
align-self:center;
margin:auto;
@media screen and (max-width:1000px){
    display:none;
}
`
const MainText = styled.p`
margin:0;
color:white;
font-weight:800;
font-size:clamp(1.1rem,3vw,1.9rem);
text-shadow:1px 1px 1px black;
`
const SecondaryText = styled.p`
margin:0;
color:white;
font-weight:600;
font-size:clamp(.9rem, 2.6vw, 1.3rem);
text-shadow:1px 1px 1px black;

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
            setErrorMsg(response.errors)
        }
    }
    function handleFormSubmit(e){
        e.preventDefault();
        requestRegister(JSON.stringify(formData));
    }
    return(
        <div>
        <Container>
            <div style={{padding:"min(2rem ,4%)",width:'100%',display:"flex",flexDirection:"column",gap:'15px'}}>
                <div style={{alignSelf:"flex-start"}}><Logo/></div>
            <ContentContainer>
                <TextContainer>
                    <MainText>Lorem Shit + life is good I love Ghaddafi</MainText>
                    <SecondaryText>
                        i Think a;lskdfj askldf which 
                        implies klajflaj jaklsjf
                        alsjdfljlasj flkjkl ajsldk 
                        jalkdfjalsdfj
                    </SecondaryText>
                </TextContainer>
                <Content>
                    <Text>
                        <Title>Create Account</Title>
                        <Parg>be the first to receive latest offers!</Parg>
                    </Text>
                    <Form onSubmit={handleFormSubmit}>
                        <InputWrapper>
                            <Input 
                                type="email" 
                                value={formData.email} 
                                color={errorMsg && errorMsg.email?"red":"#A8AAAE"} 
                                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                            />
                            <Label 
                                position={formData.email}
                                color={errorMsg && errorMsg.email?"red":"#C0C3C7"} 
                            >Email</Label>
                            <ErrorMsg>{errorMsg.email}</ErrorMsg>
                        </InputWrapper>
                        <InputWrapper>
                            <Input 
                                type="text" 
                                value={formData.username} 
                                color={errorMsg && errorMsg.username?"red":" #A8AAAE"} 
                                onChange={(e)=>setFormData({...formData,username:e.target.value})}
                            />
                            <Label 
                                color={errorMsg && errorMsg.username?"red":"#C0C3C7"} 
                                position={formData.username}
                            >Username</Label>
                            <ErrorMsg>{errorMsg.username}</ErrorMsg>
                        </InputWrapper>
                        <InputWrapper>
                            <Input 
                                type="password"
                                value={formData.password} 
                                color={errorMsg && errorMsg.password ?"red":" #A8AAAE"} 
                                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                            />
                            <Label 
                                position={formData.password}
                                color={errorMsg && errorMsg.password?"red":"#C0C3C7"} 
                            >Password</Label>
                            <ErrorMsg>{errorMsg.password}</ErrorMsg>
                        </InputWrapper>
                        <InputWrapper>
                            <Input 
                                type="password" 
                                value={formData.confirm_password} 
                                color={errorMsg && errorMsg.confirm_password?"red":"#A8AAAE"} 
                                onChange={(e)=>setFormData({...formData,confirm_password:e.target.value})}
                            />
                            <Label 
                                position={formData.confirm_password}
                                color={errorMsg && errorMsg.confirm_password?"red":"#C0C3C7"} 
                            >Confirm Password</Label>
                            <ErrorMsg>{errorMsg.confirm_password}</ErrorMsg>
                        </InputWrapper>
                        <div style={{fontWeight:"600" , fontSize:"clamp(.6rem,2vw,.9rem)"}}>
                            Already have an account?   
                            <SignIn to="/login">
                                Sign in <I className="fa-solid fa-greater-than"/>
                            </SignIn>
                        </div>
                        <Submit type="submit">Register now!</Submit>
                    </Form>
                </Content>
            </ContentContainer>
            </div>
        </Container>
        <Footer/>
        </div>
    )
}