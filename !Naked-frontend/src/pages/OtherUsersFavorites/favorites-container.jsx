import styled from "styled-components";
import { useFetchData } from "../../hooks/use-fetch-data";
import { FAV_LISTS, PRODUCTS } from "../../components/products-data"
import ProductCard from "../../components/ProductCard/product-card"
import Pagination from "../../components/Pagination/pagination"
import { Products } from "../../components/StyledComponents/styled-components";
import Loading from "../../components/Loading/loading";
import { constructUrl } from "../Orders/orders";
import { useParams, useSearchParams } from "react-router-dom";
import useUserState from "../../hooks/use-user-state";

const FavoritesProductsContainer = styled(Products)`
width:100%;
`

export default function FavoritesContainer(){
    const userContext = useUserState();
    const {favorites_list_id} = useParams();
    const [searchParams] = useSearchParams();

    // request favorites of other user
    let favorites_url = constructUrl("/api/favorites_lists/"+favorites_list_id+"/favorites",searchParams)
    let {
        data,
        error,
        loading,
        handleState:fetchData
    } = useFetchData(favorites_url,[searchParams],userContext);

    let favorites = data?.data?.favorites || PRODUCTS;
    let TotalPagesCount = data?.metadata?.pages_count || 0;

    console.log(favorites)
    if (loading){
        return <Loading />
    }


    return (
        <div style={{display:"flex", flexDirection:"column", gap:"min(7vh,40px)"}}>
            <Pagination TotalPagesCount={TotalPagesCount}/>
            <FavoritesProductsContainer>
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
            </FavoritesProductsContainer>
            <Pagination TotalPagesCount={TotalPagesCount}/> 
        </div>
    )
}