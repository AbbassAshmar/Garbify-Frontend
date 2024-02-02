import styled from "styled-components";
import OverlayErrorPortal from "./overlay-error-portal";
import RecommendationsErrorPage from "./recommendations-error-page";
import { useEffect } from "react";

const Container = styled.div`
height:300vh;
`
export default function Error(){
    useEffect(()=>{
        
    },[])

    return (
        <Container>
            <OverlayErrorPortal />
            <RecommendationsErrorPage />
         </Container>
    )
}