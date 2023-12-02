import { useEffect, useState } from "react"
import styled from "styled-components"
import { Input, InputWrapper, Label, PasswordRules } from "../../Registration/registration";

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
const ErrorMsg = styled.p`
margin:0;
color:red;
margin-top:4px;
margin-left: 3%;
font-weight:600;
font-size: clamp(.5rem,1.8vw,.8rem);
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

export default function UpdateUserProfileForm(){
    const [showPasswordInputs , setShowPasswordInputs] = useState(false)

    const [error,setError] = useState({
        fields:['name','email','old_password','password'] , 
        message:{password:"Wrong password bitch.",
        old_password:"Wrong fiasodfj asiodfj.",
        confirm_password:"Wroaodjfioaj"
        } 
    })
    useEffect(()=>{console.log(showPasswordInputs)}, [showPasswordInputs])
    return(
        <Form>
            <div style={{display:"flex", flexDirection:"column"}}>
                <InputsContainer>
                    <div>
                        <InputWrapper>
                            <Input color={error.fields && error.fields.includes("name")?"red":"#A8AAAE"} />
                            <Label color={error.fields && error.fields.includes("name")?"red":"#C0C3C7"} >Name</Label>
                        </InputWrapper> 
                        <ErrorMsg>{error.message.name}</ErrorMsg>
                    </div>
                    <div>
                        <InputWrapper>
                            <Input color={error.fields && error.fields.includes("email")?"red":"#A8AAAE"} />
                            <Label color={error.fields && error.fields.includes("email")?"red":"#C0C3C7"} > email</Label>
                        </InputWrapper> 
                        <ErrorMsg>{error.message.email}</ErrorMsg>
                    </div>
                </InputsContainer>
                <ChangePassword onClick={()=>setShowPasswordInputs(!showPasswordInputs)}>
                    Change password <i className="fa-solid fa-angle-down"/>
                </ChangePassword>
                <PassInputsContainer maxHeight={showPasswordInputs?"50vh" :"0"} margin={showPasswordInputs?"2rem":"0"}>
                    <div>
                        <InputWrapper style={{margin:"6px 0 0 0"}}>
                            <Input color={error.fields && error.fields.includes("old_password")?"red":"#A8AAAE"} />
                            <Label color={error.fields && error.fields.includes("old_password")?"red":"#C0C3C7"} >old password</Label>
                        </InputWrapper> 
                        <ErrorMsg>{error.message.old_password}</ErrorMsg>
                    </div>

                    <div>
                        <InputWrapper>
                            <Input color={error.fields && error.fields.includes("password")?"red":"#A8AAAE"} />
                            <Label color={error.fields && error.fields.includes("password")?"red":"#C0C3C7"} >new password</Label>
                        </InputWrapper> 
                        <div style={{display:"flex",flexDirection:"column",gap:'2px'}}>
                            <ErrorMsg>{error.message.password}</ErrorMsg>
                            <PasswordRules color={error.message.password==="The password field format is invalid."?"red":"black"}>
                                - At least one uppercase letter<br/>
                                - At least one digit (0-9)<br/>
                                Example: SecureP@ssw0rd'
                            </PasswordRules>  
                        </div>  
                    </div>

                    <div>
                    <InputWrapper>
                        <Input color={error.fields && error.fields.includes("confirm_password")?"red":"#A8AAAE"} />
                        <Label color={error.fields && error.fields.includes("confirm_password")?"red":"#C0C3C7"} >confirm password</Label>
                    </InputWrapper> 
                    <ErrorMsg>{error.message.confirm_password}</ErrorMsg>
                    </div>
                </PassInputsContainer>
                <ButtonsContainer>
                    <SaveButton>Save</SaveButton>
                    <CancelButton>Cancel</CancelButton>
                </ButtonsContainer>
            </div>
        </Form>
    )
}