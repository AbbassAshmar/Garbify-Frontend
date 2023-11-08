import styled from "styled-components";
import { Option } from "./price-filter";

const ColorOption = styled(Option)`
color:black;
text-decoration:none;
width:fit-content;
&:hover{
    opacity:1;
    color:${({color})=>color};
}
`

export default function ColorFilter({filter ,handleOptionClick}){
        
    function handleColorOptionClick(e, filter, option){
        e.preventDefault(); 
        return handleOptionClick(filter,option);
    }

    return (
        <>
            {
                filter.options.map((option)=>{
                    return(
                        <ColorOption
                            key={option}
                            color={option}
                            onClick={(e)=>handleColorOptionClick(e,filter,option)}
                        >
                            {option}
                        </ColorOption>
                    )
                })
            }
        </>
    )
}