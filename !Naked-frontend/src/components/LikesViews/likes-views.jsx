import { useEffect, useState } from "react"
import styled from "styled-components"
import { useSendRequest } from "../../hooks/use-fetch-data"
import useUserState from "../../hooks/use-user-state"
import { useParams } from "react-router-dom"

const InteractionsContianer = styled.div`
display:flex;
gap:15px;

`

const Likes = styled.button`
display:flex;
align-items:center;
gap:10px;
font-weight:600;
font-size :clamp(.6rem,2vw,.9rem);
outline:none;
background:none;
border:none;
cursor:pointer
`

const Views = styled(Likes)`

`


function LikeButton({likes,setInteractions,disabled}){
    let userContext = useUserState();
    const [isLiked, setIsLiked] = useState(false);
    const {favorites_list_id} = useParams();
    let {sendRequest, serverError} = useSendRequest(userContext)


    function handleLikeButtonClick(e){
        let like_url = "/api/favorites_lists/"+favorites_list_id+"/like"
        let likes = sendRequest(like_url, {method:"POST"})
        setInteractions((interactions)=>({...interactions,likes:likes['data']['likes_count']}))

        let is_liked =likes['data']['action'] == "liked";
        setIsLiked(is_liked)
    }


    return (
        <Likes disabled={disabled} onClick={handleLikeButtonClick}>
            {
                isLiked ? 
                <i className="fa-solid fa-thumbs-up"/>:
                <i className="fa-regular fa-thumbs-up"/>
            }
            <p>{likes}</p>
        </Likes>
    )
}


export default function LikesViews(props){
    let userContext = useUserState();
    const {favorites_list_id} = useParams();
    let {sendRequest, serverError} = useSendRequest(userContext)
    const [interactions , setInteractions] = useState(props.interactions ?? {likes:0, views:0})

    useEffect(()=>{
        handleView();
    },[])

    function handleView(){
        let view_url = "/api/favorites_lists/"+favorites_list_id+"/view"
        let {response,request} = sendRequest(view_url,{method:"POST"})
        if (request?.ok) setInteractions({...interactions,views:response.data.views})
    }

    return (
        <InteractionsContianer>
            <Views disabled={props.disabled}>
                <i className="fa-regular fa-eye"/>
                <p>{interactions['views']}</p>
            </Views>
            <LikeButton 
            disabled={props.disabled}
            is_liked={props.is_liked} 
            likes={interactions['likes']} 
            setInteractions={setInteractions} />
        </InteractionsContianer>
    )
}