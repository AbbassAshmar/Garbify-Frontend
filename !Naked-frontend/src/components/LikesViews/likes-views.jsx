import styled from "styled-components"

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
export default function LikesViews({disabled,views,likes}){
    return (
        <InteractionsContianer>
            <Views disabled={disabled}>
                <i className="fa-regular fa-eye"/>
                <p>{views}</p>
            </Views>
            <Likes  disabled={disabled}>
                <i className="fa-solid fa-thumbs-up"/>
                <p>{likes}</p>
            </Likes>
        </InteractionsContianer>
    )
}