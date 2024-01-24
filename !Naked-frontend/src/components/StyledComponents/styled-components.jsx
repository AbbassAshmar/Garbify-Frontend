import styled from "styled-components"


export const SliderTitle = styled.h2`
font-size:clamp(1rem, 2.6vw, 1.3rem);
font-weight:600;
`

export const Products = styled.div`
display:grid;
grid-template-columns:repeat(3,1fr);
justify-content:space-between;
grid-gap:20px;

@media screen and (max-width:1000px){
    grid-template-columns:repeat(2,1fr);
}

@media screen and (max-width:800px){
    grid-gap: 40px 20px;
}
`

export const Content = styled.div`
width:100%;
max-width:1500px;
padding: min(2rem ,4%);
margin:auto;
display:flex;
gap: min(7vh,40px);
flex-direction:column;
font-size:1.1rem;
font-weight:400;

@media screen and (max-width:800px){
    width:100%;
}
`


export const Header = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:min(7vh,40px);
`