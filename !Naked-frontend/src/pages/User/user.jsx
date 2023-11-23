import styled from "styled-components"
import Hoody from "../../assets/Hoody.jpg"
import { useState } from "react"
import UserProfileSection from "./components/UserProfileSection"
import UserInformationSection from "./components/UserInformationSection"

const Container  = styled.div`
min-height:100vh;
display :flex;
flex-direction:column;
align-items:center;
`
const Section1 = styled.div`
padding:min(2rem,4%);
display:flex;
gap:2rem;
`
const ProfilePicContainer = styled.div`

`
const ProfilePic = styled.img`
border-radius:50%;
height:200px;
width:200px;
`
const ContentContainer = styled.div`
display:flex;
flex-direction:column;
gap:20px;
`
const Navigation = styled.div`
display:flex;
gap:20px;
border-bottom:1px solid black;
height:30px;
`
const NavigationText = styled.p`
font-size:clamp(.9rem, 2.6vw, 1.3rem);
font-weight:600;
height:30px;
color : ${({color})=>color};
border-bottom: 1px solid ${({color})=>color};
cursor : pointer;
transition: border .3s, color .3s;
`
const Content = styled.div`

`
export default function User(){
    const [currentSection ,setCurrentSection] = useState("User profile");
    return (
        <Container>
            <Section1>
                <ProfilePicContainer>
                    <ProfilePic src={Hoody} />
                </ProfilePicContainer>
                <ContentContainer>
                    <Navigation>
                        <NavigationText onClick={()=>setCurrentSection("User profile")} color={currentSection === "User profile" ? "#00C2FF":"black"}>User profile</NavigationText>
                        <NavigationText onClick={()=>setCurrentSection("Your information")} color={currentSection === "Your information" ? "#00C2FF":"black"}>Your information</NavigationText>
                    </Navigation>
                    <Content>
                        {
                            currentSection === "User profile" &&
                            <UserProfileSection /> 
                        }
                        {
                            currentSection === "Your information" &&
                            <UserInformationSection /> 
                        }
                    </Content>
                </ContentContainer>
            </Section1>
        </Container>
    )
}