import styled from "styled-components"

const Container = styled.div`
font-weight:600;

font-size: clamp(.9rem, 2.6vw, 1.3rem);
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