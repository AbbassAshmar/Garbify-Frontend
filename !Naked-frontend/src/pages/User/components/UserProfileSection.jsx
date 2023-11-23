import { useState } from "react";
import styled from "styled-components";
import { Input, InputWrapper, Label } from "../../Registration/registration";

const Container = styled.div`

`
const Content = styled.div`

`
const Profile= styled.div`
display:flex;
flex-direction:column;
gap:20px;
`
const EditProfile = styled.button`
background : blue;
border:none;
outline:none;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
padding: 10px 20px;
border-radius:7px;
`
const Fields = styled.div`
display:flex;
flex-direction:column;
gap:15px;
`
const FieldContainer = styled.div`
display:flex;
flex-direction:column;
gap:3px;
`
const FieldLabel = styled.p`
margin:0;

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const FieldValue = styled.p`
margin:0;

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
const Form = styled.form`

`
const InputsContainer = styled.div`
display:flex;
flex-direction:column;
gap:10px;
`
const PassInputsContainer = styled(InputsContainer)`
max-height :${({maxHeight})=>maxHeight};
overflow:hidden;
transition:max-height .3s;
`
export default function UserProfileSection(){
    const [currentSection, setCurrentSection] = useState("Profile");
    const [errorMsg,setErrorMsg] = useState({name:"",email:"",new_password:"",old_password:"",confirm_password:""});
    const [showPasswordInputs , setShowPasswordInputs] = useState(false)

    return (
        <Container>
            <Content>
            {
                currentSection === "Profile" &&
                <Profile>
                    <Fields>
                        <FieldContainer>
                            <FieldLabel>Name</FieldLabel>
                            <FieldValue>Saddam Hussein</FieldValue>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Email</FieldLabel>
                            <FieldValue>KuwaitIsMine@gmail.com</FieldValue>
                        </FieldContainer>
                    </Fields>
                    <EditProfile onClick={()=>setCurrentSection("Form")}>
                        <i className="fa-solid fa-pen"/> Edit profile
                    </EditProfile>
                </Profile>
            }
            {
                currentSection === "Form" &&
                <Form>
                    <div style={{display:"flex", flexDirection:"column",gap:"20px"}}>
                        <InputsContainer>
                            <InputWrapper>
                                <Input color={errorMsg && errorMsg.confirm_password?"red":"#A8AAAE"} />
                                <Label color={errorMsg && errorMsg.confirm_password?"red":"#C0C3C7"} >Name</Label>
                            </InputWrapper> 
                            <InputWrapper>
                                <Input color={errorMsg && errorMsg.confirm_password?"red":"#A8AAAE"} />
                                <Label color={errorMsg && errorMsg.confirm_password?"red":"#C0C3C7"} >email</Label>
                            </InputWrapper> 
                        </InputsContainer>
                        <p onClick={()=>setShowPasswordInputs(!showPasswordInputs)}>Change password</p>
                        <PassInputsContainer maxHeight={showPasswordInputs?"50vh" :"0"}>
                            <InputWrapper>
                                <Input color={errorMsg && errorMsg.confirm_password?"red":"#A8AAAE"} />
                                <Label color={errorMsg && errorMsg.confirm_password?"red":"#C0C3C7"} >old password</Label>
                            </InputWrapper> 
                            <InputWrapper>
                                <Input color={errorMsg && errorMsg.confirm_password?"red":"#A8AAAE"} />
                                <Label color={errorMsg && errorMsg.confirm_password?"red":"#C0C3C7"} >new password</Label>
                            </InputWrapper> 
                            <InputWrapper>
                                <Input color={errorMsg && errorMsg.confirm_password?"red":"#A8AAAE"} />
                                <Label color={errorMsg && errorMsg.confirm_password?"red":"#C0C3C7"} >confirm password</Label>
                            </InputWrapper> 
                        </PassInputsContainer>
                    </div>
                </Form>
            }
            </Content>
        </Container>
    )
}