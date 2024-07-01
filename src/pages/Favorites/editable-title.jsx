import styled from "styled-components"
import { useSendRequest } from "../../hooks/use-fetch-data"
import useUserState from "../../hooks/use-user-state"
import { useLayoutEffect, useRef, useState } from "react"
import {  Title} from "../Orders/orders";
import SuccessOrErrorPopUp from "../../components/SuccessOrErrorPopUp/success-or-error-pop-up";

const TitleForm = styled.form`
`
const TitleInput = styled.input`
font-weight:600;
min-width:20px;
font-size:clamp(.9rem,3vw,1.5rem);
border:none;
outline:none;
`

//used to adjust the width of the TitleInput 
const HiddenSpan = styled.span`
font-size:clamp(.9rem,3vw,1.5rem);
font-weight:600;
position:absolute;
top:140px;
visibility:hidden;
z-index:-200;
`

const DisplayedForOthers = styled.p`
text-wrap:nowrap;
font-weight:600;
font-size:clamp(.6rem , 2vw ,.9rem);
opacity:.7;
@media screen and (max-width:600px){
    display:none;
}
`
const TitleWrapper = styled.span`
display:flex;
width:100%;
justify-content:space-between;
align-items:center;
grid-column:1/2;
@media screen and (max-width:380px){
    grid-column:1/3;
}
`


export default function EditableTitle({favoritesListId,favoritesListTitle,updateFavoritesListData}){
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    const [useTitleInput, setUseTitleInput] = useState(false);
    const [titleText, setTitleText] = useState(favoritesListTitle)
    const [titleUpdateLoading, setTitleUpdateLoading] = useState(false)

    const spanRef = useRef(null)
    const editIconRef= useRef(null)
    const [titleInputWidth,setTitleInputWidth] = useState(spanRef?.current ?spanRef.current.offsetWidth:170)

    function handleTitleTextChange(e){
        setTitleText(e.target.value)
    }

    async function handleRequestNameUpdate(){
        setTitleUpdateLoading(true)
        let update_favorites_list_uri =  "/api/favorites_list/"+favoritesListId;
        let patch_request_init = {
            method : "PATCH",
            body: {'name' : titleText},
        } 

        let {request,response} = await sendRequest(update_favorites_list_uri, patch_request_init)
        if (request?.status == 200 && response?.name){
            updateFavoritesListData((data)=>({...data ,name:update_request.name}))
        }
        setTitleUpdateLoading(false)
        setTitleText(favoritesListTitle) // display new name if updated, else old name 
    }

    function handleTitleFormSubmit(e){
        e.preventDefault();
        if (!favoritesListTitle){
            setUseTitleInput(false)
            return null
        }
        handleRequestNameUpdate()
        setUseTitleInput(false)
    }

    function handleEditIconClick(e){  
        if (useTitleInput){
            handleRequestNameUpdate()
            setUseTitleInput(false)
        }else{
            updateWidth()
            setUseTitleInput(true)
        }
    }   

    function handleTitleInputBlur(e){
        if (!(e.relatedTarget === editIconRef.current)){
            handleRequestNameUpdate()
            setUseTitleInput(false)
        }
    }

    const replaceSpaces = (text) => {
        return text.replace(/ /g, '\u00A0');
    };

    // update the width of the input according to hidden span's width
    const updateWidth = () => {
        if (spanRef.current) {
          let spanWidth = spanRef.current.offsetWidth;
          setTitleInputWidth(spanWidth);
        }
    };
    
    useLayoutEffect(()=>{
        if (spanRef.current) {
            // Replace spaces in titleText with a non-breaking space
            const textWithNoSpaces = replaceSpaces(titleText);
            // Set the text content of the span
            spanRef.current.textContent = textWithNoSpaces;
            updateWidth()
        }
    },[titleText,spanRef])


    return (
        <TitleWrapper>
            <SuccessOrErrorPopUp serverError={serverError} />
            <div style={{display:"flex", gap:'10px',alignItems:'center'}}>
                {
                    !useTitleInput?
                    <Title color={`${titleUpdateLoading?'grey':"black"}`} style={{width:'auto'}}>{titleText}</Title>:
                    <TitleForm onSubmit={handleTitleFormSubmit}>
                        <TitleInput 
                            onBlur={handleTitleInputBlur}
                            style={{width:`${titleInputWidth}px`}}
                            autoFocus={true}
                            type="text" 
                            value={titleText} 
                            onChange={handleTitleTextChange}
                            maxLength="33"
                        />
                    </TitleForm>
                }
                <HiddenSpan ref={spanRef}>{titleText}</HiddenSpan>
                <div style={{display:"flex", gap:"5px",alignItems:"flex-end",}}>
                    <i 
                        tabIndex="0"
                        onClick={handleEditIconClick} 
                        ref={editIconRef} 
                        style={{cursor:"pointer"}} 
                        className="fa-regular fa-pen-to-square"
                    />
                    <DisplayedForOthers>displayed for others</DisplayedForOthers>
                </div>
            </div>
        </TitleWrapper>
    )
}