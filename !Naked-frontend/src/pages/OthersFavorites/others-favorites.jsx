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

function handleSearchFormSubmit (){

}

export default function OthersFavorites(){
    const [searchInputValue, setSearchInputValue]=useState("")
    const [favoritesLists, setFavoritesLists]  = useState(FAV_LISTS)
    const [favoritesListsCount, setFavoritesListsCount] = useState(210)
    const [TotalPagesCount,setTotalPagesCount] = useState(40)
    const [CurrentPage, setCurrentPage] = useState(1)

    const [searchParams , setSearchParams ] = useSearchParams();

    // update currentPage according to page query string
    useEffect(()=>{
        let page_number = parseInt(searchParams.get("page"));
        if (!page_number){
            page_number = 1;
        }
        setCurrentPage(page_number);
    },[searchParams])

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
                        setSearchInputValue={setSearchInputValue}
                        searchInputValue={searchInputValue}
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