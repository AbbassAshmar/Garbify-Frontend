import styled from "styled-components"
import { Container,Content,Text, Title, Form, InputWrapper,Input,Label,ErrorMsg,Submit,SignIn,I} from "../Registration/registration"
import { useState } from "react"


export default function Login(){
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })

    const [errorMsg, setErrorMsg] = useState({})


    async function requestLogin (formData){
        const request = await fetch("http://127.0.0.1:8000/api/login",{
            method:"POST",
            body:formData,
            headers:{
                "Content-Type":"application/json",
                "accept":"application/json"
            }
        })
        const response = await request.json();
        console.log(response)
        if (request.status == 200){
            //pass for now
        }
        if (request.status==422){
            setErrorMsg(response.errors)
            console.log(response.errors)
        }
    }
    function handleFormSubmit(e){
        e.preventDefault();
        console.log("submit")
        requestLogin(JSON.stringify(formData));
    }



    return (
    <Container>
        <Content>
            <Text>
                <Title>
                    Sign In 
                </Title>
            </Text>
            <Form onSubmit={handleFormSubmit}>
                <InputWrapper>
                    <Input 
                        type="email" 
                        value={formData.email} 
                        color={errorMsg &&( errorMsg.email || errorMsg.emailPassword)?"red":"black"} 
                        onChange={(e)=>setFormData({...formData,email:e.target.value})}
                    />
                    <Label 
                        position={formData.email}
                        color={errorMsg  &&( errorMsg.email || errorMsg.emailPassword)?"red":"grey"} 
                    >Email</Label>
                    <ErrorMsg>{errorMsg.email}</ErrorMsg>
                </InputWrapper>
                <InputWrapper>
                    <Input
                        type="password"
                        value={formData.password} 
                        color={errorMsg && (errorMsg.password||errorMsg.emailPassword)?"red":"black"} 
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                    />
                    <Label 
                        position={formData.password}
                        color={errorMsg && (errorMsg.password||errorMsg.emailPassword)?"red":"grey"} 
                    >Password</Label>
                    <ErrorMsg>{errorMsg.password}</ErrorMsg>
                </InputWrapper>
                <div>
                    Don't have an account?   
                    <SignIn to="#">
                        Create One <I className="fa-solid fa-greater-than"/>
                    </SignIn>
                </div>
                <Submit type="submit">Sign In</Submit>
            </Form>
        </Content>
    </Container>
    )
}