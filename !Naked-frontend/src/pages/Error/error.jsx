import styled from "styled-components";
import OverlayErrorPortal from "./overlay-error-portal";
import RecommendationsErrorPage from "./recommendations-error-page";

const Container = styled.div`
height:500vh;
`

export default function Error(){
    return (
        <Container>
            <OverlayErrorPortal />
            <RecommendationsErrorPage />
         </Container>
    )
}