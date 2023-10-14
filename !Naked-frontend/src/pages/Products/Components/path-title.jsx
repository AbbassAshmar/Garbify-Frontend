import styled from "styled-components"

const Container = styled.div`
font-weight:600;
// font-size:1.5rem;
// @media screen and (max-width:800px){
//     font-size:1.1rem;
// }
font-size:clamp(1.2rem,3vw,1.5rem);
`

export default function PathTitle({title, number}){
    return (
        <Container>
            {   title.split(" ").length <=1 ?
                `All ${title} products (${number}) `:
                `All ${title} (${number}) `
            }
        </Container>
    )
}