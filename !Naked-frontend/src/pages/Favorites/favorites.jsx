import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { userStateContext } from "../../Contexts/user-state";
import {useSearchParams} from "react-router-dom";
import { NoOrdersContainer, NoOrdersTitle, constructUrl, Title} from "../Orders/orders";
import ProductCard from "../../components/ProductCard/product-card";
import { PRODUCTS } from "../../components/products-data";
import { Header,Products ,Content} from "../../components/StyledComponents/styled-components";
import Pagination from "../../components/Pagination/pagination";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import SearchSort from "../../components/SearchSort/search-sort"
import PublicPrivateButton from "../../components/PublicPrivateButton/public-private-button";
import { requestData } from "../OtherUsersFavorites/other-users-favorites";
import LikesViews from "../../components/LikesViews/likes-views";
import { FAV_LISTS } from "../../components/products-data";
const Container = styled.div`
width:100%;
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
min-width:170px;
// min-width:${({min_width})=>min_width};

`
const TitleInput = styled.input`
font-weight:600;
min-width:1px;
font-size:clamp(1.1rem,3vw,1.5rem);
border:none;
background:white;
outline:none;
// min-width:${({width})=>width};

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
    const [favoritesList, setFavoritesLIst] = useState(FAV_LISTS[0])
    const [TotalPagesCount, setTotalPagesCount] = useState(30)

    const [title, setTitle] = useState(false);
    const [titleText, setTitleText] = useState("Your Favorites")

    const {token} = useContext(userStateContext);
    const [searchParams,setSearchParams] = useSearchParams();

    // // request favorites lists of other users
    // useEffect(()=>{
    //     // request data whenever search params change 
    //     let init = {
    //         headers:{
    //             "Authorization" : "Bearer " + token,
    //             "content-type ": "application/json",
    //             "accept ": 'application/json'
    //         }
    //     }

    //     let endpoint_url = "http://127.0.0.1:8000/api/users/user/favorites"
    //     let url = constructUrl(endpoint_url,searchParams);
    //     let data = requestData(url,init)
    //     if (data){
    //         setFavorites(data['data']);
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

    function handleEditIconClick(e){
        setTitle(!title)
    }   

    function handleTitleTextChange(e){
        setTitleText(e.target.value)
    }

    function handleTitleFormSubmit(e){
        e.preventDefault();
        //request title edit 
    }

    function getStringLengthPixel(string){
        let len = 0;
        let px_15 = ['a','z','x','c','e','v','y'];
        let px_13 = ['s'];
        let px_10 = ['t','r'];
        let px_9= ['i','l','f'];
        let px_7= ['j','i','l',' '];
        let px_16 = ['k'];
        let px_17 = ['q','u','n','p','b','h','g'];
        let px_21 = ['O', 'D']
        let px_22 = ['w'];
        let px_23 = ['M']
        let px_26 = ['m'];
        let px_28 = ["W"];
        
        [...string].forEach((char)=>{    
            if (px_26.includes(char)){
                len += 2
            }
            else if(px_22.includes(char)){
                len+=1
            }
            else if(px_23.includes(char)){
                len+=1
            }
            else if (px_21.includes(char)){
                len+=1
            }
            else if(px_17.includes(char)){
                len+=1
            }
            else if(px_16.includes(char)){
                len+=1
            }
            else if(px_15.includes(char)){
                len+=1
            }
            else if(px_13.includes(char)){
                len+=1
            }
            else if (px_10.includes(char)) {
                len+=1
            }
            else if (px_9.includes(char)) {
                len+=1
            }
            else if (px_7.includes(char)){
                len+=1
            }
            else if (px_28.includes(char)){
                len+=2
            }
            else {
                len+=1
            }
        })
        return len;
    }

    return (
        <Container>
            <Content>
                <Header>
                    <div style={{display:"flex",flexDirection:"column", gap:"10px"}}>
                        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",width:'100%'}}>
                            <div style={{display:"flex", gap:"20px",alignItems:"center"}}>
                                {
                                    !title ?
                                    <Title>{titleText}</Title>
                                    :
                                    <TitleForm onSubmit={handleTitleFormSubmit}>
                                        <TitleInput 
                                            style={{width:`${Math.max(getStringLengthPixel(titleText),4)}ch`}}
                                            autoFocus={true}
                                            type="text" 
                                            value={titleText} 
                                            onChange={handleTitleTextChange}
                                            maxLength="20"
                                        />
                                    </TitleForm>
                                }
                                <div style={{display:"flex", gap:"10px",alignItems:"flex-end",}}>
                                    <i onClick={handleEditIconClick} style={{cursor:"pointer"}} className="fa-regular fa-pen-to-square"/>
                                    <p style={{fontWeight:"600", fontSize:"clamp(.6rem , 2vw ,.9rem)",opacity:'.7'}}>displayed for others</p>
                                </div>
                            </div>
                            <PublicPrivateButton />
                        </div>
                        <LikesViews disabled={true} views={favoritesList["views_count"]} likes={favoritesList["likes_count"]}/>
                    </div>
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
                    <Pagination TotalPagesCount={TotalPagesCount}/>
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