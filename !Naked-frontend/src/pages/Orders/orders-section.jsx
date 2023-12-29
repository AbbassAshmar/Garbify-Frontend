import styled from "styled-components";
import { constructUrl } from "./orders";
import Loading from "../../components/Loading/loading";
import { ORDERS } from "../../components/products-data";
import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { userStateContext } from "../../Contexts/user-state";
import { useFetchData } from "../../hooks/use-fetch-data";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import Pagination from "../../components/Pagination/pagination";
import OrderCard from "../../components/OrderCard/order-card";


const OrderCardsContainer = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
`


export const NoOrdersContainer = styled.div`
display:flex;
flex-direction:column;
gap:min(7vh,40px);

font-size:1rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}
`
export const NoOrdersTitle =styled.p`
font-weight:600;
opacity:.7;

font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1.1rem;
}
`
export default function OrdersSection(){
    const userContext = useContext(userStateContext);
    const [searchParams,setSearchParams] = useSearchParams();

    let endpoint_uri = "/api/users/users/orders";
    let url = constructUrl(endpoint_uri,searchParams)
    let {data, error, loading } = useFetchData(url,[searchParams],userContext);
    let orders = data?.data?.orders || ORDERS;
    let TotalPagesCount =data?.metadata?.pages_count || 30;

    if (loading){
        return <Loading />
    }

    return (
        <>
        {
            orders && orders.length> 0 ? 
            <>
                <OrderCardsContainer>
                    {   
                        orders.map((order)=>{
                            return <OrderCard key={order.id} order={order} />
                        })
                    }
                </OrderCardsContainer>
                <Pagination TotalPagesCount={TotalPagesCount} />
            </>
            :
            <NoOrdersContainer>
                <NoOrdersTitle>
                    You haven't ordered anything yet !
                </NoOrdersTitle>
                <ProductsSlider  title={"You may like to order : "} url={"/api/favorites?limit=10"}/>
            </NoOrdersContainer>
        }
        </>
    )
}