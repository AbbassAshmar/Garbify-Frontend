import { Container,Content,Text, Title, Form,Submit,SignIn,I} from "../Registration/registration"
import { useEffect, useState } from "react"
import useUserState from "../../hooks/use-user-state"
import { useNavigate } from "react-router-dom";
import useRenderInputField from "../../hooks/user-render-input-field";
import { useSendRequest } from "../../hooks/use-fetch-data";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";

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
    <Container>
        <SuccessOrErrorPopUp serverError={serverError} />
        <Content>
            <Text>
                <Title>Sign In</Title>
                <p style={{fontWeight:"600",opacity:".7"}}>Be the first to receive our latest offers !</p>
            </Text>
            <Form onSubmit={handleFormSubmit}>
                {inputField('email','email')}
                {inputField('password','password')}

                <div style={{fontWeight:"600"}}>
                    Don't have an account?   
                    <SignIn to="/register">
                        Create One <I className="fa-solid fa-greater-than"/>
                    </SignIn>
                </div>

                <Submit type="submit">Sign In</Submit>
            </Form>
        </Content>
    </Container>
    )
}