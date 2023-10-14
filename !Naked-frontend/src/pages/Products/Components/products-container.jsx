import styled from "styled-components"
import ProductCard from "../../../components/ProductCard/product-card"
import Pagination from "../../../components/Pagination/pagination"
import { useEffect, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { PRODUCTS } from "../../../components/products-data"

const Container = styled.div`
flex:4;
display:flex;
flex-direction:column;
gap:min(5vh,1.5rem);
`
const TagsContainer= styled.div`
display:flex;
gap:2%;
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
export const Products = styled.div`

display:grid;
grid-template-columns:repeat(3,1fr);
justify-content:space-between;
grid-gap:20px;
@media screen and (max-width:1000px){
    grid-template-columns:repeat(2,1fr);
}
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


// generates a url that only changes the ?page query param (without changing other param)  
// export function getLink(url,pageNumber, urlParameters, searchParameters){
//     // add urlParameters to url      
//     for (let param in urlParameters){
//         url = url +"/"+urlParameters[param]
//     }

//     // add the page query string
//     url  = url + "?page="+pageNumber

//     // add other query strings
//     let searchParametersObj = searchParameters()
//     for (let key in  searchParametersObj){
//         if (key != "page"){
//             url = url + "&" +key +"="+searchParametersObj[key]
//         }
//     }
//     return url
// }


export default function ProductsContainer(props){
    const [TotalPagesCount,setTotalPagesCount] = useState(40)
    const [products , setProducts ] = useState(PRODUCTS);
    const [CurrentPage, setCurrentPage] = useState(1)

    const [searchParams , setSearchParams ] = useSearchParams();

    // update currentPage according to page query string
    useEffect(()=>{
        let page_number = parseInt(searchParams.get("page"));
        if (!page_number){
            page_number = 1;
        }
        setCurrentPage(page_number);
    },[searchParams])
    

    async function requestProductsFiltered(queryString){
        const request = await fetch("http://127.0.0.1:8000/api/products"+queryString)
        const response = await request.json();
        if (request.status == 200){
            setTotalPagesCount(response["total_count"])
            setCurrentPage(response['count'])
            setProducts(response["products"])
        }
    }

    



    return (
        <Container>
            <TagsContainer>
                {
                    Object.keys(props.searchParameters()).map((tag)=>{
                        if (tag=="price"){
                            let prices = props.searchParameters()[tag].split('-');
                            return (
                                <Tag onClick={()=>{props.deleteTag(tag)}}>
                                    <TagText>
                                        {prices[0]}$  -  {prices[1]}$ x
                                    </TagText>
                                </Tag>
                            )
                        }
                        if (tag=="color" || tag=="size")
                            return (
                                <Tag onClick={()=>{props.deleteTag(tag)}}>
                                    <TagText>{props.searchParameters()[tag]} x</TagText>
                                </Tag>
                            )
                    })
                }
            </TagsContainer>
            <Products>
                {products.map((product) =>{
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
            <Pagination CurrentPage={parseInt(CurrentPage)} TotalPagesCount={TotalPagesCount} />
        </Container>
    )
}