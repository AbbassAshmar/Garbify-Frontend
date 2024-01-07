import { useEffect, useState } from "react";
import styled from "styled-components";
import {Link, useLocation, useNavigate} from "react-router-dom"
import registerBg from "../../assets/registerBg2.jpg"
import Logo from "../../components/Logo";
import Footer from "../../components/Footer/footer"
import useUserState from "../../hooks/use-user-state";
import { useSendRequest } from "../../hooks/use-fetch-data";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import useRenderInputField from "../../hooks/user-render-input-field";

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

@media screen and (max-width:600px){
  min-height:0;
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
gap:5px;
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
gap:10px;
width:100%;
// min-height:480px;
`
const FieldAndError = styled.div`
display:flex;
flex-direction:column;
gap:5px;
`

export const PasswordRules = styled.p`
color:${({$color})=>$color};
opacity:.7;
font-weight:500;
font-size: clamp(.65rem,1.8vw,.8rem);
margin-left: 3%;
margin-top:4px;
`

export const Submit = styled.button`
height:60px;
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
@media screen and (max-width:800px){
  height:40px;
}
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
  const userContext = useUserState();
  const {sendRequest, serverError} = useSendRequest(userContext);
  
  const {state} =useLocation()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:state?state:"",
    name:"",
    password:"",
    confirm_password:"",
  })
  
  const [error,setError] = useState({
    fields:[] , 
    message:{} 
  })

  const inputField = useRenderInputField(error,setFormData,formData);

  useEffect(()=>{
    if(userContext.token)
    navigate(-1,{replace:true})
  },[])
   
  async function requestRegister(formData){
    const {response,request} = await sendRequest('/api/register',{method:"POST",body:formData});
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
    requestRegister(JSON.stringify(formData));
  }

  return(
    <div>  
      <SuccessOrErrorPopUp serverError={serverError} />
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

              <FieldAndError>
                {inputField("email",'email')}
              </FieldAndError>

              <FieldAndError>
                {inputField("name",'text')}
              </FieldAndError>

              <div style={{display:'flex',flexDirection:"column",gap:'15px'}}>
                <FieldAndError>
                  {inputField("password",'password')}
                  <PasswordRules $color={error.message.password==="The password field format is invalid."?"red":"black"}>
                      - At least one uppercase letter<br/>
                      - At least one digit (0-9)<br/>
                      Example: SecureP@ssw0rd'
                  </PasswordRules>
                </FieldAndError>

                <FieldAndError>
                  {inputField("confirm_password",'password')}
                </FieldAndError>
              </div>
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