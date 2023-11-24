import styled from "styled-components"
import Hoody from "../../assets/Hoody.jpg"
import { useState } from "react"
import UserProfileSection from "./components/user-profile-section"
import UserInformationSection from "./components/user-information-section"
import {PRODUCTS} from "../../components/products-data";
import ProductsSlider from "../../components/ProductsSlider/products-slider"
import FavoritesDetailsSection from "./components/favorites-details-section"

const Container  = styled.div`
min-height:100vh;

`
const Section1 = styled.div`
padding:min(2rem,4%);
display:flex;
gap:4rem;
@media screen and (max-width:800px){
    flex-direction:column;
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
`
const Navigation = styled.div`
display:flex;
gap:50px;
border-bottom:1px solid black;
height:30px;
`
const NavigationText = styled.p`
font-size:clamp(.8rem , 2.3vw ,1.1rem);
font-weight:600;
height:30px;
color : ${({color})=>color};
border-bottom: 1px solid ${({color})=>color};
cursor : pointer;
transition: border .3s, color .3s;
`
const Content = styled.div`
min-width:400px;
`
const Section2 = styled.div`

`
export default function User(){
    const [currentSection ,setCurrentSection] = useState("User profile");
    return (
        <Container>
            <div style={{padding:"min(2rem, 4%)",gap:'5rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Section1>
                <ProfilePicContainer>
                    <ProfilePic src={Hoody} />
                </ProfilePicContainer>
                <ContentContainer>
                    <Navigation>
                        <NavigationText onClick={()=>setCurrentSection("User profile")} color={currentSection === "User profile" ? "#00C2FF":"black"}>User profile</NavigationText>
                        <NavigationText onClick={()=>setCurrentSection("Your information")} color={currentSection === "Your information" ? "#00C2FF":"black"}>Your information</NavigationText>
                        <NavigationText onClick={()=>setCurrentSection("Favorites")} color={currentSection === "Favorites" ? "#00C2FF":"black"}>Favorites</NavigationText>

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