import { useLocation,Link } from "react-router-dom";
import styled from "styled-components";
import { Option } from "./price-filter";

const CategoryLink = styled(Link)`
color:black;
text-decoration:none;
width:fit-content;
`

export default function CategoryFilter({filter}){
    const location = useLocation();

    return (
        <>
        {
            filter.options.map((option)=>{
                return(
                    <CategoryLink
                        key={option} 
                        to={`${location.pathname}/${option.replace(" ",'-')}`}
                    >
                        <Option>
                            {option}
                        </Option>
                    </CategoryLink>
                )
            })
        }
        </>
    )
}