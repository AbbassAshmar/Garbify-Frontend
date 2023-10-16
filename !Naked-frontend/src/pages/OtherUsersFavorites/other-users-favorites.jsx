import styled from "styled-components"
import { Content, Header, Title,constructUrl } from "../Orders/orders"
import { useState, useEffect } from "react"
import SearchSort from "../../components/SearchSort/search-sort"
import { useLocation, useParams, useSearchParams } from "react-router-dom"

const Container = styled.div`

`
const DetailsContainer= styled.div`
display:flex;
flex-direction:column;
gap:10px;
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

const ActionsDropDownContainer = styled.div`

`

const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}

export async function requestData(url){
    const request = await fetch(url);
    const response = await request.json();
    if (request.status == 200)
        return response
    return []
}

export default function OtherUsersFavorites(){
    const [favoritesList, setFavoritesList] = useState({})
    const [favorites, setFavorites] = useState([])
    const [favoritesCount , setFavoritesCount] = useState(0)
    const [TotalPagesCount,setTotalPagesCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const {favorites_list_id} = useParams();

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

    // // request favorites list info of other user
    // useEffect(()=>{
    //     let url ="http://127.0.0.1:8000/api/favorites_lists/"+favorites_list_id
    //     let data = requestData(url)
    //     if (data) {
    //         setFavoritesList(data['data'])
    //     }
    // },[])

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
                        <div>                    
                            <Title>User's Favorites List (303)</Title>
                            <ActionsDropDownContainer>
                                <i class="fa-solid fa-ellipsis-vertical"/> 
                                <DopDown>
                                    <Action>add all to my favorites</Action>
                                </DopDown>
                            </ActionsDropDownContainer>
                        </div>
                        <UsernameDate>
                            by Username | Modified at 22-08-2023
                        </UsernameDate>
                        <InteractionsContianer>
                            <Views>
                                <i className="fa-regular fa-eye"/>
                                <p>202</p>
                            </Views>
                            <Likes>
                                <i className="fa-solid fa-thumbs-up"/>
                                <p>303</p>
                            </Likes>
                        </InteractionsContianer>
                    </DetailsContainer>
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