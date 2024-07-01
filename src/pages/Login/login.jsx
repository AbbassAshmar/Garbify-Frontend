import { Container,Content,Text, Title, Form,Submit,SignIn,I} from "../Registration/registration"
import { useEffect, useState } from "react"
import useUserState from "../../hooks/use-user-state"
import { useNavigate } from "react-router-dom";
import useRenderInputField from "../../hooks/user-render-input-field";
import { useSendRequest } from "../../hooks/use-fetch-data";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import Footer from "../../components/Footer/footer";
import styled from "styled-components";
import Logo from "../../components/Logo";
import loginBg from "../../assets/loginBg.jpg"

const LoginContainer = styled(Container)`
background:url(${loginBg});

`

const LoginContent = styled(Content)`
gap:40px;
margin: 4rem 0;

`
const LoginForm = styled(Form)`
gap:40px;

`
export default function Login(){
    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })

    const [error,setError] = useState({
        fields:[] , 
        message:{} 
    })

    const inputField = useRenderInputField(error,setFormData,formData);
    const navigate = useNavigate();

    useEffect(()=>{
        if(userContext.token)
        navigate(-1,{replace:true})
    },[])

    async function requestLogin(formData){
        const {request,response} = await sendRequest('/api/login',{method:"POST",body:formData});
        if (request?.status === 201){
            setError({fields:[], message:[]});
            userContext.setToken(response.data.token);
            userContext.setUser(response.data.user);
            navigate('/products', {replace:true})
        }
      
        else if (request?.status === 400){ // error related to user's input
            setError({fields:response.metadata.error_fields, message : response.error.details})
        }
        
        else {  //error that is not related to user's input
            setError({fields:[], message:[]});
        }
    }

    function handleFormSubmit(e){
        e.preventDefault();
        requestLogin(JSON.stringify(formData));
    }

    
    return (
    <LoginContainer>
        <SuccessOrErrorPopUp serverError={serverError} />
        <div style={{padding:"min(2rem ,4%)",width:'100%',display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center",gap:'15px'}}>
            <div style={{alignSelf:"flex-start"}}><Logo/></div>
            <LoginContent>
                <Text>
                    <Title>Sign In</Title>
                    <p style={{fontWeight:"600",opacity:".7"}}>Be the first to receive our latest offers !</p>
                </Text>
                <LoginForm onSubmit={handleFormSubmit}>
                    <div style={{display:"flex",flexDirection:'column',gap:'20px'}}>
                        {inputField('email','email')}
                        {inputField('password','password')}
                    </div>

                    <div style={{display:"flex",flexDirection:'column',gap:'20px'}}>
                        <div style={{fontWeight:"600"}}>
                            Don't have an account?   
                            <SignIn to="/register">
                                Create One <I className="fa-solid fa-greater-than"/>
                            </SignIn>
                        </div>
                        <Submit type="submit">Sign In</Submit>
                    </div>
                </LoginForm>
            </LoginContent>
        </div>
        <Footer />
    </LoginContainer>
    )
}