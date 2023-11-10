import styled from "styled-components"
import { Option } from "./price-filter"
import { useSearchParams } from "react-router-dom";

export function checkSelectedOption(filter,option,searchParams){
    if (filter.name == "price"){
        option = filter.options[option]
    }
    let current_option = searchParams.get(filter.name);
    if (current_option && current_option==option){
        return true;
    }
    return false;
}

export default function ListFilter({filter,handleOptionClick}){
    const [searchParams , setSearchParams] = useSearchParams();

    

    return (
        <>
            {
                filter.options.map((option)=>{
                    return(
                    <Option 
                        selected={checkSelectedOption(filter,option,searchParams)}
                        key={option}
                        onClick={(e)=>{handleOptionClick(filter,option)}}
                    >
                        {option}
                    </Option>
                    )
                })
            }
        </>
    )
}