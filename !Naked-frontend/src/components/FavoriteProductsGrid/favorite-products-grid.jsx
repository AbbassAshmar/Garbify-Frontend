import styled from "styled-components";
import Pagination from "../../components/Pagination/pagination";
import ProductCard from "../../components/ProductCard/product-card";
import { constructUrl } from "../../pages/Orders/orders";
import { useFetchData } from "../../hooks/use-fetch-data";
import useUserState from "../../hooks/use-user-state";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { NoOrdersContainer, NoOrdersTitle } from "../../pages/Orders/orders-section";
import { PRODUCTS } from "../../components/products-data";
import { Products } from "../../components/StyledComponents/styled-components";

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

export default function FavoriteProductsGrid({url}){
    const userContext = useUserState();
    const [searchParams] = useSearchParams();

    let favorites_url = constructUrl(url,searchParams)
    let {data, error, loading} = useFetchData(favorites_url,[searchParams],userContext)

    let [favorites,favoritesCount, TotalPagesCount] =[
        data?.data?.favorites||PRODUCTS,
        data?.metadata?.pages_count || 0 ,
        data?.metadata?.total_count || 0
    ]

    if (loading){
        return <Loading />
    }

    return (
        <>
            {favorites && favorites.length > 0 ?
            <><Pagination TotalPagesCount={TotalPagesCount}/>
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
            <Pagination TotalPagesCount={TotalPagesCount}/></>:
            <>
                <NoFavoritesContainer>
                    <NoFavoritesTitls>
                        You don't have any favorites yet !
                    </NoFavoritesTitls>
                    <ProductsSlider title={"Might be your first favorite"} url={"/api/favorites?limit=10"}/>
                </NoFavoritesContainer>
            </>
            }
        </>
    )
}