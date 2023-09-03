import { useParams, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import FilterContainer from "./Components/filter-container"
import ProductsContainer from "./Components/products-container"
import PathTitle from "./Components/path-title"
import SortBy from "./Components/sort-by"
import ShowFilter from "./Components/show-filter"
import { useEffect, useState } from "react"
const Container = styled.div`

`
const Content = styled.div`
padding:2rem;

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
`
export default function Products(){
    const [showFilter, setShowFilter] = useState(false)
    const [CurrentPage, setCurrentPage] = useState(1)

    // products/men/shoes/running
    const urlParametersList = useParams()['*'].split('/')

    // products/?q=abc&g=def
    const [urlSearchParams,setUrlSearchParams] = useSearchParams()

    // create an object of query strings 
    const urlSearchParamsObj = ()=>{
        const tempObj= {};
        for  (let [key,value] of urlSearchParams.entries()){
            tempObj[key] = value
        }
        return tempObj
    }
    
    // create a string using url params and query strings (added to the endpoint request)
    function createQueryString(){
        let searchParams = (urlParametersList.length>0)?"?categories[]="+urlParametersList.join('&categories[]='): ""
        const tempObj= {};
        for  (let [key,value] of urlSearchParams.entries()){
            searchParams = searchParams + "&"+key+"="+ value
        }        
        return searchParams
    }

    //remove a tag from filter tags
    function handleTagRemove(key){
        urlSearchParams.delete(key)
        setUrlSearchParams(urlSearchParams)
    }
    

    // update currentPageNumber according to page query string
    useEffect(()=>{
        setCurrentPage(urlSearchParamsObj()["page"]?urlSearchParamsObj()["page"]:1)
    },[urlSearchParamsObj])


    return(
        <Container>
            <Content>
                <Head>
                    <PathTitle title={urlParametersList.join(" ")} number={4345} />
                    <Options>
                        <SortBy urlSearchParams={urlSearchParams} setUrlSearchParams={setUrlSearchParams}/>
                        <ShowFilter show={showFilter} setShow={setShowFilter}/>
                    </Options>
                </Head>
                <Main>
                    <FilterContainer show={showFilter}/>
                    <ProductsContainer deleteTag={handleTagRemove} createQueryString={createQueryString} urlParameters={urlParametersList} CurrentPage={parseInt(CurrentPage)} searchParameters={urlSearchParamsObj}/>
                </Main>
            </Content>
        </Container>
    )
}