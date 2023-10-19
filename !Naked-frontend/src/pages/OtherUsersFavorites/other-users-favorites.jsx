import styled from "styled-components"
import { Content, Header, Title,constructUrl } from "../Orders/orders"
import { useState, useEffect, useRef } from "react"
import SearchSort from "../../components/SearchSort/search-sort"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import ProductCard from "../../components/ProductCard/product-card"
import Pagination from "../../components/Pagination/pagination"
import { PRODUCTS } from "../../components/products-data"
import { Products } from "../../components/StyledComponents/styled-components"
import LikesViews from "../../components/LikesViews/likes-views"
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
    const [favoritesList, setFavoritesList] = useState({})
    const [favorites, setFavorites] = useState(PRODUCTS)

    const [favoritesCount , setFavoritesCount] = useState(0)
    const [TotalPagesCount,setTotalPagesCount] = useState(0)

    const [interactions , setInteractions] = useState({views:0 , likes:0})
    
    const [showActionsDropDown,setShowActionsDropDown] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const {favorites_list_id} = useParams();
    const DropDownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (DropDownRef.current && !DropDownRef.current.contains(event.target)){
                setShowActionsDropDown(false)
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }
        if (showActionsDropDown) document.addEventListener("mousedown", handleClickOutside);
    }, [showActionsDropDown]);

    // // request favorites of other user
    // useEffect(()=>{
    //     // request data whenever search params change 
    //     let endpoint_url = "http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id+"/favorites"
    //     let url = constructUrl(endpoint_url,searchParams);
    //     let data = requestData(url)
    //     if (data){
    //         setFavorites(data['data']);
    //         setFavoritesCount(data['metadata']['total_count']);
    //     }
    // },[searchParams])

    // // request favorites list info of other user, and view 
    // useEffect(()=>{
    //     let url ="http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id
    //     let data = requestData(url)
    //     if (data) {
    //         setFavoritesList(data['data'])
    //     }
    // 
    //     handleView()
    // },[])


    function handleView(){
        let view_url = "http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id+"/view"
        let views = requestData(view_url)['data']['views_count']
        setInteractions({...interactions,views:views})
    }

    function handleLikesButtonClick(e){
        let like_url = "http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id+"/like"
        let likes = requestData(like_url)['data']['likes_count']
        setInteractions({...interactions,likes:likes})
    }

    function handleEllipsesIconClick(e){
        setShowActionsDropDown(!showActionsDropDown)
    }

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    return (
        <Container>
            <Content>
                <Header>
                    <DetailsContainer>
                        <TitleActionsContainer>                    
                            <Title>User's Favorites List (303)</Title>
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
                            by Username | Modified at 22-08-2023
                        </UsernameDate>
                        <LikesViews views={interactions['views']} likes={interactions['likes']}/>
                    </DetailsContainer>
                    <SearchSort 
                        placeholder={"search your orders"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                <div style={{display:"flex", flexDirection:"column", gap:"min(7vh,40px)"}}>
                    <Pagination TotalPagesCount={30}/>
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
                    <Pagination TotalPagesCount={30}/> 
                </div>
            </Content>
        </Container>
    )
}