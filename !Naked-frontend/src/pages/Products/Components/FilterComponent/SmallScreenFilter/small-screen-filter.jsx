import styled from "styled-components"
import SortByButton from "../../../../../components/SortByButton/sort-by-button"
import { useState } from "react"
import { FILTERS } from "../../../../../components/products-data"
import { useSearchParams } from "react-router-dom"

import PriceFilter from "../LargeScreenFilter/Components/price-filter"
import ColorFilter from "../LargeScreenFilter/Components/color-filter"
import CategoryFilter from "../LargeScreenFilter/Components/category-filter"
import ListFilter from "../LargeScreenFilter/Components/list-filter"

const Container = styled.div`
display:none;
width:${({show})=> show ? '100%' : '0'};
transition:width .3s;
height:100vh;
position:fixed;
z-index:300;
top:0;
left:0;
overflow:hidden;
@media screen and (max-width:800px){
    display:flex;
}
`
const SideFilter = styled.div` 
background:white;
width:60%;
padding:1rem;
display:flex;
flex-direction:column;
gap:2rem;
@media screen and (max-width:500px){
    width:100%;
}
`
const Background =styled.div`
backdrop-filter: blur(5px);
flex:4;
`

const Header = styled.div`

display:flex;
justify-content:space-between;
align-items:center;
line-height:0;
`
const HeaderText =styled.p`
margin:0;
font-weight:600;
font-size:clamp(1.1rem,3vw,1.5rem);
`
const CloseButton = styled.button`
border-radius:50%;
outline:none;
border:none;
background:black;
color:white;
padding:0;
line-height:0;
width:30px;
height:30px;
font-size:clamp(1.1rem,3vw,1.5rem);
font-weight:600;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
`
const Content = styled.div` 
width:100%;
display:flex;
flex-direction:column;
gap:2rem;
overflow-y:auto;
`
const Filters = styled.div`
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
font-size: clamp(.9rem, 2.6vw, 1.3rem);

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

const OrderBytoSortBy={
    "name-ASC":"From A-Z",
    "created_at-DESC":"Newest-Oldest",
    "created_at-ASC":"Oldest-Newest",
    "price-DESC":"Price: High-Low",
    "price-ASC":"Price: Low-High",
}


const SORT_BUTTON_STYLE = {
    background:'white',
    display:'flex',
    fontSize:"clamp(.9rem, 2.6vw, 1.3rem)",
    padding:'.3rem 1.7rem .3rem .3rem',
    borderRadius:'2px',
    // border:"2px solid black"
    boxShadow:'inset 0px 0px 1px 1px   rgba(189, 189, 189,1)',
}

export default function SmallScreenFitler({show,setShow}){
    const [filters,setFilters] = useState(FILTERS)
    const [categories, setCategories] = useState([])
    const [showOptions, setShowOptions] = useState([])
    const [param,setParam]= useSearchParams()

    function handleSideFilterClose(){
        setShow(!show)
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
       <Container show={show}>
            <SideFilter>
                <Header>
                    <HeaderText>filters</HeaderText>
                    <CloseButton onClick={handleSideFilterClose}>x</CloseButton>
                </Header>
                <Content>
                    <SortByButton style={SORT_BUTTON_STYLE} sortOptions={OrderBytoSortBy} />
                    <Filters>
                        {
                            filters.map((filter)=>{
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
                    </Filters>
                </Content>
            </SideFilter>
            <Background onClick={handleSideFilterClose}/>
       </Container>
    )
}