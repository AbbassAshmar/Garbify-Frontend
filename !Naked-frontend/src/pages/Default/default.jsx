import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import styled from "styled-components"
import { useState } from "react";
const Container = styled.div`
height:${({fix})=>fix?"100vh":"auto"};
overflow:${({fix})=>fix?"hidden":null};
`
export default function Default(){
    const [sideNavbarOpened, setSideNavbarOpened] = useState(false)
    return (
        <>
        <Container fix={sideNavbarOpened}>

            <Navbar setSideNavbarOpened={setSideNavbarOpened}/>
                <Outlet />
            <Footer />

        </Container>

        </>
    )
}