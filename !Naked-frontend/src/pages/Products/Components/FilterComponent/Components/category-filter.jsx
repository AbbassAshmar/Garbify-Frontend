import { useLocation,Link } from "react-router-dom";
import styled from "styled-components";

const CategoryLink = styled(Link)`
color:black;
text-decoration:none;
width:fit-content;
opacity:.7;
&:hover{
    opacity:1;
}

font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
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
                        {option}
                    </CategoryLink>
                )
            })
        }
        </>
    )
}