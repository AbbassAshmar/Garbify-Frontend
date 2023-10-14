import styled from "styled-components"
import { Content, Header, Title } from "../Orders/orders"
import { useState } from "react"
import SearchSort from "../../components/SearchSort/search-sort"

const Container = styled.div`

`
const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}

export default function OtherUsersFavorites(){
    const [favoritesList, setFavoritesList] = useState({})
    const [favorites, setFavorites] = useState([])

    // update CurrentPage according to page query string
    useEffect(()=>{
        let page_number = parseInt(searchParams.get("page"));
        if (!page_number){
            page_number = 1;
        }
        setCurrentPage(page_number);
    },[searchParams])

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target)
        setSearchParams({'q':data.get("q")});

        // request search result 
        let url = constructUrl("http://127.0.0.1:8000/api/orders",searchParams,page=="orders"?"":"/"+page)
        setOrders(requestOrders(url,token))
    }

    // request favorites 

    // request favorites list info

    return (
        <Container>
            <Content>
                <Header>
                    <Title>User's Favorites List (303)</Title>
                    <SearchSort 
                        placeholder={"search your orders"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
            </Content>
        </Container>
    )
}