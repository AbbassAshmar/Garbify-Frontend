import { useState } from "react";
import styled from "styled-components";
import { Input, InputWrapper, Label } from "../../Registration/registration";

const Container = styled.div`
// width:350px;
`
const Content = styled.div`

`
const Profile= styled.div`
display:flex;
flex-direction:column;
gap:25px;
`
const Fields = styled.div`
display:flex;
flex-direction:column;
gap:20px;
`
const FieldContainer = styled.div`
display:flex;
flex-direction:column;
gap:5px;
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
const EditProfile = styled.button`
background :  #00C2FF;
cursor :pointer;
border:none;
outline:none;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
padding: 10px 20px;
border-radius:7px;
transition:background .3s;
&:hover{
    background:#009BCC;
}
`
const ChangePassword = styled.p`
margin-bottom:14px;
cursor:pointer;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
transition:color .3s;
&:hover{
    color:#A8AAAE;
}
`
const Form = styled.form`

`
const InputsContainer = styled.div`
display:flex;
flex-direction:column;
gap:15px;
margin-bottom:20px;
`
const PassInputsContainer = styled(InputsContainer)`
margin-bottom:${({margin})=>margin};
max-height:${({maxHeight})=>maxHeight};
min-width:100%;
transition:max-height .3s,margin-bottom .3s;
overflow:hidden;
`
const ButtonsContainer = styled.div`
display :flex;
gap:10px;
width:100%;
`
const CancelButton =styled.button`
flex:1;
color: #00C2FF;
background:white;
cursor:pointer;
border:2px dashed #00C2FF;
outline:none;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
padding: 10px 30px;
border-radius:7px;
transition:border .3s, color .3s;
&:hover{
    border:2px solid #009BCC;
    color : #009BCC;
}
`
const SaveButton =styled.button`
background :  #00C2FF;
cursor:pointer;
border:none;
outline:none;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
padding: 10px 30px;
border-radius:7px;
transition:background .3s;
&:hover{
    background:#009BCC;
}
flex:1;
`
const DeleteAccount = styled.button`
border:solid 1px red;
color:red;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
border-radius:20px;
background:white;
padding:5px 10px;
cursor:pointer;

&:hover{
    background:rgba(255,0,0,.2);
}
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
                        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
                            <FieldLabel>Delete account</FieldLabel>
                            <DeleteAccount>Delete</DeleteAccount>
                        </div>
                    </Fields>
                    <EditProfile onClick={()=>setCurrentSection("Form")}>
                        <i className="fa-solid fa-pen"/> Edit profile
                    </EditProfile>
                </Profile>
            }
            {
                currentSection === "Form" &&
                <Form>
                    <div style={{display:"flex", flexDirection:"column"}}>
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
                        <ChangePassword onClick={()=>setShowPasswordInputs(!showPasswordInputs)}>
                            Change password <i className="fa-solid fa-angle-down"/>
                        </ChangePassword>
                        <PassInputsContainer maxHeight={showPasswordInputs?"40vh" :"0"} margin={showPasswordInputs?"2rem":"0"}>
                            <InputWrapper style={{margin:"6px 0 0 0"}}>
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
                        <ButtonsContainer>
                            <SaveButton>Save</SaveButton>
                            <CancelButton>Cancel</CancelButton>
                        </ButtonsContainer>
                    </div>
                </Form>
            }
            </Content>
        </Container>
    )
}