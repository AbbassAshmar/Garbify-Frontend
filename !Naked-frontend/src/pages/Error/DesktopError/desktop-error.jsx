import styled from "styled-components";
import OverlayErrorPortal from "./Components/overlay-error-portal";
import RecommendationsErrorPage from "./Components/recommendations-error-page";
import { useState,useEffect } from "react";

const Container = styled.div`
min-height:300vh;
height:${({$height})=> $height};
`

export default function DesktopError(){
    const [isTransitioning,setIsTransitioning] = useState(true);
    const [pageScale, setPageScale] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
    },[isTransitioning])

    return(
        <Container $height={isTransitioning?"300vh" : "auto"}>
            <OverlayErrorPortal setPageScale={setPageScale} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} />
            <RecommendationsErrorPage pageScale={pageScale} isTransitioning={isTransitioning} />
        </Container>
    )

}