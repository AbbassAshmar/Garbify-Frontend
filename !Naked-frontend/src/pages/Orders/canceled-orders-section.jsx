import styled from "styled-components";
import { ORDERS } from "../../components/products-data";
import Loading from "../../components/Loading/loading";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { userStateContext } from "../../Contexts/user-state";
import { useFetchData } from "../../hooks/use-fetch-data";
import { NoOrdersContainer, NoOrdersTitle } from "./orders-section";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { constructUrl } from "./orders";
import { PRODUCTS } from "../../components/products-data";

export default function CanceledOrdersSection(){
    const {token} = useContext(userStateContext);
    const [searchParams,setSearchParams] = useSearchParams();

    let init = { headers:{"Authorization":"Bearer " + token} }
    let endpoint_url = "http://127.0.0.1:8000/api/users/user/orders/canceled";
    let url = constructUrl(endpoint_url,searchParams)
    let {data, error, loading } = useFetchData(url , init, [searchParams]);
    let orders = data?.data.orders || ORDERS;

    if (loading){
        return <Loading />
    }

    return (
        <NoOrdersContainer>
            <NoOrdersTitle>
                You haven't canceled any order yet !<br/>
                keep it clean 
            </NoOrdersTitle>
            <ProductsSlider  title={"You may like to order : "} products={PRODUCTS}/>
        </NoOrdersContainer> 
    )
}