import styled from "styled-components"
import { Title } from "../Orders/orders"
import { useState, useEffect, useRef } from "react"
import SearchSort from "../../components/SearchSort/search-sort"
import { useParams, useSearchParams } from "react-router-dom"
import { FAV_LISTS } from "../../components/products-data"
import { Header ,Content} from "../../components/StyledComponents/styled-components"
import LikesViews from "../../components/LikesViews/likes-views"
import { useFetchData } from "../../hooks/use-fetch-data"
import Loading from "../../components/Loading/loading"
import FavoriteProductsGrid from "../../components/FavoriteProductsGrid/favorite-products-grid"

const Container = styled.div`
`
const DetailsContainer= styled.div`
display:flex;
flex-direction:column;
gap:10px;
`
const TitleActionsContainer  = styled.div`
display : flex;
align-items:center;
justify-content:space-between;
width:100%;
gap:10px;
`

const ActionsDropDownContainer = styled.div`
display:flex;
flex-direction:column;
align-items:flex-end;
position:relative;
gap:5px;
`

const DropDown = styled.div`
position:absolute;
white-space: nowrap;
background:white;
z-index:100;
box-shadow:1px 1px 10px rgba(189, 189, 189,1);
max-height:${({$show})=>$show};
overflow:hidden;
display:flex;
flex-direction:column;
transition:max-height .3s;
`

const Action = styled.div`
font-size: clamp(.6rem,2vw,.9rem);
font-weight:600;
padding: 5px 10px;
cursor:pointer;
&:hover{
    background:#F1F4F9;
}
`

const UsernameDate = styled.p`
font-weight:600;
font-size :clamp(.6rem,2vw,.9rem);
opacity:.7;
`

const InteractionsContianer = styled.div`
display:flex;
gap:15px;

`
const Likes = styled.div`
display:flex;
align-items:center;
gap:10px;
font-weight:600;
font-size :clamp(.6rem,2vw,.9rem);
`
const Views = styled.div`
display:flex;
align-items:center;
gap:10px;
font-weight:600;
font-size :clamp(.6rem,2vw,.9rem);
`

const OrderBytoSortBy={
    "name ASC":"From A-Z",
    "created_at DESC":"Newest-Oldest",
    "created_at ASC":"Oldest-Newest",
    "total_cost DESC":"Price: High-Low",
    "total_cost ASC":"Price: Low-High",
}


export default function OtherUsersFavorites(){
    const [showActionsDropDown,setShowActionsDropDown] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const {favorites_list_id} = useParams();
    const DropDownRef = useRef(null)

    // request favorites list info of other user, and view 
    let favorites_list_url = "/api/favorites_lists/"+favorites_list_id;
    let {data,error,loading} = useFetchData(favorites_list_url);
    let favoritesList = data?.data?.favoritesList || FAV_LISTS[0] ;
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (DropDownRef.current && !DropDownRef.current.contains(event.target)){
                setShowActionsDropDown(false)
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }
        if (showActionsDropDown) document.addEventListener("mousedown", handleClickOutside);
    }, [showActionsDropDown]);

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    function handleEllipsesIconClick(e){
        setShowActionsDropDown(!showActionsDropDown)
    }

    if (loading){
        return <Loading />
    }

    return (
        <Container>
            <Content>
                <Header>
                    <DetailsContainer>
                        <TitleActionsContainer>                    
                            <Title>{favoritesList['name']} ({favoritesList['favorites_count']})</Title>
                            <ActionsDropDownContainer>
                                <i style={{cursor:"pointer"}} class="fa-solid fa-ellipsis-vertical" onClick={handleEllipsesIconClick}/> 
                                <DropDown ref={DropDownRef} $show={showActionsDropDown?"20vh":"0"}>
                                    <Action>add all to my favorites</Action>
                                    <Action>report this list</Action>
                                    <Action>follow this user</Action>
                                </DropDown>
                            </ActionsDropDownContainer>
                        </TitleActionsContainer>
                        <UsernameDate>
                            by {favoritesList['user']['name']} | Modified at {favoritesList["updated_at"]}
                        </UsernameDate>
                        <LikesViews  
                        is_liked={favoritesList['is_liked_by_current_user']} 
                        interactions={{likes:favoritesList['likes_count'],views:favoritesList['views_count']}}/>
                    </DetailsContainer>
                    <SearchSort 
                        placeholder={"search your orders"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                <FavoriteProductsGrid url={"/api/favorites_lists/"+favorites_list_id+"/favorites"}/>
            </Content>
        </Container>
    )
}