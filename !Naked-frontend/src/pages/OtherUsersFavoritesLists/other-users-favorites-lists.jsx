import styled from "styled-components";
import { useState,useEffect } from "react";
import { Content ,Header, Title} from "../Orders/orders";
import { Products } from "../Products/Components/products-container";
import { FAV_LISTS, PRODUCTS } from "../../components/products-data";
import SearchSort from "../../components/SearchSort/search-sort"
import  FavoriteListCard  from "../../components/FavoriteListCard/favorite-list-card";
import Pagination from "../../components/Pagination/pagination";
import { useSearchParams } from "react-router-dom";
import ProductsSlider from "../../components/ProductsSlider/products-slider";

const Container = styled.div`

`
const SubTitle = styled.p`
font-weight:600;
opacity:.7;
font-size:clamp(.6rem , 2vw ,.9rem);
`
const FavoritesListsContainer= styled(Products)`
width:100%;
@media screen and (max-width:450px){
    grid-template-columns:repeat(1,1fr);
}
`
const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}




async function requestData(url){
    const request = await fetch(url);
    const response = await request.json();
    if (request.status == 200)
        return response
    return []
}

export default function OtherUsersFavoritesLists(){
    const [favoritesLists, setFavoritesLists]  = useState(FAV_LISTS)
    const [favoritesListsCount, setFavoritesListsCount] = useState(210)
    const [TotalPagesCount,setTotalPagesCount] = useState(40)
    const [searchParams , setSearchParams ] = useSearchParams();

    // request favorites lists of other users
    useEffect(()=>{
        // request data whenever search params change 
        let endpoint_url = "http://127.0.0.1:8000/api/favorites_lists"
        let url = constructUrl(endpoint_url,searchParams);
        let data = requestData(url)
        if (data){
            setFavorites(data['favorites']);
            setFavoritesCount(data['total_count']);
        }
    },[searchParams])

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    return(
        <Container>
            <Content>
                <Header>
                    <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                            <Title>People's Favorites Lists ({favoritesListsCount})</Title>
                            <SubTitle>Get Inspiration From Others' Favorites</SubTitle>
                    </div>
                    <SearchSort 
                        placeholder={"search your favorites"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                <div style={{display:"flex", flexDirection:"column", gap:"min(7vh,40px)"}}>
                    <Pagination TotalPagesCount={TotalPagesCount} CurrentPage={CurrentPage}/>
                    <FavoritesListsContainer>
                        {
                            favoritesLists && 
                            favoritesLists.map((list)=>{
                                return(
                                    <FavoriteListCard
                                        id={list.id}
                                        list_name={list.name}
                                        user_name={list.user_id.name}
                                        thumbnail={list.thumbnail}
                                        likes_count={list.likes_count}
                                        views_count={list.views_count}
                                        user_profile_picture={list.user_id.profile_picture}
                                    />
                                )
                            })
                        }
                    </FavoritesListsContainer>
                    <Pagination TotalPagesCount={TotalPagesCount} CurrentPage={CurrentPage}/>
                </div>
                <ProductsSlider products={PRODUCTS} title={"From People's Favorites"}/>
            </Content>
            

        </Container>
    )
}