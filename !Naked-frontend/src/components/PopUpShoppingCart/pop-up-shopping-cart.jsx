import styled from "styled-components";
import ReactDOM from "react-dom";

const DropDownCart = styled.div`
height:100vh;
width:100%;
display:flex;
align-items:center;
justify-content:center;
position:fixed;
top:0;
left:0;
z-index:2000;

&:before{
    content:"";
    position:absolute;
    background:black;
    opacity:.7;
    width:100%;
    height:100vh;
    z-index:-1;
    top:0;
    left:0;
}
`
const Content = styled.div`
width:300px;
height:500px;
background:white;
`

export default function PopUpShoppingCart({props}){
    return (
        <>
            {   
                ReactDOM.createPortal(
                    <DropDownCart>
                        <Content>
                            <p>jdfajsfio</p>
                        </Content>
                    </DropDownCart>,
                    document.body
                )
            }
        </>
    )
}