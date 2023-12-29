import styled from "styled-components";
import {useLayoutEffect, useRef, useState } from "react";
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
import { useFetchData, useSendRequest } from "../../hooks/use-fetch-data";
import Loading from "../../components/Loading/loading";
import useUserState from "../../hooks/use-user-state";

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
outline:none;
`

//used to adjust the width of the TitleInput 
const HiddenSpan = styled.span`
font-size:clamp(.9rem,3vw,1.5rem);
font-weight:600;
position:absolute;
top:140px;
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
    const userContext = useUserState();
    const {sendRequest, isServerError} = useSendRequest(userContext);
    const [searchParams,setSearchParams] = useSearchParams();

    // request favorites list info 
    let favorites_list_url= "/api/users/user/favorites_list";
    let {data:favoritesListData, error:favoritesListError, loading:favoritesListLoading,setData} = useFetchData(favorites_list_url,[],userContext)
    let favoritesList = favoritesListData?.data || FAV_LISTS[0]

    const [useTitleInput, setUseTitleInput] = useState(false);
    const [titleText, setTitleText] = useState(favoritesList.name)

    const spanRef = useRef(null)
    const editIconRef= useRef(null)
    const [titleInputWidth,setTitleInputWidth]  = useState(spanRef &&spanRef.current ?spanRef.current.offsetWidth:170)
    

    // request favorites 
    let favorites_url = constructUrl("/api/users/user/favorites",searchParams)
    let {data:favoritesData, error:errorFavorites, loading:loadingFavorites} = useFetchData(favorites_url,[searchParams],userContext)

    let [favorites,favoritesCount, TotalPagesCount] =[
        favoritesData?.data?.favorites||PRODUCTS,
        favoritesData?.metadata?.pages_count || 0 ,
        favoritesData?.metadata?.total_count || 0
    ]
  

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);
        setSearchParams({'q':data.get("q")});
    }

    function handleTitleTextChange(e){
        setTitleText(e.target.value)
    }

    async function handleRequestNameUpdate(){
        let update_favorites_list_uri =  "/api/favorites_list/"+favoritesList.id;
        let patch_request_init = {
            method : "PATCH",
            body: {'name' : titleText},
        } 

        let {request,response} = await sendRequest(update_favorites_list_uri, patch_request_init)
        if (request.status == 200 && response?.name){
            setData({...favoritesListData ,name:update_request.name})
            setTitleText(favoritesList.name)
        }else{
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
            measureWidth()
            setUseTitleInput(true)
        }
    }   

    function handleTitleInputBlur(e){
        if (!(e.relatedTarget === editIconRef.current)){
            handleRequestNameUpdate()
            setUseTitleInput(false)
        }
    }

    const replaceSpaces = (text) => {
        return text.replace(/ /g, '\u00A0');
    };

    const measureWidth = () => {
        if (spanRef.current) {
          let spanWidth = spanRef.current.offsetWidth;
          setTitleInputWidth(spanWidth);
        }
      };
    
    useLayoutEffect(()=>{
        if (spanRef.current) {
            // Replace spaces in titleText with a non-breaking space
            const textWithNoSpaces = replaceSpaces(titleText);
            // Set the text content of the span
            spanRef.current.textContent = textWithNoSpaces;
            measureWidth()
        }
    },[titleText,spanRef])

    if(loadingFavorites){
        return (
            <Loading />
        )
    }

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
                                            maxLength="33"
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
                            <ProductsSlider title={"Might be your first favorite"} url={"/api/favorites?limit=10"}/>
                        </NoFavoritesContainer>
                    </>
                }
            </Content>
        </Container>
    )
}