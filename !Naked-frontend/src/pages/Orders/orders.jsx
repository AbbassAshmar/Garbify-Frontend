import styled from 'styled-components';
import OrderCard from '../../components/OrderCard/order-card';
import { useState ,useContext, useEffect} from 'react';
import { userStateContext } from '../../Contexts/user-state';
import SortByButton from '../../components/SortByButton/sort-by-button';
import hoody from '../../assets/hoody.jpg'
import hoody2 from "../../assets/hoody2.jpg"
import { useSearchParams } from 'react-router-dom';
import ProductsSlider from '../../components/ProductsSlider/products-slider';
import { pp } from '../Products/Components/products-container';
//max-width: 1500px;
const Container = styled.div`
width:100%;
// box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
`

const Content = styled.div`
width:85%;
max-width:1500px;
padding:min(2rem ,5%) 0;
margin:auto;
display:flex;
gap:min(5vh,30px);
flex-direction:column;
font-size:1.1rem;
font-weight:400;

@media screen and (max-width:800px){
    width:100%;
    padding:min(2rem ,5%);
}
`
const Header = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:min(5vh,30px);
`
const Title = styled.div`
font-size:1.3rem;
font-weight:600;
`
const SearchSortContainer = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
@media screen and (max-width:600px){
    flex-direction:column;
    align-items:start;
    gap:min(5vh,30px);
}
`
const SearchBarContainer =styled.form`
position:relative;
width:50%;
height:100%;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
@media screen and (max-width:600px){
    width:100%;
}

`
const SearchBar= styled.input`
box-shadow: 1px 1px 10px rgba(189, 189, 189,1);
width:100%;
border:none;
border-radius:2px;
font-weight:600;
padding:.3rem;
padding-left: min(2rem,11%);
border-radius:2px;
&:focus{
    outline:1px solid #00C2FF;
}

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}


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
const NoOrdersContainer = styled.div`
display:flex;
flex-direction:column;
gap:2rem;
`
const NoOrders =styled.p`
font-size:1.3rem;
@media screen and (max-width:800px){
    font-size:1rem;
}
color:black;
font-weight:600;

