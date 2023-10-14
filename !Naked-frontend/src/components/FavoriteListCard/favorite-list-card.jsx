import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container =styled(Link)`
color:black;
text-decoration:none;
border-radius:10px;
position:relative;
box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
display:flex;
flex-direction:column;
justify-content:flex-end;
height:auto;
overflow:hidden;
`
const ImageContainer= styled.div`
height:min(20vw ,370px);

@media screen and (max-width:1000px){
    height:30vw;
}

@media screen and (max-width:450px){
    height:40vw;
}
`

const Image = styled.img`
position:relative;
width:100%;
height:min(25vw ,450px);
object-fit:cover;
top:0;

@media screen and (max-width:1000px){
    height:35vw;
}
@media screen and (max-width:450px){
    height:auto;
}
`
const Content =styled.div`
position:relative;
z-index:4;
background:white;
width:100%;
border-radius:40px 40px 0 0;
padding:0 .8rem .8rem .8rem;
display: flex;
flex-direction: column;
justify-content: flex-end;
`
const UserContent =styled.div`
display:flex;
align-items:flex-end;
gap:5px;
position:relative;
top:-20%;
`
const Profile = styled.img`
width:40px;
height:40px;
border-radius:50%;
`
const Username = styled.p`
font-weight:600;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`

const InformationPanel = styled.div`
display:flex;
flex-direction:column;
gap:15px;
`
const ListName =styled.p`
font-weight:600;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const ViewsLikesContainer =styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;

`
const Views =styled.div`
display:flex;
gap:5px;
font-weight:600;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}

`
const ViewsIcon = styled.i`

`
const ViewsCount =styled.p`

`
const Likes = styled.div`
display:flex;
gap:5px;

font-weight:600;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const LikeButton = styled.button`
background:none;
outline:none;
border:none;
`
const LikesIcon =styled.i`
font-weight:600;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}

`
const LikesCount =styled.p`

`
export default function FavoriteListCard(props){
    const [isLiked , setIsLiked ] = useState(false)
    return (
        <Container>
            <ImageContainer>
                <Image src={props.thumbnail}/>
            </ImageContainer>
            <Content>
                <UserContent>
                    <Profile src={props.user_profile_picture} />
                    <Username>{props.user_name}</Username>
                </UserContent>
                <InformationPanel>
                    <ListName>{props.list_name}</ListName>
                    <ViewsLikesContainer>
                        <Views>
                            <ViewsIcon  className="fa-regular fa-eye" />
                            <ViewsCount>{props.views_count}</ViewsCount>
                        </Views>
                        <Likes>
                            <LikeButton>
                                {
                                    isLiked ? 
                                    <LikesIcon className="fa-solid fa-thumbs-up"/>:
                                    <LikesIcon className="fa-regular fa-thumbs-up"/>
                                }
                            </LikeButton>
                            <LikesCount>{props.likes_count}</LikesCount>
                        </Likes>
                    </ViewsLikesContainer>
                </InformationPanel>
            </Content>
        </Container>
    )
}