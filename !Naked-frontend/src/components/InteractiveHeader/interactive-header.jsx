import styled from "styled-components";
import SortByButton from "../SortByButton/sort-by-button";
const Container = styled.div`

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
padding-left: min(2.3rem,11%);
border-radius:2px;
&:focus{
    outline:1px solid #00C2FF;
}

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const SORT_BUTTON_STYLE = {
    background:'white',
    height:'100%',
    display:'flex',
    fontSize:'16px',
    padding:'.3rem 3%',
    borderRadius:'2px',
    boxShadow:'1px 1px 10px rgba(189, 189, 189,1)',
}


export default function InteractiveHeader({title,placeholder,sortOptions,setSearchInputValue,searchInputValue,handleSearchFormSubmit}){
    return(
        <>
            <Title>
                {title}
            </Title>
            <SearchSortContainer>
                <SearchBarContainer onSubmit={handleSearchFormSubmit}>
                    <SearchBar 
                        type="text" 
                        value={searchInputValue} 
                        placeholder={placeholder} 
                        onChange={(e)=>setSearchInputValue(e.target.value)}
                    />
                    <i style={{position:'absolute', left:"2%",top:"25%"}} className="fa-solid fa-magnifying-glass"/>
                </SearchBarContainer>
                <SortByButton style={SORT_BUTTON_STYLE} optionsObj={sortOptions} />
            </SearchSortContainer>
        </>
    )
}