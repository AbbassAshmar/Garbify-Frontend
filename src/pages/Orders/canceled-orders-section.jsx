import styled from "styled-components";
import { ORDERS } from "../../components/products-data";
import Loading from "../../components/Loading/loading";
import { useSearchParams } from "react-router-dom";
import { useFetchData } from "../../hooks/use-fetch-data";
import { NoOrdersContainer, NoOrdersTitle } from "./orders-section";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { constructUrl } from "./orders";
import Pagination from "../../components/Pagination/pagination";
import CanceledOrderCard from "../../components/CanceledOrderCard/caceled-order-card";
import useUserState from "../../hooks/use-user-state";

const OrderCardsContainer = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
`


export default function CanceledOrdersSection(){
    const userState = useUserState();
    const [searchParams,setSearchParams] = useSearchParams();

    let endpoint_url = "/api/users/user/orders/canceled";
    let url = constructUrl(endpoint_url,searchParams)
    let {data, error, loading } = useFetchData(url ,[searchParams] ,userState);
    let orders = data?.data.orders || ORDERS;
    let TotalPagesCount =data?.metadata.pages_count || 30;

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
                            return <CanceledOrderCard key={order.id} order={order} />
                        })
                    }
                </OrderCardsContainer>
                <Pagination TotalPagesCount={TotalPagesCount} />
            </>
            :
            <NoOrdersContainer>
                <NoOrdersTitle>
                    You haven't canceled any order yet !<br/>
                    keep it clean 
                </NoOrdersTitle>
                <ProductsSlider  title={"You may like to order : "} url={"/api/favorites?limit=10"}/>
            </NoOrdersContainer> 
        }
        </>
    )
}