import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
display:flex;
gap:25px;
`
const Wrapper = styled.div`
background:white;
box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3);
border-radius:50%;
padding:10px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
transition:background .3s;

&:hover{
    background:#F1F4F9;
}

`
const Icon = styled.svg`
cursor:pointer;
height:20px;
width:20px;
`
const ShareOptions = styled.div`
box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3);
display:flex;
gap:20px;
align-items:center;
border-radius:60px;
padding:0 13px;
flex-wrap:no-wrap;
width:auto;
`

const SvgContainer = styled.div`
position:relative;
display:flex;
align-items:start;
justify-content:center;
`

const Svg = styled.svg`
cursor:pointer;
height:27px;
width:27px;
`

const TextBox = styled.div`
color: ${({color})=>color};
position: absolute;
cursor:pointer;
top: -100%;
left: ${({left})=>left};
text-wrap: nowrap;
font-size: 14px;
background: #fff;
padding: 5px 8px;
border-radius: 5px;
box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
opacity: 0;
pointer-events: none;
transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
box-shadow: 0 0px 10px ${({color})=>color};
z-index : -1;
&:before{
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #fff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

${Svg}:hover + &{
    top: ${({top})=>top};
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index:0;
}
`
const ShareTextBox = styled(TextBox)`
${Wrapper}:hover + &{
    top: ${({top})=>top};
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index:0;
}
`

export default function Share({id}){
    const [linkText, setLinkText]= useState("copy link");
    let url = "http://localhost:5173/favorites-lists/"+id

    function handleWhatsAppClick(){
        let whatsAppUrl = "https://web.whatsapp.com/send?text=" + url
        window.open(whatsAppUrl, "_blank");
    }

    function handleCopyLinkClick(){
        navigator.clipboard.writeText(url).then(function() {
            setLinkText("copied")
        });
        setLinkText("link copied")
        // window.prompt("Copy to clipboard: Ctrl+C, Enter", url);
    }

    return (
        <Container>
            <div style={{position:"relative"}}>
                <Wrapper>
                    <Icon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20px" width="20px">
                        <path stroke-linecap="round" stroke-width="2" stroke="#000000" d="M15.2141 7.39294L8.68387 10.6581M8.68387 10.6581C8.19134 9.67492 7.17449 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C7.17449 15 8.19134 14.3251 8.68387 13.3419M8.68387 10.6581C8.88616 11.0619 9 11.5176 9 12C9 12.4824 8.88616 12.9381 8.68387 13.3419M15.2141 16.6071L8.68387 13.3419M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"></path>
                    </Icon>
                </Wrapper>
                <ShareTextBox top={'-90%'} left={"-16%"} color={"grey"}>share</ShareTextBox>
            </div>
           
            <ShareOptions>
            <SvgContainer>
            <Svg style={{fill:"#cc39a4"}} fill-rule="nonzero" viewBox="0,0,256,256" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                <g style={{mixBlendMode: "normal"}} text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero">
                    <g transform="scale(8,8)">
                        <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path>
                    </g>
                </g>
            </Svg>
            <TextBox top={'-150%'} left={"-115%"} color={"#cc39a4"}>instagram</TextBox>
            </SvgContainer>

            <SvgContainer>
                <Svg onClick={handleWhatsAppClick} style={{fill: '#00ff00'}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.908c0 1.748.458 3.45 1.321 4.956L2 22l5.255-1.377a9.916 9.916 0 0 0 4.737 1.206h.005c5.46 0 9.908-4.448 9.913-9.913A9.872 9.872 0 0 0 19 4.908h.001ZM11.992 20.15A8.216 8.216 0 0 1 7.797 19l-.3-.18-3.117.818.833-3.041-.196-.314a8.2 8.2 0 0 1-1.258-4.381c0-4.533 3.696-8.23 8.239-8.23a8.2 8.2 0 0 1 5.825 2.413 8.196 8.196 0 0 1 2.41 5.825c-.006 4.55-3.702 8.24-8.24 8.24Zm4.52-6.167c-.247-.124-1.463-.723-1.692-.808-.228-.08-.394-.123-.556.124-.166.246-.641.808-.784.969-.143.166-.29.185-.537.062-.247-.125-1.045-.385-1.99-1.23-.738-.657-1.232-1.47-1.38-1.716-.142-.247-.013-.38.11-.504.11-.11.247-.29.37-.432.126-.143.167-.248.248-.413.082-.167.043-.31-.018-.433-.063-.124-.557-1.345-.765-1.838-.2-.486-.404-.419-.557-.425-.142-.009-.309-.009-.475-.009a.911.911 0 0 0-.661.31c-.228.247-.864.845-.864 2.067 0 1.22.888 2.395 1.013 2.56.122.167 1.742 2.666 4.229 3.74.587.257 1.05.408 1.41.523.595.19 1.13.162 1.558.1.475-.072 1.464-.6 1.673-1.178.205-.58.205-1.075.142-1.18-.061-.104-.227-.165-.475-.29Z"></path>
                </Svg>
                <TextBox top={'-150%'} left={"-110%"} color={"#00ff00"}>whatsapp</TextBox>
            </SvgContainer>

            <SvgContainer>
                <Svg style={{color:'rgba(10, 128, 236, 1)',height:"23px",width:"23px"}} viewBox="0 0 16 16" fill="currentColor">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                </Svg>
                <TextBox top={'-190%'} left={"-130%"} color={"rgba(10, 128, 236, 1)"}>facebook</TextBox>
            </SvgContainer>

            <SvgContainer>
                <Svg onClick={handleCopyLinkClick} style={{fill:"#A8AAAE"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>
                </Svg>
                <TextBox style={{width:"90px",textAlign:"center"}} top={'-150%'} left={"-120%"} color={"#A8AAAE"}>{linkText}</TextBox>
            </SvgContainer>


            </ShareOptions>
        </Container>
    )
}