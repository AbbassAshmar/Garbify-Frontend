import styled from "styled-components"

export const Products = styled.div`
display:grid;
grid-template-columns:repeat(3,1fr);
justify-content:space-between;
grid-gap:20px;
@media screen and (max-width:1000px){
    grid-template-columns:repeat(2,1fr);
}
`