import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import styled from "styled-components"
import { useState } from "react";

const Container = styled.div`
// height:${({$lock})=>$lock.side_nav?"100vh":"auto"};
// overflow:${({$lock})=>$lock.side_nav?"hidden":null};
// height:100vh;
// overflow:hidden;

@media screen and (max-width:800px){
    height:${({$lock})=>$lock.nav_search||$lock.side_nav?"100vh":"auto"};
    overflow:${({$lock})=>$lock.nav_search||$lock.side_nav?"hidden":null};
}
`
export default function Default(){
    const [lockContainerScroll, setLockContainerScroll] = useState({side_nav:false, nav_search:false})
  
    return (
        <>
        <Container $lock = {lockContainerScroll}>
            <Navbar lockContainerScroll={setLockContainerScroll}/>
            <Outlet />
            <Footer />
        </Container>
        </>
    )
}