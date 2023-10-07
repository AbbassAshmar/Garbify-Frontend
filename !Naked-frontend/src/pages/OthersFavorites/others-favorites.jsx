import styled from "styled-components";
import  FavoriteListCard  from "../../components/FavoriteListCard/favorite-list-card";
import InteractiveHeader from "../../components/InteractiveHeader/interactive-header";
import { useState } from "react";
import { Content ,Header} from "../Orders/orders";
import { Products } from "../Products/Components/products-container";
import { FAV_LISTS } from "../../components/products-data";

const Container = styled.div`

`
const FavoritesListsContainer= styled(Products)`
width:100%;
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
    return(
        <Container>
            <Content>
                <Header>
                    <InteractiveHeader 
                        title={"Your Favorites"} 
                        placeholder={"search your favorites"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                        setSearchInputValue={setSearchInputValue}
                        searchInputValue={searchInputValue}
                    />
                </Header>
                
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
            </Content>
            

        </Container>
    )
}