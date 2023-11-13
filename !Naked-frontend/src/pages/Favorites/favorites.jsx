import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { userStateContext } from "../../Contexts/user-state";
import {useSearchParams} from "react-router-dom";
import { NoOrdersContainer, NoOrdersTitle, constructUrl, Title} from "../Orders/orders";
import ProductCard from "../../components/ProductCard/product-card";
import { PRODUCTS } from "../../components/products-data";
import { Header,Products ,Content} from "../../components/StyledComponents/styled-components";
import Pagination from "../../components/Pagination/pagination";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import SearchSort from "../../components/SearchSort/search-sort"
import PublicPrivateButton from "../../components/PublicPrivateButton/public-private-button";
import LikesViews from "../../components/LikesViews/likes-views";
import { FAV_LISTS } from "../../components/products-data";
import { useFetchData } from "../../hooks/use-fetch-data";

const Container = styled.div`
width:100%;
`
const TopInfoContainer = styled.div`
display:grid;
grid-template-columns:repeat(2,1fr);
grid-gap:10px;
`
const FavoriteProductsContainer = styled(Products)`
width:100%;
`

const NoFavoritesContainer = styled(NoOrdersContainer)`
@media screen and (max-width:600px){
    padding:min(2rem ,5%) min(2rem ,5%) 0 min(2rem ,5%);
 }
`

const NoFavoritesTitls = styled(NoOrdersTitle)`
`

const TitleForm = styled.form`
// min-width:170px;
// min-width:${({min_width})=>min_width};

`
const TitleInput = styled.input`
font-weight:600;
min-width:20px;
font-size:clamp(.9rem,3vw,1.5rem);
border:none;
background:green;
outline:none;
`

//used to adjust the width of the TitleInput 
const HiddenSpan = styled.span`
font-size:clamp(.9rem,3vw,1.5rem);
font-weight:600;
position:absolute;
top:140px;
background:grey;
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
const PublicPrivateWrapper = styled.span`
grid-column:2/3;
grid-row:1;
justify-self: end;
@media screen and (max-width:380px){
    grid-row:2;
}
`

const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}

export default function Favorites(){
    const {token} = useContext(userStateContext);
    const [searchParams,setSearchParams] = useSearchParams();

    // init with token for all requests
    let request_init = {
        headers:{
            "Authorization" : "Bearer " + token,
            "content-type ": "application/json",
            "accept ": 'application/json'
        }
    }

    // request favorites list info 
    let favorites_list_url= "http://127.0.0.1:8000/api/users/user/favorites_list";
    let {data:favoritesListData, error:favoritesListError, loading:favoritesListLoading,setData} = useFetchData(favorites_list_url,request_init)
    let favoritesList = []
    if (favoritesListData){
        favoritesList = favoritesList['data']
    }
    favoritesList = FAV_LISTS[0]

    const [useTitleInput, setUseTitleInput] = useState(false);
    const [titleText, setTitleText] = useState(favoritesList.name)

    const [titleInputWidth,setTitleInputWidth]  = useState(170)
    const spanRef = useRef(null)
    const editIconRef= useRef(null)

    // request favorites 

    let favorites_url = constructUrl("http://127.0.0.1:8000/api/users/user/favorites",searchParams)
    let {data:favoritesData, error:errorFavorites, loading:loadingFavorites,sendRequest} = useFetchData(favorites_url,request_init,[searchParams])
    let [favoritesCount, TotalPagesCount,favorites] = [0 , 0 , null];
    if (favoritesData){
        favoritesCount = favoritesData['metadata']['total_count'];
        TotalPagesCount = favoritesData['metadata']['pages_count']
        favorites = favoritesData['data'];
    }
    favorites = PRODUCTS

    // request products for slider 
    let all_favorites_url = "http://127.0.0.1:8000/api/favorites?limit=10";
    let {data:sliderProductsData, error:sliderProductsError,loading:sliderProductsLoading} = useFetchData(all_favorites_url,request_init)
    let sliderProducts = []
    if (sliderProductsData){
        sliderProducts = sliderProductsData['data']
    }
    sliderProducts = PRODUCTS

 
    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    function handleTitleTextChange(e){
        setTitleText(e.target.value)
    }

    async function handleRequestNameUpdate(){
        let patch_request_init = {
            method : "PATCH",
            body: {
                'name' : titleText
            },
            ...request_init
        } 
        let update_favorites_list_url =  "http://127.0.0.1:8000/api/favorites_list/"+favoritesList.id;

        try {
            update_request = await sendRequest(update_favorites_list_url, patch_request_init)
            if (update_request && update_request.name){
                setData({...favoritesListData ,name:update_request.name})
                setTitleText(favoritesList.name)
            }
        }catch(error){
            setTitleText(favoritesList.name) // display the old name
        }
    }

    function handleTitleFormSubmit(e){
        e.preventDefault();
        if (!favoritesList){
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
            setUseTitleInput(true)
        }
    }   

    function handleTitleInputBlur(e){
        if (!(e.relatedTarget === editIconRef.current)){
            handleRequestNameUpdate()
            setUseTitleInput(false)
        }
    }

    useEffect(()=>{
        let spanWidth = spanRef.current.offsetWidth
        setTitleInputWidth(spanWidth)
    },[titleText])

    return (
        <Container>
            <Content>
                <Header>
                    <TopInfoContainer>
                        <TitleWrapper>
                            <div style={{display:"flex", gap:'10px',alignItems:'center'}}>
                                {
                                    !useTitleInput?
                                    <Title style={{width:'auto'}}>{titleText}</Title>
                                    :
                                    <TitleForm onSubmit={handleTitleFormSubmit}>
                                        <TitleInput 
                                            onBlur={handleTitleInputBlur}
                                            style={{width:`${titleInputWidth}px`}}
                                            autoFocus={true}
                                            type="text" 
                                            value={titleText} 
                                            onChange={handleTitleTextChange}
                                            maxLength="30"
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
                        <PublicPrivateWrapper><PublicPrivateButton/></PublicPrivateWrapper>
                        <span style={{gridRow:'2',alignSelf: 'end'}}><LikesViews disabled={true} views={favoritesList["views_count"]} likes={favoritesList["likes_count"]}/></span>
                    </TopInfoContainer>
                    <SearchSort 
                        placeholder={"search your favorites"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                
                {
                favorites && favorites.length > 0 ?
                    <>
                    <Pagination TotalPagesCount={TotalPagesCount}/>
                    <FavoriteProductsContainer>
                        {
                            favorites.map((favorite)=>{
                                return (
                                    <ProductCard
                                        key={favorite.id}
                                        id ={favorite.id}
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
                    </FavoriteProductsContainer>
                    <Pagination TotalPagesCount={TotalPagesCount}/>
                    </>
                    :
                    <>
                        <NoFavoritesContainer>
                            <NoFavoritesTitls>
                                You don't have any favorites yet !
                            </NoFavoritesTitls>
                            <ProductsSlider title={"Might be your first favorite"} products={sliderProducts}/>
                        </NoFavoritesContainer>
                    </>
                }
                
                
            </Content>
        </Container>
    )
}