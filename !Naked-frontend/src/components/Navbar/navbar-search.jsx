import { Background } from "./category-list"
import styled from "styled-components"
import Logo from "../Logo"

// Parent z-index : 200


const Parent = styled.div`
position:fixed;
z-index:200;
top:0;
left:0;
width:${({width})=> width};
height:100vh;
display:block;
overflow:hidden;
transition:width .3s;
`
const ContentContainer = styled.div`
width:100%;
background:white;
display:flex;
justify-content:center;
`
const Content = styled.div`
margin : 1rem 0 2rem 0 ;
width:90%;
display:flex;
flex-direction:column;
gap:3rem;
`
const SuggestionsSection = styled.div`
width:100%;
height:40vh;
`
const SearchSection = styled.div`
display:flex;
width:100%;
align-items:center;
justify-content:space-between;
`
const SearchInputContainer = styled.div`
width:50%;
position:relative;
height:6vh;
`
const SearchIcon = styled.i`
z-index:2;
position:absolute;
top:25%;
left:3%;

font-size:1rem;
@media screen and (max-width:1000px){
    font-size:.8rem;
}
`
const SearchInput = styled.input`
width:100%;
height:6vh;
border-radius:30px;
position:absolute;
z-index:1;
padding:0 4% 0 8%;
background:#E4E4E4;
border:none;

font-size:1rem;
@media screen and (max-width:1000px){
    font-size:.8rem;
}
`
const CancelButton = styled.button`
border:none;
background:none;
cursor:pointer;

font-size:1rem;
@media screen and (max-width:1000px){
    font-size:.8rem;
}
`
export default function NavbarSearch({show,setShow}){
    return (
        <Parent width={show?"100%":"0"}>
            <ContentContainer>
                <Content>
                    <SearchSection>
                        <Logo />
                        <SearchInputContainer>
                            <SearchInput />
                            <SearchIcon className="fa-solid fa-magnifying-glass"/>
                        </SearchInputContainer>
                        <CancelButton onClick={()=>{setShow(false)}}>
                            Cancel
                        </CancelButton>
                    </SearchSection>
                    <SuggestionsSection>

                    </SuggestionsSection>
                </Content>
            </ContentContainer>
            <Background />
        </Parent>

    )
}