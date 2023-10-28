import { useParams, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import FilterContainer from "./Components/filter-container"
import ProductsContainer from "./Components/products-container"
import PathTitle from "./Components/path-title"
import SortByButton from "../../components/SortByButton/sort-by-button"
import ShowFilter from "./Components/show-filter"
import { useEffect, useState } from "react"
import { constructUrl } from "../Orders/orders"
import { Content } from "../../components/StyledComponents/styled-components"
const Container = styled.div`
max-width:1500px;
margin:auto;
`


// const Content = styled.div`
// padding: min(2rem ,5%);

// display:flex;
// flex-direction:column;
// gap:min(5vh ,1.5rem);
// `
const Head = styled.div`
display:flex;
width:100%;
justify-content:space-between;
align-items:center;

@media screen and (max-width:600px){
    padding:min(2rem ,5%) min(2rem ,5%) 0 min(2rem ,5%);
 }
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

    // products/men/shoes/running
    const urlParametersList = useParams()['*'].split('/')

    // products/?q=abc&g=def
    const [searchParams,setSearchParams] = useSearchParams()
    
    
    

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
                        <SortByButton sortOptions={OrderBytoSortBy}/>
                        <ShowFilter show={showFilter} setShow={setShowFilter}/>
                    </Options>
                </Head>
                <Main>
                    <FilterContainer show={showFilter}/>
                    <ProductsContainer/>
                </Main>
            </Content>
        </Container>
    )
}