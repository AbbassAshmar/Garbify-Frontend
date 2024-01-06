import { Container,Content,Text, Title, Form, InputWrapper,Input,Label,ErrorMsg,Submit,SignIn,I} from "../Registration/registration"
import { useEffect, useState } from "react"
import useUserState from "../../hooks/use-user-state"
import { useNavigate } from "react-router-dom";


export default function Login(){
    const {token} = useUserState();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    })

    const [error,setError] = useState({
        fields:[] , 
        message:{} 
    })
    const navigate = useNavigate()

    useEffect(()=>{
        if(token){
            navigate(-1,{replace:true})
        }
    },[])

    // async function requestLogin(formData){
    //     const {response,request} = await sendRequest('/api/login',{method:"POST",body:formData},token);
    //     if (request.ok){
    //         setError({fields:[], message:[]});
    //         setToken(response.data.token);
    //         setUser(response.data.user);
    //     }else{
    //         setError({fields:response?.metadata.error_fields, message : response?.error.details})
    //         setToken(null)
    //     }
    // }

    function handleFormSubmit(e){
        e.preventDefault();
        requestLogin(JSON.stringify(formData));
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
    
    return (
    <Container>
        <Content>
            <Text>
                <Title>Sign In</Title>
                <p style={{fontWeight:"600",opacity:".7"}}>Be the first to receive our latest offers !</p>
            </Text>
            <Form onSubmit={handleFormSubmit}>
                {renderInput('email','email')}
                {renderInput('password','password')}
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