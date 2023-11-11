import styled from "styled-components";
import { Option } from "./price-filter";
import { useSearchParams } from "react-router-dom";
import { checkSelectedOption } from "./list-filter";

const Container  = styled.div`
display:flex;
width:100%;
flex-wrap:wrap;
gap:20px;
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

export default function ColorFilter({filter ,handleOptionClick}){
    const [searchParams,setSearchParams] = useSearchParams()

    function handleColorOptionClick(e, filter, option){
        e.preventDefault(); 
        return handleOptionClick(filter,option,searchParams,setSearchParams);
    }

    return (
        <Container>
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