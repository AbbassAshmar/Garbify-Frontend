import { useParams, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import FilterContainer from "./Components/FilterComponent/filter"
import ProductsContainer from "./Components/products-container"
import PathTitle from "./Components/path-title"
import SortByButton from "../../components/SortByButton/sort-by-button"
import ShowFilter from "./Components/show-filter"
import {useState } from "react"
import { Content } from "../../components/StyledComponents/styled-components"

const Container = styled.div`
max-width:1500px;
margin:auto;
`
const Head = styled.div`
display:flex;
width:100%;
justify-content:space-between;
padding: 0 min(2rem ,4%);
align-items:center;
@media screen and (max-width:800px){
    position:sticky;
    top:0;
    height:5vh;
    z-index:90;
    background:white;
}
`
const Main = styled.div`
display:flex;
@media screen and (max-width:800px){
    flex-direction:column;
}
`
const Options = styled.div`
display:flex;
gap:2rem;
align-items:flex-end;
`

export default function Products(){
    const [showFilter, setShowFilter] = useState(false)

    // products/men/shoes/running
    const urlParametersList = useParams()['*'].split('/')

    // products/?q=abc&g=def
    const [searchParams,setSearchParams] = useSearchParams()
    

    // sql orderBy translated to be readable
    const OrderBytoSortBy={
        "name ASC":"From A-Z",
        "created_at DESC":"Newest-Oldest",
        "created_at ASC":"Oldest-Newest",
        "price DESC":"Price: High-Low",
        "price ASC":"Price: Low-High",
    }

    return(
        <Container>
            <div style={{display:'flex',flexDirection:"column",padding:"min(2rem ,4%) 0"}}>
            <Head>
                <PathTitle title={urlParametersList.join(" ")} number={4345} />
                <Options>
                    <SortByButton sortOptions={OrderBytoSortBy} removeUnder800px={true}/>
                    <ShowFilter show={showFilter} setShow={setShowFilter}/>
                </Options>
            </Head>
            <Content>
                <Main>
                    <FilterContainer setShow={setShowFilter} show={showFilter}/>
                    <ProductsContainer/>
                </Main>
            </Content>
            </div>
        </Container>
    )
}