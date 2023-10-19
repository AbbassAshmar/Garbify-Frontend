import styled from "styled-components";
import { useState,useEffect } from "react";
import { Content ,Header, Title, constructUrl } from "../Orders/orders";
import { FAV_LISTS, PRODUCTS } from "../../components/products-data";
import SearchSort from "../../components/SearchSort/search-sort"
import  FavoriteListCard  from "../../components/FavoriteListCard/favorite-list-card";
import Pagination from "../../components/Pagination/pagination";
import { useSearchParams } from "react-router-dom";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { requestData } from "../OtherUsersFavorites/other-users-favorites";
import { Products } from "../../components/StyledComponents/styled-components";
const Container = styled.div`

`
export const DetailsContainer = styled.div`
display:flex, 
flexDirection:column, 
gap:10px
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

export default function OtherUsersFavoritesLists(){
    const [sliderProducts, setSliderProducts] = useState(PRODUCTS)
    const [favoritesLists, setFavoritesLists]  = useState(FAV_LISTS)
    const [favoritesListsCount, setFavoritesListsCount] = useState(210)
    const [TotalPagesCount,setTotalPagesCount] = useState(40)
    const [searchParams , setSearchParams ] = useSearchParams();

    // // request favorites lists of other users
    // useEffect(()=>{
    //     // request data whenever search params change 
    //     let endpoint_url = "http://127.0.0.1:8000/api/favorites_lists"
    //     let url = constructUrl(endpoint_url,searchParams);
    //     let data = requestData(url)
    //     if (data){
    //         setFavoritesLists(data['data']);
    //         setFavoritesListsCount(data['metadata']['total_count']);
    //     }
    // },[searchParams])

    // // request products for slider 
    // useEffect(()=>{
    //     let endpoint_url = "http://127.0.0.1:8000/api/favorites?limit=10";
    //     let data = requestData(endpoint_url);
    //     if (data){
    //         setSliderProducts(data.favorites)
    //     }
    // },[])

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    return(
        <Container>
            <Content>
                <Header>
                    <DetailsContainer>
                        <Title>People's Favorites Lists ({favoritesListsCount})</Title>
                        <SubTitle>Get Inspiration From Others' Favorites</SubTitle>
                    </DetailsContainer>
                    <SearchSort 
                        placeholder={"search your favorites"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                <div style={{display:"flex", flexDirection:"column", gap:"min(7vh,40px)"}}>
                    <Pagination TotalPagesCount={TotalPagesCount}/>
                    <FavoritesListsContainer>
                        {
                            favoritesLists && 
                            favoritesLists.map((list)=>{
                                return(
                                    <FavoriteListCard
                                        id={list.id}
                                        list_name={list.name}
                                        user_name={list.user.name}
                                        thumbnail={list.thumbnail}
                                        likes_count={list.likes_count}
                                        views_count={list.views_count}
                                        user_profile_picture={list.user.profile_picture}
                                    />
                                )
                            })
                        }
                    </FavoritesListsContainer>
                    <Pagination TotalPagesCount={TotalPagesCount}/>
                </div>
                <ProductsSlider products={PRODUCTS} title={"From People's Favorites"}/>
            </Content>
            

        </Container>
    )
}