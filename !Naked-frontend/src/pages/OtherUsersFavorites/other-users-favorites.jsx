import styled from "styled-components"
import { Title,constructUrl } from "../Orders/orders"
import { useState, useEffect, useRef } from "react"
import SearchSort from "../../components/SearchSort/search-sort"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import ProductCard from "../../components/ProductCard/product-card"
import Pagination from "../../components/Pagination/pagination"
import { FAV_LISTS, PRODUCTS } from "../../components/products-data"
import { Header,Products ,Content} from "../../components/StyledComponents/styled-components"
import LikesViews from "../../components/LikesViews/likes-views"
import { useFetchData } from "../../hooks/use-fetch-data"
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
const FavoritesProductsContainer = styled(Products)`
width:100%;
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
max-height:${({show})=>show};
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
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}

export async function requestData(url,init={}){
    let defaultInit = {
        method :"GET",
        headers:{
            'content-type' : "application/json",
            'accept' : 'application/json'
        },
        ...init
    }
    const request = await fetch(url,defaultInit);
    const response = await request.json();
    if (request.status == 200)
        return response
    return {}
}

export default function OtherUsersFavorites(){
    const [isLiked, setIsLiked] = useState(false);
    const [interactions , setInteractions] = useState({likes:0, views:0})
    const [showActionsDropDown,setShowActionsDropDown] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const {favorites_list_id} = useParams();
    const DropDownRef = useRef(null)

    // request favorites of other user
    let favorites_url = constructUrl("http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id+"/favorites",searchParams)
    let {
        data:favoritesData,
        error:errorFavorites,
        loading:loadingFavrotes, 
        handleState:fetchData
    } = useFetchData(favorites_url,{},[searchParams]);

    let [favoritesCount, TotalPagesCount,favorites] = [0 , 0 , null];

    if (favoritesData){
        favoritesCount = favoritesData['metadata']['total_count'];
        TotalPagesCount = favoritesData['metadata']['pages_count']
        favorites = favoritesData['data'];
    }

    //default for dev
    favorites = FAV_LISTS;
    TotalPagesCount = 9;
    favoritesCount=23;
    

    // request favorites list info of other user, and view 
    let favorites_list_url = "http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id;
    let {data:favoritesListData,error:errorFavoritesList,loading:loadingFavoritesList} = useFetchData(favorites_list_url);
    
    let favoritesList = null ;
    if (favoritesListData){
        favoritesList = favoritesListData['data']
        setInteractions({views:favoritesList['views_count'], likes:favoritesList['likes_count']})
    }
    //default for dev
    favoritesList = FAV_LISTS[0];
    // setInteractions({views:favoritesList['views_count'], likes:favoritesList['likes_count']})


    useEffect(() => {
        function handleClickOutside(event) {
            if (DropDownRef.current && !DropDownRef.current.contains(event.target)){
                setShowActionsDropDown(false)
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }
        if (showActionsDropDown) document.addEventListener("mousedown", handleClickOutside);
    }, [showActionsDropDown]);

    // useEffect(()=>{
    //     handleView();
    // },[])

    function handleView(){
        let view_url = "http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id+"/view"
        let views = requestData(view_url)['data']['views_count']
        setInteractions({...interactions,views:views})
    }

    function handleLikeButtonClick(e){
        let like_url = "http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id+"/like"
        let likes = fetchData(like_url)
        setInteractions({...interactions,likes:likes['data']['likes_count']})
        let is_liked =likes['data']['action'] == "liked" ? true : false;
        setIsLiked(is_liked)
    }

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    function handleEllipsesIconClick(e){
        setShowActionsDropDown(!showActionsDropDown)
    }

    return (
        <Container>
            <Content>
                <Header>
                    <DetailsContainer>
                        <TitleActionsContainer>                    
                            <Title>{favoritesList['name']} ({favoritesCount})</Title>
                            <ActionsDropDownContainer>
                                <i style={{cursor:"pointer"}} class="fa-solid fa-ellipsis-vertical" onClick={handleEllipsesIconClick}/> 
                                <DropDown ref={DropDownRef} show={showActionsDropDown?"20vh":"0"}>
                                    <Action>add all to my favorites</Action>
                                    <Action>report this list</Action>
                                    <Action>follow this user</Action>
                                </DropDown>
                            </ActionsDropDownContainer>
                        </TitleActionsContainer>
                        <UsernameDate>
                            by {favoritesList['user']['name']} | Modified at {favoritesList["updated_at"]}
                        </UsernameDate>
                        <LikesViews handleLikeButtonClick={handleLikeButtonClick} liked={isLiked} views={interactions['views']} likes={interactions['likes']}/>
                    </DetailsContainer>
                    <SearchSort 
                        placeholder={"search your orders"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                <div style={{display:"flex", flexDirection:"column", gap:"min(7vh,40px)"}}>
                    <Pagination TotalPagesCount={TotalPagesCount}/>
                    <FavoritesProductsContainer>
                        {
                            favorites.map((favorite)=>{
                                return (
                                    <ProductCard
                                        key={favorite.pk}
                                        pk ={favorite.pk}
                                        name={favorite.name} 
                                        price={favorite.price} 
                                        quantity={favorite.quantity}
                                        colors={favorite.colors}
                                        type={favorite.type}
                                        thumbnail={favorite.thumbnail}
                                        sale={favorite.sale}
                                    />
                                )
                            })
                        }
                    </FavoritesProductsContainer>
                    <Pagination TotalPagesCount={TotalPagesCount}/> 
                </div>
            </Content>
        </Container>
    )
}