import styled from "styled-components"

const Container = styled.div`
font-size:1.5em;
font-weight:600;
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