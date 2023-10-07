import styled from "styled-components";
import InteractiveHeader from "../../components/InteractiveHeader/interactive-header";
import { useContext, useEffect, useState } from "react";
import { userStateContext } from "../../Contexts/user-state";
import {useLocation, useSearchParams} from "react-router-dom";
import {Header, NoOrdersContainer, NoOrdersTitle, constructUrl,Content} from "../Orders/orders";
import ProductCard from "../../components/ProductCard/product-card";
import { PRODUCTS } from "../../components/products-data";
import { Products } from "../Products/Components/products-container";
import Pagination from "../../components/Pagination/pagination";
import ProductsSlider from "../../components/ProductsSlider/products-slider";

const Container = styled.div`
width:100%;
`

const FavoriteProductsContainer = styled(Products)`
width:100%;
`

const NoFavoritesContainer = styled(NoOrdersContainer)`

`
const NoFavoritesTitls = styled(NoOrdersTitle)`

`

const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}


export default function Favorites(){
    const [favorites,setFavorites] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const {token} = useContext(userStateContext);
    const [searchParams,setSearchParams] = useSearchParams();
    const [CurrentPage, setCurrentPage ] = useState(1);

    // update CurrentPage according to page query string
    useEffect(()=>{
        let page_number = parseInt(searchParams.get("page"));
        if (!page_number){
            page_number = 1;
        }
        setCurrentPage(page_number);
    },[searchParams])

    async function requestFavorites(url,token){
        const request = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization":"Bearer " + token,
            }
        });
        const response = await request.json(); 
        if ( request.status == 200){
            return response.products;
        }
        return [];
    }

    function handleSearchFormSubmit (e){
        e.preventDefault();
        setSearchParams({'q':searchInputValue});

        // request search result 
        setFavorites(requestFavorites(constructUrl("http://127.0.0.1:8000/api/users/user/favorites",searchParams),token))
    }

    return (
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
                
                
                {
                favorites && favorites.length > 0 ?
                    <>
                    <FavoriteProductsContainer>
                        {
                            favorites.map((favorite)=>{
                                return (
                                    <ProductCard
                                        key={favorite.pk}
                                        pk ={favorite.pk}
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
                    <Pagination CurrentPage={CurrentPage} TotalPagesCount={30}/>
                    </>
                    :
                    <>
                        <NoFavoritesContainer>
                            <NoFavoritesTitls>
                                You don't have any favorites yet !
                            </NoFavoritesTitls>
                            <ProductsSlider title={"Might be your first favorite"} products={PRODUCTS}/>
                        </NoFavoritesContainer>
                    </>
                }
                
                
            </Content>
        </Container>
    )
}