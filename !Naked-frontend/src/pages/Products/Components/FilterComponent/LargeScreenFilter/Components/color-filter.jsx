import styled from "styled-components";
import { Option } from "./price-filter";
import { useSearchParams } from "react-router-dom";
import { checkSelectedOption } from "./list-filter";

const Container  = styled.div`
width:100%;
display: grid;
gap:20px;
grid-template-columns: repeat(3,23px);

@media screen and (max-width:800px){
    grid-template-columns: repeat(6,23px);
}

@media screen and (min-width:1000px){
    grid-template-columns: repeat(4,23px);
}
@media screen and (min-width:1100px){
    grid-template-columns: repeat(5,23px);
}
@media screen and (min-width:1300px){
    grid-template-columns: repeat(6,23px);
}


`
const ColorOption = styled.div`
cursor:pointer;
background:${({color})=>color};
border:${({selected})=>selected ?'1px solid white':null};
outline:${({selected})=>selected ?'1px solid black':null};
margin:1px;
width:23px;
height:23px;
border-radius:50%;
text-decoration:none;
text-align:center;
color:white;
@media screen and (min-width:800px){
    &:hover{
        border:1px solid white;
        outline:1px solid black;
    }
}
`

export default function ColorFilter({filter ,handleOptionClick,show}){
    const [searchParams,setSearchParams] = useSearchParams()

    function handleColorOptionClick(e, filter, option){
        e.preventDefault(); 
        return handleOptionClick(filter,option,searchParams,setSearchParams);
    }

    return (
        <Container show={show}>
            {
                filter.options.map((option)=>{
                    return(
                        <ColorOption
                            selected={checkSelectedOption(filter,option,searchParams)}
                            key={option}
                            color={option}
                            onClick={(e)=>handleColorOptionClick(e,filter,option)}
                        >
                            {checkSelectedOption(filter,option,searchParams)?(<span>&#10003;</span>):null}
                        </ColorOption>
                    )
                })
            }
        </Container>    
    )
}