`
const SORT_BUTTON_STYLE = {
    background:'white',
    height:'100%',
    display:'flex',
    fontSize:'16px',
    padding:'0 3%',
    borderRadius:'2px',
    boxShadow:'1px 1px 10px rgba(189, 189, 189,1)',
}

export default function Orders(){
    const [page,setPage] = useState("orders")
    const [orders, setOrders] = useState(os);
    const {token} = useContext(userStateContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInputValue , setSearchInputValue]  = useState('')

    useEffect(()=>{
        if (page== "canceled"){
           setOrders(requestOrders(page,constructUrl(page),token))
        }
        else {
            setOrders(requestOrders(null,constructUrl(page),token))
        }
    },[page])

    function handlePageTitleClick(page){
        setPage(page);
    }

    function constructUrl(canceled, searchParams){
        let url = "http://127.0.0.1:8000/api/orders";
        if (canceled){
            url += "/canceled";
        }
        let searchParamsString= "?"
        if (searchParams){
            for (let [key, value] of searchParams.entries()){
                searchParamsString  = searchParamsString  +key +"=" +value +"&"
            }
        }
        searchParamsString = searchParamsString.slice(0,-1)
        url +=  (searchParamsString ==="?" ? "":searchParamsString)
        return url;
    }
    
    async function requestOrders(canceled=null,url,token){
        // "http://127.0.0.1:8000/api/orders"
        const request = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization":"Bearer " + token,
            }
        });
        const response = await request.json(); 
        if ( request.status == 200){
            return response.orders;
        }
        return [];
    }



    function handleSearchFormSubmit (e){
        e.preventDefault();
        setSearchParams({'q':searchInputValue});

        // request search result 
        if (page== "canceled"){
           setOrders(requestOrders(page,constructUrl(page),token))
        }else{
            setOrders(requestOrders(null,constructUrl(page),token))
        }


    }

    // search on input value change, if url initiated with string params, they are replaced with 'q'
    // if 'q' is already in the url, and other params are added later, 'q' is preserved 
    // apply sorting, pagination ... to search results by not removing q when applied 
    // useEffect(()=>{
    //     if (searchInputValue != "")
    //     setSearchParams({'q':searchInputValue});
    // }, [searchInputValue])

    const OrderBytoSortBy={
        "name-ASC":"From A-Z",
        "created_at-DESC":"Newest-Oldest",
        "created_at-ASC":"Oldest-Newest",
        "total_cost-DESC":"Price: High-Low",
        "total_cost-ASC":"Price: Low-High",
    }

    return (
        <Container>
            <Content>
                <Header>
                    <Title>
                        Order History
                    </Title>
                    <SearchSortContainer>
                        <SearchBarContainer onSubmit={handleSearchFormSubmit}>
                            <SearchBar placeholder='search you orders' type="text" value={searchInputValue} onChange={(e)=>setSearchInputValue(e.target.value)}  />
                            <i style={{position:'absolute', left:"2%",top:"25%"}} className="fa-solid fa-magnifying-glass"/>
                        </SearchBarContainer>
                        <SortByButton style={SORT_BUTTON_STYLE} optionsObj={OrderBytoSortBy} />
                    </SearchSortContainer>
                    <PagesContainer>
                        <PageTitle onClick={()=>handlePageTitleClick("orders")} color={page ==="orders" ?" #00C2FF":"black"}>orders</PageTitle>
                        <PageTitle onClick={()=>handlePageTitleClick("canceled")} color={page ==="canceled" ?" #00C2FF":"black"}>canceled orders</PageTitle>
                    </PagesContainer>
                </Header>
                { orders && orders.length > 0 ?
                    <OrderCardsContainer>
                        {   
                            orders.map((order)=>{
                                return <OrderCard order={order} />
                            })
                        }
                    </OrderCardsContainer>
                    
                    :
                    <>
                    {
                        page === "canceled" &&

                        <NoOrdersContainer>
                            <NoOrders>
                                You haven't canceled any order yet !<br/>
                                keep it clean 
                            </NoOrders>
                            <ProductsSlider  title={"You may like to order : "} products={pp}/>
                        </NoOrdersContainer> 
                    }
                    {
                        page === "orders" &&
                        <NoOrdersContainer>
                            <NoOrders>
                                You haven't ordered anything yet !
                            </NoOrders>
                            <ProductsSlider  title={"You may like to order : "} products={pp}/>
                        </NoOrdersContainer>
                    
                    }
                    </>

                }
                
            </Content>
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

const os = [
    {
        id : 1,
        created_at:"2023-10-10", 
        status:'paid',
        total_cost:1000, 
        canceled_at:null,
        shipping_state : "shipping in 4 days",
        recipiant_name:"abbass ashmar",

        products:[
            {
                id:1,
                thumbnail:hoody,
                name:'shoes ultra shit',
                ordered_quantity:2,
                return_cancellation_info:"return available till 2/2/2022" // calculated
            },
            {
                id:1,
                thumbnail:hoody2,
                name:'some shoe made by utilizing child labor and it sucks ultra shit',
                ordered_quantity:2,
                return_cancellation_info:"return available till 2/2/2022" // calculated
            }
        ]
    },
    {
        id : 1,
        created_at:"2023/10/10", 
        status:'delivered',
        total_cost:1000, 
        canceled_at:null,
        shipping_state : "Delivered since 9/11/2001",
        recipiant_name:"mahmood lsoory",

        products:[
            {
                id:1,
                thumbnail:hoody,
                name:'shoes ultra shit fake name goes wild i hate black people',
                ordered_quantity:2,
                return_cancellation_info:"return available till 9/4/2022" // calculated
            },
            
        ]
    },
    
]