import ReactDOM from 'react-dom';
import styled from "styled-components";
import Loading from "../Loading/loading";
import useUserState from "../../hooks/use-user-state";
import { useSendRequest } from "../../hooks/use-fetch-data";
import useClickOutside from "../../hooks/use-click-outside";
import { useContext, useEffect, useRef, useState } from 'react'
import SuccessOrErrorPopUp from "../SuccessOrErrorPopUp/success-or-error-pop-up";
import { AnimatePresence ,motion} from 'framer-motion';


const Container = styled.div`
width:100%;
height:100vh;
position:fixed;
z-index:300;
top:0;
left:0;

display:flex;
align-items:center;
justify-content:center;

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
font-weight:600;
background:white;
border-radius:10px;
padding:2rem;
display:flex;
flex-direction:column;
gap:2rem;
width:45%;
`
const TextContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:flex-start;
gap:.7rem;
`
const Title = styled.p`
font-weight:700;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const Text = styled.p`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
`

const ButtonsContainer = styled.div`
display:flex;
width:100%;
gap:1rem;
justify-content:flex-end;
`
const CancelAction = styled.button`
border-radius:4px;
border:2px dashed black;
outline:none;
background:white;
color:black;
font-weight:600;
cursor:pointer;
transition:border .3s;
padding:.5rem 1rem;
height: 35px;
width: 30%;
&:hover{
    border:2px solid black;
}
`
const Confirm = styled.button`
border-radius:4px;
border:none;
outline:none;
background:rgba(255,0,0,1);
color:white;
font-weight:600;
cursor:pointer;
display: flex;
align-items: center;
justify-content: center;
padding:.3rem 1rem;
height: 35px;
width: 30%;
&:hover{
    background:	rgba(190,0,0,1);
}
&:disabled{

    background:#ff8d8d;
}
`

export default function ConfirmationPopUp({show,setShow,handleAction,cancelButtonRef,title,subTitle,cancelAction,confirmAction}){
    const [isLoading, setIsLoading ] = useState(false)
    const cancelConfirmRef = useRef();

    useClickOutside([cancelConfirmRef,cancelButtonRef],show,()=>{
        setShow(false)
    })

    useEffect(()=>{
        if (isLoading) {
            handleSendRequest();
        }
    },[isLoading])


    async function handleSendRequest(){
        await handleAction();
        
        setShow(false) // close the Confirm Cancel Order menu
        setIsLoading(false) // stop the loading of Cancel button
    }

    function handleConfirmClick(e){
        setIsLoading(true)
    }

    return(
        <>
            {ReactDOM.createPortal(
                <AnimatePresence>
                    {show && (
                        <Container as={motion.div} initial={{opacity: 0 }} animate={{  opacity: 1 }} exit={{ opacity: 0 }}>
                            <Content ref={cancelConfirmRef} as={motion.div} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 30, opacity: 0 }}>
                                <TextContainer>
                                    <Title>{title}</Title>
                                    <Text>{subTitle}</Text>
                                </TextContainer>
                                <ButtonsContainer>
                                    <CancelAction onClick={(e)=>setShow(false)}>{cancelAction}</CancelAction>
                                    <Confirm disabled={isLoading} onClick={handleConfirmClick}>
                                        {isLoading ? 
                                        <Loading style={{transform:"scale(.2)"}}/>:
                                        confirmAction
                                        }
                                    </Confirm>
                                </ButtonsContainer>
                            </Content>
                        </Container>
                    )}
                </AnimatePresence>,
                document.body
            )}
            
        </>
    )
}