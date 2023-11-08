import styled from "styled-components"
import { Option } from "./price-filter"

export default function ListFilter({filter,handleOptionClick}){
    return (
        <>
            {
                filter.options.map((option)=>{
                    return(
                    <Option 
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