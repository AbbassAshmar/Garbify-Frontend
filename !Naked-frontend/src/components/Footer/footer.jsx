import styled from "styled-components"
import Logo from "../Logo"
import LinkedInLogo from "../../assets/LinkedInLogo.png"
import GithubLogo from "../../assets/GithubLogo.png"
import InstagramLogo from "../../assets/InstagramLogo.png"
import {Link} from "react-router-dom"
const Container = styled.div`
background :black;
width:100%;

display:flex;
justify-content:center;
aling-items:center;
`


const Content = styled.div`
width:87%;
display:flex;
flex-direction:column;
gap:15vh;
`
const TopContainer = styled.div`
margin:3rem 0 0 0 ;
padding:0 0 3rem 0;
width:100%;
border-bottom:2px solid grey;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
`


const LinksContainer = styled.div`
width:100%;

display:flex;
gap:10%;
flex-wrap:wrap;
margin: 0 0 3rem 0;
`
const CompanyName = styled.p`
margin: 1rem 0;
color:white;
font-size:18px;
font-weight:bold;
`

const SocialMedia = styled.div`
margin:1rem 0;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;

`

const SMLogo = styled.img`
width:30px;
`

const Column = styled.div`
display:flex;
flex-direction:column;
margin:0 3rem 3rem 0;
gap:1.4rem;
`
const Title =styled.h2`
color:white;
font-weight:400;
font-size:1.1rem;
letter-spacing:3px;
`
const Story =styled.p`
width:200px;
color:white;
font-size:1rem;
line-height:25px;
`
const StyledLink = styled(Link)`
text-decoration:none;
color:white;
opacity:.8;
font-size:.8rem;

&:hover{
    opacity:1;
}
`
export default function Footer(){

    return (
      
        <Container>
            <Content>
                <TopContainer>
                    <Logo style={{margin:"1rem 0"}} />
                    <CompanyName>
                        © 2011 - 2024 NotNaked Inc.
                    </CompanyName>
                    <SocialMedia>
                        <Link >
                        <SMLogo src={LinkedInLogo}/>
                        </Link>
                        <Link>
                        <SMLogo src={GithubLogo} />
                        </Link>
                        <Link>
                        <SMLogo  src={InstagramLogo}/>
                        </Link>
                    </SocialMedia>
                </TopContainer>
                <LinksContainer>
                    <Column>
                       <Title>
                        Our Story
                       </Title>
                       <Story>
                        We started as a small business and sold clothes from home, to become one of the most known and trusted sellers in the region
                       </Story>

                    </Column>
                    <Column>
                        <Title>ABOUT US</Title>
                        <StyledLink>Our Story</StyledLink>
                        <StyledLink>Location</StyledLink>
                        <StyledLink>Blog</StyledLink>
                        <StyledLink>Job Openinigs</StyledLink>
                        <StyledLink>Shipping & Returns</StyledLink>

                    </Column>
                    <Column>
                        <Title>NAVIGATION</Title>
                        <StyledLink>Home Page</StyledLink>
                        <StyledLink>User Page</StyledLink>
                        <StyledLink>Shop</StyledLink>
                    </Column>
                </LinksContainer>

            </Content>


        </Container>
     
    )
}