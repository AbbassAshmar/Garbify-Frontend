import { useParams, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import FilterContainer from "./Components/filter-container"
import ProductsContainer from "./Components/products-container"
import PathTitle from "./Components/path-title"
import SortByButton from "../../components/SortByButton/sort-by-button"
import ShowFilter from "./Components/show-filter"
import { useEffect, useState } from "react"

const Container = styled.div`
max-width:1500px;
`
const Content = styled.div`
padding: min(2rem ,5%);

display:flex;
flex-direction:column;
gap:min(5vh ,1.5rem);
`
const Head = styled.div`
display:flex;
width:100%;
justify-content:space-between;
align-items:center;

`
const Main = styled.div`
display:flex;
`
const Options = styled.div`
display:flex;
gap:2rem;
align-items:flex-end;
`
export default function Products(){
    const [showFilter, setShowFilter] = useState(false)
    const [CurrentPage, setCurrentPage] = useState(1)

    // products/men/shoes/running
    const urlParametersList = useParams()['*'].split('/')

    // products/?q=abc&g=def
    const [searchParams,setSearchParams] = useSearchParams()

    // update currentPage according to page query string
    useEffect(()=>{
        let page_number = parseInt(searchParams.get("page"));
        if (!page_number){
            page_number = 1;
        }
        setCurrentPage(page_number);
    },[searchParams])
    
    // create an object of query strings 
    const searchParamsObj = ()=>{
        const tempObj= {};
        for  (let [key,value] of searchParams.entries()){
            tempObj[key] = value
        }
        return tempObj
    }
    
    // create a string using url params and query strings (added to the endpoint request)
    function createQueryString(){
        let searchParamsString = (urlParametersList.length>0)?"?categories[]="+urlParametersList.join('&categories[]='): ""
        const tempObj= {};
        for  (let [key,value] of searchParams.entries()){
            searchParamsString = searchParamsString + "&"+key+"="+ value
        }        
        return searchParamsString
    }

    //remove a tag from filter tags
    function handleTagRemove(key){
        searchParams.delete(key)
        setSearchParams(searchParams)
    }
    
    

    // sql orderBy translated to be readable
    const OrderBytoSortBy={
        "name-ASC":"From A-Z",
        "created_at-DESC":"Newest-Oldest",
        "created_at-ASC":"Oldest-Newest",
        "price-DESC":"Price: High-Low",
        "price-ASC":"Price: Low-High",
    }

    return(
        <Container>
            <Content>
                <Head>
                    <PathTitle title={urlParametersList.join(" ")} number={4345} />
                    <Options>
                        <SortByButton optionsObj={OrderBytoSortBy}/>
                        <ShowFilter show={showFilter} setShow={setShowFilter}/>
                    </Options>
                </Head>
                <Main>
                    <FilterContainer show={showFilter}/>
                    <ProductsContainer 
                        deleteTag={handleTagRemove} 
                        createQueryString={createQueryString} 
                        urlParameters={urlParametersList} 
                        CurrentPage={parseInt(CurrentPage)} 
                        searchParameters={searchParamsObj}
                    />
                </Main>
            </Content>
        </Container>
    )
}