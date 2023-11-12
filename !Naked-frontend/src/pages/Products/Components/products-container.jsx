import styled from "styled-components"
import ProductCard from "../../../components/ProductCard/product-card"
import Pagination from "../../../components/Pagination/pagination"
import { useEffect, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { PRODUCTS } from "../../../components/products-data"
import { requestData } from "../../OtherUsersFavorites/other-users-favorites"
import { Products } from "../../../components/StyledComponents/styled-components"
import { constructUrl } from "../../Orders/orders"

const Container = styled.div`
flex:4;
display:flex;
flex-direction:column;
`
const TagsContainer= styled.div`
display:flex;
gap:2%;
margin: 0 0 13px 0;

`
const Tag = styled.button`
background:none;
height:50px;
min-width:100px;
padding:5px;
color:white;
border-radius:7px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
&:hover{
    border:1px solid #00C2FF ;
    background:rgba(189, 189, 189,.1);
}
`
const TagText = styled.p`
overflow:hidden;
text-overflow:ellipsis;
height:1.1em;
color:black;
`


// api/products 
// all products 

// api/products?category[]=shoes 
// all shoes 

// api/products?category[]=shoes&category[]=running 
// all running shoes 

// api/products?category[]=shoes&category[]=running&size=32&color=red
// all running shoes where size = 32 and color=red category + filter 

// api/products?category[]=shoes&category[]=running&size=32&color=red&anything=anything
// all running shoes where size = 32 and color=red category + filter ignoring anything 

// products model , category model , shoes model, shirts model , suits model ,


//remove a tag from filter tags
export function handleTagRemove(searchParams,setSearchParams,key){
    console.log(searchParams.get("color"));
    searchParams.delete(key)
    setSearchParams(searchParams)
}

export default function ProductsContainer(props){
    const [TotalPagesCount,setTotalPagesCount] = useState(40)
    const [products , setProducts ] = useState(PRODUCTS);
    const [searchParams , setSearchParams ] = useSearchParams();
    const urlParametersList = useParams()['*'].split('/')

    // useEffect(()=>{

    //     let endpoint_url = "http://127.0.0.1:8000/api/products"
    //     endpoint_url+=(urlParametersList.length>0)?"?categories[]="+urlParametersList.join('&categories[]='):""
    //     let url = constructUrl(endpoint_url,searchParams);
    //     let data = requestData(url)

    //     if (data){
    //         setProducts(data.products);
    //         setTotalPagesCount();
    //     }
    // },[])
 
    // create an object of query strings 
    const searchParamsObj = ()=>{
        const tempObj= {};
        for  (let [key,value] of searchParams.entries()){
            tempObj[key] = value
        }
        return tempObj
    }

    return (
        <Container>
            <TagsContainer>
                {
                    Object.keys(searchParamsObj()).map((tag)=>{
                        if (tag=="price"){
                            let prices = searchParamsObj()[tag].split('-');
                            return (
                                <Tag onClick={()=>{handleTagRemove(searchParams,setSearchParams,tag)}}>
                                    <TagText>
                                        {prices[0]}$  -  {prices[1]}$ x
                                    </TagText>
                                </Tag>
                            )
                        }
                        if (tag=="color" || tag=="size"){
                            return (
                                <Tag onClick={()=>{handleTagRemove(searchParams,setSearchParams,tag)}}>
                                    <TagText>{searchParamsObj()[tag]} x</TagText>
                                </Tag>
                            )
                        }
                    })
                }
            </TagsContainer>
            <div style={{display:'flex', flexDirection:'column',gap:'min(7vh,40px)'}}>
            <Products>
                {products && products.map((product) =>{
                    return (
                        <ProductCard
                            key={product.pk}
                            pk ={product.pk}
                            name={product.name} 
                            price={product.price} 
                            quantity={product.quantity}
                            colors={product.colors}
                            type={product.type}
                            thumbnail={product.thumbnail}
                            sale={product.sale}
                        />
                    )
                })}
            </Products>
            <Pagination TotalPagesCount={TotalPagesCount} />
            </div>
        </Container>
    )
}