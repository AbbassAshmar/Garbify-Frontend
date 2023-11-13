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
font-size:clamp(1.1rem,3vw,1.5rem);
border:none;
background:green;
outline:none;

`
//used to adjust the width of the TitleInput 
const HiddenSpan = styled.span`
font-size:clamp(1.1rem,3vw,1.5rem);
font-weight:600;
position:absolute;
top:140px;
background:grey;
`

const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}


export default function Favorites(){
    const [useTitleInput, setUseTitleInput] = useState(false);
    const [titleText, setTitleText] = useState("Your Favorites")

    const [titleInputWidth,setTitleInputWidth]  = useState(170)
    const spanRef = useRef(null)

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

    // request favorites list info 

    let favorites_list_url= "http://127.0.0.1:8000/api/users/user/favorites_list";
    let {data:favoritesListData, error:favoritesListError, loading:favoritesListLoading,setData} = useFetchData(favorites_list_url,request_init)
    let favoritesList = []
    if (favoritesListData){
        favoritesList = favoritesList['data']
    }
    favoritesList = FAV_LISTS[0]

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

    function handleTitleFormSubmit(e){
        e.preventDefault();
        //request title edit 
        if (!favoritesList){
            return null
        }
        
        let patch_request_init = {
            method : "PATCH",
            ...request_init
        } 
        let update_favorites_list_url =  "http://127.0.0.1:8000/api/favorites_list/"+id;

        try {
            update_request = sendRequest(update_favorites_list_url, patch_request_init)
            if (update_request && update_request.name){
                setData({...favoritesListData ,name:update_request.name})
            }
        }catch(error){
            setUseTitleInput(false)
            setTitleText(favoritesList.name) // display the old name
        }
    }

    function handleEditIconClick(e){
        if (useTitleInput){
            //request name change 
        }

        setUseTitleInput(!useTitleInput)
    }   
    function handleTitleInputBlur(e){
        // if press on edit icon , call handleEditIcon
        if (false){

        }else { 
            // request name change 
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
                    <div style={{display:"flex",flexDirection:"column", gap:"10px"}}>
                        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:'100%'}}>
                            <div style={{display:"flex", gap:"20px",alignItems:"center"}}>
                                {
                                    !useTitleInput?
                                    <Title style={{minWidth:"20px",width:'auto'}}>{titleText}</Title>
                                    :
                                    <TitleForm onSubmit={handleTitleFormSubmit}>
                                        <TitleInput 
                                            onBlur={handleTitleInputBlur}
                                            style={{width:`${titleInputWidth}px`}}
                                            autoFocus={true}
                                            type="text" 
                                            value={titleText} 
                                            onChange={handleTitleTextChange}
                                            maxLength="20"
                                        />
                                    </TitleForm>
                                }
                                <HiddenSpan ref={spanRef}>{titleText}</HiddenSpan>
                                <div style={{display:"flex", gap:"10px",alignItems:"flex-end",}}>
                                    <i onClick={handleEditIconClick} style={{cursor:"pointer"}} className="fa-regular fa-pen-to-square"/>
                                    <p style={{fontWeight:"600", fontSize:"clamp(.6rem , 2vw ,.9rem)",opacity:'.7'}}>displayed for others</p>
                                </div>
                            </div>
                            <PublicPrivateButton />
                        </div>
                        <LikesViews disabled={true} views={favoritesList["views_count"]} likes={favoritesList["likes_count"]}/>
                    </div>
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