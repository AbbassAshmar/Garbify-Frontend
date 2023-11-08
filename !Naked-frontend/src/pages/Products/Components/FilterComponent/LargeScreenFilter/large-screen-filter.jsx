import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import {FILTERS} from "../../../../../components/products-data"
import styled from "styled-components"
import PriceFilter from "./Components/price-filter"
import ColorFilter from "./Components/color-filter"
import CategoryFilter from "./Components/category-filter"
import ListFilter from "./Components/list-filter"

const Container = styled.div`
flex:${({flex})=>flex};
display:flex;
margin-right:${({margin})=>margin};
transition:flex .3s;
overflow:clip;

@media screen and (max-width:800px){
    display:none;
}
`
const ContentContainer =styled.div`
overflow-y:scroll;
position:sticky;
top:10vh;
height:90vh;
`
const Content = styled.div`
text-wrap:nowrap;
`
const FilterBy = styled.p`
margin:0;
margin-bottom:1.3rem;
font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const Wrapper =styled.div`
width:100%;
display:flex;
flex-direction:column;
font-size:1rem;
`
const FilterBox =styled.div`
margin:0;
border-bottom:1px solid rgba(189, 189, 189,.7);
margin-bottom:1.3rem;
padding-bottom:1.3rem;
`
const Title = styled.button`
width:100%;
cursor:pointer;
border:none;
display:flex;
align-items:center;
padding-bottom:1.1em;
justify-content:space-between;
background:white;
font-weight:600;

font-weight:600;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
`
const AngleIcon = styled.i`
transform:rotateX(${({angle})=>angle});
transition:transform .3s;
`
const Options = styled.div`
max-height:${({height})=>height};
width:100%;
overflow:hidden;
display:flex;
flex-direction:column;
transition:max-height .3s;
gap:.9rem;
`

export default function LargeScreenFilter({show,category}){
    const [Filters, setFilters] = useState(FILTERS)
    const [categories, setCategories] = useState([])
    const [showOptions, setShowOptions] = useState([])
    const [param,setParam]= useSearchParams()
 
    // // request filters 
    // useEffect(()=>{
        
    // },[])

    async function requestCategoryChildren(){
        const request = await fetch(`http://127.0.0.1:8000/api/categories/${category}/children`)
        const response = await request.json();
        if (request.status == 200){
            setCategories(response["children"])
        }
    }

    function handleOptionClick(filter,option){
        param.set('page',1)
        if(filter.name == "price") {
            param.set(filter.name.toLowerCase(),filter.options[option])
        }else{
            param.set(filter.name.toLowerCase(),option)
        }
        setParam(param)
    }
    
    function SwitchFunction(filter){
        if (filter.name== "price"){
            return <PriceFilter filter={filter} handleOptionClick={handleOptionClick} /> 
        }
        else if (filter.name=="Categories"){
            return <CategoryFilter filter={filter} />
        }
        else if (filter.name == "color"){
            return <ColorFilter filter={filter} handleOptionClick={handleOptionClick} />
        }
        else if (filter.type == 'list'){
            return <ListFilter filter={filter} handleOptionClick={handleOptionClick} />
        }
    }

    const handleTitleClick =(filter)=>{
        if (showOptions[filter.name]){
            setShowOptions({...showOptions,[filter.name]:false})
        }else{
            setShowOptions({...showOptions,[filter.name]:true})
        }
    }

    return ( 
        <Container margin={show?"2rem":"0"} flex={show?"1":"0"}>
            <ContentContainer>
            <Content>
                <FilterBy>Filter by</FilterBy>
                <Wrapper>
                    {
                        Filters.map((filter)=>{
                            return (
                                <FilterBox key={filter.name}>
                                    <Title onClick={(e)=>{handleTitleClick(filter)}}>
                                        <span>{filter.name}</span> 
                                        <AngleIcon angle={showOptions[filter.name]?"180deg":"0"} className="fa-solid fa-angle-down"/>
                                    </Title>
                                    <Options height={showOptions[filter.name] ? "50vh":"0"}>
                                    {     
                                        SwitchFunction(filter)
                                    }
                                    </Options> 
                                </FilterBox>
                            )
                        })
                    }
                </Wrapper>
            </Content>
            </ContentContainer>
        </Container>
    )
}