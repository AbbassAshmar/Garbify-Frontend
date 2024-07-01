import { useState } from "react";
import styled from "styled-components";
import UpdateUserProfileForm from "./update-user-profile-form";
import { useFetchData, useSendRequest } from "../../../hooks/use-fetch-data";
import useUserState from "../../../hooks/use-user-state";
import Loading from "../../../components/Loading/loading";
import SuccessOrErrorPopUp from "../../../components/SuccessOrErrorPopUp/success-or-error-pop-up";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
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
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const FieldValue = styled.p`
margin:0;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
color:grey;
`
const EditProfile = styled.button`
background :  #00C2FF;
cursor :pointer;
border:none;
outline:none;
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
padding: 10px 20px;
border-radius:7px;
transition:background .3s;
&:hover{
    background:#009BCC;
}
`

const DeleteAccount = styled.button`
border:solid 1px ${({loading})=>loading?'grey':'red'};
color:red;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
border-radius:20px;
background:${({loading})=>loading?'#F1F4F9':'white'};
cursor:pointer;
height :25px;
display:flex;
width:17%;
min-width:60px;
align-items:center;
justify-content:center;
&:hover{
    background:${({loading})=>loading?'#F1F4F9':'rgba(255,0,0,.2)'};
}
@media screen and (max-width:600px){
    height:18px
}
`

const USER = {
    id : 1,
    email : 'KuwaitIsMine@gmail.com',
    name : 'Saddam Hussein'
}

function DeleteAccountButton (){
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);
    const [buttonLoading,setButtonLoading] = useState(false)

    const navigate = useNavigate();

    async function handleDeleteAccountClick (){
        setButtonLoading(true)
        const init = {method:'DELETE'}
        const {request,response} = await sendRequest('/users/user', init);

        if (request?.status == 200){
            // account deleted
            userContext.setToken(null)
            userContext.setUser(null)
            navigate('/products')
        }

        setButtonLoading(false)
    }

    return (
        <>
            <SuccessOrErrorPopUp serverError={serverError} />
            <DeleteAccount 
            loading={buttonLoading}
            disabled={buttonLoading || ""} 
            onClick={handleDeleteAccountClick}>
                {buttonLoading && <Loading style={{transform:'scale(.1)'}} /> }
                {!buttonLoading && 'Delete' }
            </DeleteAccount>
        </>
    )
}

export default function UserProfileSection(){
    const [currentSection, setCurrentSection] = useState("Profile");

    const userContext = useUserState();
    const {data,loading,error}  = useFetchData('/users/user',[],userContext)
    let user = data?.data || USER

    if (loading) {
        return <Loading />
    }

    return (
        <Container>
            <Content>
            {
                currentSection === "Profile" &&
                <Profile>
                    <Fields>
                        <FieldContainer>
                            <FieldLabel>Name</FieldLabel>
                            <FieldValue>{userContext.user?.name}</FieldValue>
                        </FieldContainer>
                        <FieldContainer>
                            <FieldLabel>Email</FieldLabel>
                            <FieldValue>{userContext.user?.email}</FieldValue>
                        </FieldContainer>
                        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
                            <FieldLabel>Delete account</FieldLabel>
                            <DeleteAccountButton />
                        </div>
                    </Fields>
                    <EditProfile onClick={()=>setCurrentSection("Form")}>
                        <i className="fa-solid fa-pen"/> Edit profile
                    </EditProfile>
                </Profile>
            }
            {
                currentSection === "Form" &&
                <UpdateUserProfileForm setCurrentSection={setCurrentSection} />
            }
            </Content>
        </Container>
    )
}