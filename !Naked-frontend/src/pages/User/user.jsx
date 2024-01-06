import styled from "styled-components"
import Hoody from "../../assets/Hoody.jpg"
import { useEffect, useState } from "react"
import UserProfileSection from "./components/user-profile-section"
import UserInformationSection from "./components/user-information-section"
import {PRODUCTS} from "../../components/products-data";
import ProductsSlider from "../../components/ProductsSlider/products-slider"
import FavoritesDetailsSection from "./components/favorites-details-section"
import useUserState from "../../hooks/use-user-state"
import { useNavigate } from "react-router-dom"

const Container  = styled.div`
min-height:100vh;

`
const Section1 = styled.div`
display:flex;
gap:3rem;
@media screen and (max-width:800px){
    flex-direction:column;
    align-items:center;
}
@media screen and (max-width:600px){
    width:100%;
}
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
@media screen and (max-width:600px){
    width:100%;
}

`
const Navigation = styled.div`
display:flex;
gap:50px;
border-bottom:2px solid rgba(128, 128, 128,.4);
height:min(35px,max(5vw,24px));

@media screen and (max-width:800px){
    gap:10px;
    justify-content:space-between;
}

`
const NavigationText = styled.p`
font-size:clamp(.8rem, 2.6vw, 1.1rem);
font-weight:600;
height:min(35px,max(5vw,24px));
text-wrap:nowrap;
color : ${({selected})=>selected ? "#00C2FF" : 'black'};
border-bottom: 2px solid ${({selected})=>selected?"#00C2FF":"none"};
cursor : pointer;
transition: border .3s, color .3s;
&:hover{
    color: ${({selected})=>selected ? "#00C2FF" : "black"};
}
`
const Content = styled.div`
min-width:30vw;
min-height:230px;
@media screen and (max-width:800px){
    min-width:65vw;
}
@media screen and (max-width:600px){
    width:100%;
}
`
const Section2 = styled.div`
width:100%;
overflow:hidden;
`
export default function User(){
    const userContext = useUserState();
    const [currentSection ,setCurrentSection] = useState("User profile");
    const navigate = useNavigate();

    useEffect(()=>{
        if (!userContext.token){
            navigate("/login");
        }
    },[])

    return (
        <Container>
            <div style={{padding:"min(2rem, 4%)",gap:'2rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Section1>
                <ProfilePicContainer>
                    <ProfilePic src={userContext.user?.pfp} />
                </ProfilePicContainer>
                <ContentContainer>
                    <Navigation>
                        <NavigationText onClick={()=>setCurrentSection("User profile")} selected={currentSection === "User profile" }>User profile</NavigationText>
                        <NavigationText onClick={()=>setCurrentSection("Your information")} selected={currentSection === "Your information"}>Your information</NavigationText>
                        <NavigationText onClick={()=>setCurrentSection("Favorites")} selected={currentSection === "Favorites"}>Favorites</NavigationText>
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
                        {
                            currentSection === "Favorites" &&
                            <FavoritesDetailsSection />
                        }
                    </Content>
                </ContentContainer>
            </Section1>
            <Section2>
                <ProductsSlider products={PRODUCTS}/>
            </Section2>
            </div>
        </Container>
    )
}