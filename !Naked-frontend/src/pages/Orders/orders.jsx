import styled from 'styled-components';
import OrderCard from '../../components/OrderCard/order-card';
import { useState ,useContext, useEffect} from 'react';
import { userStateContext } from '../../Contexts/user-state';
import { useSearchParams } from 'react-router-dom';
import ProductsSlider from '../../components/ProductsSlider/products-slider';
import { PRODUCTS } from "../../components/products-data";
import SearchSort from '../../components/SearchSort/search-sort';
import Pagination from '../../components/Pagination/pagination';
import { requestData } from '../OtherUsersFavorites/other-users-favorites';
import { ORDERS } from '../../components/products-data';
import { Header,Content } from '../../components/StyledComponents/styled-components';
import { useFetchData } from '../../hooks/use-fetch-data';

//max-width: 1500px;
const Container = styled.div`
width:100%;
// box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
`


export const Title = styled.div`
font-weight:600;
background:red;
text-wrap:nowrap;
font-size:clamp(1.1rem,3vw,1.5rem);
`

const PagesContainer = styled.div`
display:flex;
gap:max(7%,20px);
border-bottom:1px solid black;
height:30px;
font-size:1rem;
font-weight:600;
`
const PageTitle = styled.p`
cursor:pointer;
margin:0;
height:30px;
box-sizing:border-box;
color:${({color})=> color};
border-bottom:1px solid ${({color})=> color};
transition:all .3s;
&:hover{
    opacity:.6;
}

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
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
const Custom_Content = styled(Content)`
@media screen and (max-width: 600px){
    padding:min(2rem ,5%);
}
`
const Custom_Header = styled(Header)`
@media screen and (max-width: 600px){
    padding:0;
}
`
const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "total_cost-DESC":"Price: High-Low",
    "total_cost-ASC":"Price: Low-High",
}

// add current search params to the end of a url
export function constructUrl(url, searchParams, urlParams=null, addition=null){
    if (addition){
        url += addition;
    }
   
    let addedQueryStrings= "?"

    // add urlParams '/parm1/param2' as ?categories[]= 
    if (urlParams && urlParams['*']){
        let urlParamsList=  urlParams['*'].split('/')
        if (urlParamsList.length > 0){
            addedQueryStrings+= "categories[]="+urlParamsList.join('&categories[]=')
        }
    }

    // add searchParams '?color=...' as they are
    if (searchParams){
        for (let [key, value] of searchParams.entries()){
            addedQueryStrings  = addedQueryStrings  +key +"=" +value +"&"
        }
    }
    addedQueryStrings = addedQueryStrings.slice(0,-1)
    url +=  (addedQueryStrings ==="?" ? "":addedQueryStrings)
    return url;
}


export default function Orders(){
    const [page,setPage] = useState("orders")
    const {token} = useContext(userStateContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const [TotalPagesCount, setTotalPagesCount] = useState(40)

    let init = { headers:{"Authorization":"Bearer " + token} }
    let endpoint_url = "http://127.0.0.1:8000/api/orders";
    let url = constructUrl(endpoint_url,searchParams,null,page=="orders"?"":"/"+page)
    let {data, error, loading } = useFetchData(url , init, [searchParams,page]);
    data = ORDERS;
    

    if (loading){
        return <p>loading...</p>
    }

    function handlePageTitleClick(page){
        setPage(page);
    }

    function handleSearchFormSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target)
        setSearchParams({'q':data.get("q")});
    }

    return (
        <Container>
            <Custom_Content>
                <Custom_Header>
                    <Title>
                        My Orders
                    </Title>
                    <SearchSort 
                        placeholder={"search your orders"} 
                        sortOptions={OrderBytoSortBy} 
                        handleSearchFormSubmit={handleSearchFormSubmit}
                    />
                    <PagesContainer>
                        <PageTitle onClick={()=>handlePageTitleClick("orders")} color={page ==="orders" ?" #00C2FF":"black"}>orders</PageTitle>
                        <PageTitle onClick={()=>handlePageTitleClick("canceled")} color={page ==="canceled" ?" #00C2FF":"black"}>canceled orders</PageTitle>
                    </PagesContainer>
                </Custom_Header>
                { 
                    data && data.length > 0 ?
                    <>
                        <OrderCardsContainer>
                            {   
                                data.map((order)=>{
                                    return <OrderCard key={order.id} order={order} />
                                })
                            }
                        </OrderCardsContainer>
                        <Pagination TotalPagesCount={TotalPagesCount} />
                    </>
                    :
                    <>
                        {
                            page === "canceled" &&

                            <NoOrdersContainer>
                                <NoOrdersTitle>
                                    You haven't canceled any order yet !<br/>
                                    keep it clean 
                                </NoOrdersTitle>
                                <ProductsSlider  title={"You may like to order : "} products={PRODUCTS}/>
                            </NoOrdersContainer> 
                        }
                        {
                            page === "orders" &&
                            <NoOrdersContainer>
                                <NoOrdersTitle>
                                    You haven't ordered anything yet !
                                </NoOrdersTitle>
                                <ProductsSlider  title={"You may like to order : "} products={PRODUCTS}/>
                            </NoOrdersContainer>
                        
                        }
                    </>
                }
            </Custom_Content>
        </Container>
    )
}
// $table->id();
// $table->timestamps();
// $table->text("status");
// $table->integer("total_cost");
// $table->integer("tax_cost")->default(0);
// $table->integer("products_cost")->default(0);
// $table->dateTime("canceled_at")->nullable();
// $table->foreignId("shipping_address_id")->nullable()->constrained()->onDelete("set Null");
// $table->foreignId("user_id")->nullable()->constrained()->onDelete("set Null");
// $table->foreignId("shipping_method_id")->nullable()->constrained()->onDelete("set Null");

//order detail 

// $table->id();
// $table->timestamps();
// $table->foreignId("order_id")->constrained()->onDelete("cascade");
// $table->foreignId("product_id")->nullable()->constrained()->onDelete("set null");
// $table->integer("ordered_quantity")->default(1);
// $table->foreignId('color_id')->nullable()->constrained()->onDelete("set null");
// $table->foreignId("size_id")->nullable()->constrained()->onDelete("set null");
// $table->integer("product_total_price")->default(0);

// shipping_address

// $table->id();
// $table->timestamps();
// $table->foreignId("user_id")->nullable()->constrained()->onDelete("set null");
// $table->text("country");
// $table->text("city");
// $table->text("state")->nullable();
// $table->text("address_line_1");
// $table->text("address_line_2")->nullable();
// $table->text("postal_code")->nullable();
// $table->text("email");
// $table->text("phone_number");
// $table->text("recipient_name");

