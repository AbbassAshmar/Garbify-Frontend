import { useState } from "react";
import styled from "styled-components";
import UpdateUserProfileForm from "./update-user-profile-form";

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
color:grey;
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
                <UpdateUserProfileForm />
            }
            </Content>
        </Container>
    )
}