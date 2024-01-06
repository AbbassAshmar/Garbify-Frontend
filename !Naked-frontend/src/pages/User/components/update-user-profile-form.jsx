import { useEffect, useState } from "react"
import styled from "styled-components"
import { Input, InputWrapper, Label, PasswordRules } from "../../Registration/registration";
import { useSendRequest } from "../../../hooks/use-fetch-data";
import useUserState from "../../../hooks/use-user-state";

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
font-size: clamp(.65rem,1.8vw,.8rem);
`
const PassInputsContainer = styled(InputsContainer)`
padding-top:${({paddingTop})=>paddingTop};
margin-bottom:${({margin})=>margin};
max-height:${({maxHeight})=>maxHeight};
min-width:100%;
transition:max-height .3s,margin-bottom .3s,padding-top .3s;
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

export default function UpdateUserProfileForm({setCurrentSection}){
    const userContext = useUserState();
    const [showPasswordInputs , setShowPasswordInputs] = useState(false);
    const {sendRequest,serverError} = useSendRequest(userContext);

    const [formData, setFormData] = useState({
        email:"",
        name:"",
        password:"",
        old_password:"",
        confirm_password:"",
    })

    const [error,setError] = useState({
        fields:['password','old_password'] , 
        message:{password:"lkdjfakldjfkls",old_password:""}
    })

    function handleCancelButtonClick(e){
        setCurrentSection('Profile')
    }

    function handleFormSubmit(e){
        e.preventDefault();
        const init = {method:"PATCH",body:formData}
        const uri = '/api/users/user';
        let {request,response} = sendRequest(uri, init);

        if (request?.status == 200){
            let newFields = response?.data.user;
            userContext.setUser({...userContext.user, newFields})
        }
    }

    function renderInput(field,input_type){
        return (
            <div>
                <InputWrapper>
                    <Input 
                        type={input_type}
                        value={formData[field]} 
                        color={error.fields && error.fields.includes(field)?"red":"#A8AAAE"} 
                        onChange={(e)=>setFormData({...formData,[field]:e.target.value})}
                    />
                    <Label 
                    position={formData[field]}
                    color={error.fields && error.fields.includes(field)?"red":"#C0C3C7"}>
                        {`${field.replace("_"," ")}`}
                    </Label>
                </InputWrapper> 
                <ErrorMsg>{error.message.field}</ErrorMsg>
            </div>
        )
    }
    
    return(
        <Form onSubmit={handleFormSubmit}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <InputsContainer>
                    {renderInput("name",'text')}
                    {renderInput("email",'email')}
                </InputsContainer>

                <ChangePassword onClick={()=>setShowPasswordInputs(!showPasswordInputs)}>
                    Change password <i className="fa-solid fa-angle-down"/>
                </ChangePassword>

                <PassInputsContainer 
                paddingTop={showPasswordInputs?".3rem" :"0"} 
                maxHeight={showPasswordInputs?"50vh" :"0"} 
                margin={showPasswordInputs?"2rem":"0"}>
                    {renderInput("old_password",'password')}
                    <div>
                        {renderInput("password",'password')}
                        <PasswordRules color={error.message.password==="The password field format is invalid."?"red":"black"}>
                            - At least one uppercase letter<br/>
                            - At least one digit (0-9)<br/>
                            Example: SecureP@ssw0rd'
                        </PasswordRules>  
                    </div>
                    {renderInput("confirm_password",'password')}
                </PassInputsContainer>
                <ButtonsContainer>
                    <SaveButton>Save</SaveButton>   
                    <CancelButton type="button" onClick={handleCancelButtonClick}>Cancel</CancelButton>
                </ButtonsContainer>
            </div>
        </Form>
    )
}