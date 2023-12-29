import styled from "styled-components";
import {Title, constructUrl } from "../Orders/orders";
import { FAV_LISTS, PRODUCTS } from "../../components/products-data";
import SearchSort from "../../components/SearchSort/search-sort"
import  FavoriteListCard  from "../../components/FavoriteListCard/favorite-list-card";
import Pagination from "../../components/Pagination/pagination";
import { useSearchParams } from "react-router-dom";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { Content , Products ,Header} from "../../components/StyledComponents/styled-components";
import { useFetchData } from "../../hooks/use-fetch-data";
const Container = styled.div`

`
export const DetailsContainer = styled.div`
display:flex;
flex-direction:column;
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
    const [searchParams , setSearchParams ] = useSearchParams();

    // request favorites lists of other users
    let favorites_lists_url = constructUrl("http://127.0.0.1:8000/api/favorites_lists",searchParams)
    let {
        data:favoritesListsData,
        error:errorFavoritesLists,
        loading:loadingFavoritesLists 
    } = useFetchData(favorites_lists_url,{},[searchParams]);

    let [favoritesListsCount, TotalPagesCount,favoritesLists] = [0 , 0 , null];

    if (favoritesListsData){
        favoritesListsCount = favoritesListsData['metadata']['total_count'];
        TotalPagesCount = favoritesListsData['metadata']['pages_count']
        favoritesLists = favoritesListsData['data'];
    }

    //default for dev
    favoritesLists = FAV_LISTS;
    TotalPagesCount = 9;
    favoritesListsCount=23;
    
    // request slider products of other users
    let favorites_url = "http://127.0.0.1:8000/api/favorites?limit=10";
    let {data:favorites,error:errorFavorites,loading:loadingFavorites} = useFetchData(favorites_url);
    let sliderProducts = null ;
    if (favorites){
        sliderProducts = favorites['data']
    }

    //default for dev
    sliderProducts = PRODUCTS;

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
                                        liked = {list.is_liked_by_current_user}
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