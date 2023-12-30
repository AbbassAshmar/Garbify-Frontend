import styled from "styled-components";
import {useSearchParams} from "react-router-dom";
import { Header ,Content} from "../../components/StyledComponents/styled-components";
import SearchSort from "../../components/SearchSort/search-sort"
import PublicPrivateButton from "../../components/PublicPrivateButton/public-private-button";
import LikesViews from "../../components/LikesViews/likes-views";
import { FAV_LISTS } from "../../components/products-data";
import { useFetchData } from "../../hooks/use-fetch-data";
import Loading from "../../components/Loading/loading";
import useUserState from "../../hooks/use-user-state";
import EditableTitle from "./editable-title";
import FavoriteProductsGrid from "../../components/FavoriteProductsGrid/favorite-products-grid";

const Container = styled.div`
width:100%;
`
const TopInfoContainer = styled.div`
display:grid;
grid-template-columns:repeat(2,1fr);
grid-gap:10px;
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
    "name+ASC":"From A+Z",
    "created_at+DESC":"Newest+Oldest",
    "created_at+ASC":"Oldest+Newest",
    "total_cost+DESC":"Price: High+Low",
    "total_cost+ASC":"Price: Low+High",
}

export default function Favorites(){
    const userContext = useUserState();
    const [searchParams,setSearchParams] = useSearchParams();

    // request favorites list info 
    let favorites_list_url= "/api/users/user/favorites_list";
    let {data, error, loading,setData} = useFetchData(favorites_list_url,[],userContext)
    let favoritesList = data?.data?.favorites_list || FAV_LISTS[0]
    
    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
        console.log(data)
    }

    if(loading){
        return (
            <Loading />
        )
    }

    return (
        <Container>
            <Content>
                <Header>
                    <TopInfoContainer>
                        <EditableTitle 
                        favoritesListTitle={favoritesList?.name} 
                        favoritesListId={favoritesList?.id} 
                        updateFavoritesListData={setData}/>    
                        <PublicPrivateWrapper><PublicPrivateButton/></PublicPrivateWrapper>
                        <span style={{gridRow:'2',alignSelf: 'end'}}>
                            <LikesViews disabled={true} views={favoritesList["views_count"]} likes={favoritesList["likes_count"]}/>
                        </span>
                    </TopInfoContainer>
                    <SearchSort 
                        placeholder={"search your favorites"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                </Header>
                <FavoriteProductsGrid url={"/api/users/user/favorites"} />
            </Content>
        </Container>
    )
}