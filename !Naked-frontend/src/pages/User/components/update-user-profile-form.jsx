import { useState } from "react"
import styled from "styled-components"
import { PasswordRules } from "../../Registration/registration";
import { useSendRequest } from "../../../hooks/use-fetch-data";
import useUserState from "../../../hooks/use-user-state";
import useRenderInputField from "../../../hooks/user-render-input-field";

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
padding-top:${({$paddingTop})=>$paddingTop};
margin-bottom:${({$margin})=>$margin};
max-height:${({$maxHeight})=>$maxHeight};
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

    const inputField = useRenderInputField(error,formData,setFormData);


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
    
    return(
        <Form onSubmit={handleFormSubmit}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <InputsContainer>
                    {inputField('name','text')}
                    {inputField('email','email')}
                </InputsContainer>

                <ChangePassword onClick={()=>setShowPasswordInputs(!showPasswordInputs)}>
                    Change password <i className="fa-solid fa-angle-down"/>
                </ChangePassword>

                <PassInputsContainer 
                $paddingTop={showPasswordInputs?".3rem" :"0"} 
                $maxHeight={showPasswordInputs?"50vh" :"0"} 
                $margin={showPasswordInputs?"2rem":"0"}>
                    {inputField('old_password','password')}

                    <div>
                        {inputField("password",'password')}
                        <PasswordRules color={error.message.password==="The password field format is invalid."?"red":"black"}>
                            - At least one uppercase letter<br/>
                            - At least one digit (0-9)<br/>
                            Example: SecureP@ssw0rd'
                        </PasswordRules>  
                    </div>

                    {inputField("confirm_password",'password')}
                </PassInputsContainer>
                <ButtonsContainer>
                    <SaveButton>Save</SaveButton>   
                    <CancelButton type="button" onClick={handleCancelButtonClick}>Cancel</CancelButton>
                </ButtonsContainer>
            </div>
        </Form>
    )
}