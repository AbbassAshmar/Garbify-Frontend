import { useLocation,Link, json } from "react-router-dom";
import styled from "styled-components";
import { Option } from "./price-filter";

const CategoryLink = styled(Link)`
color:black;
text-decoration:none;
width:fit-content;
`

export default function CategoryFilter({filter}){
    const location = useLocation();

   
    const childer = {
        data:[
            {
                id:39,
                name : 'running shoes'
            },
            {
                id:49,
                name : 'walking shoes'
            },
            {
                id:29,
                name : 'fucking shoes'
            }
        ]
    }
    

    async function getCategoryChildren(){
        let url = `http://127.0.0.1:8000/api/categories/${category}/children`;
        let response = requestData(url);
        setCategories(response['data'])
        
    }

    return (
        <>
        {
            filter.map((option)=>{
                return(
                    <CategoryLink
                        key={option.name} 
                        to={`${location.pathname}/${option.name.replace(" ",'-')}`}
                    >
                        <Option>
                            {option.name}
                        </Option>
                    </CategoryLink>
                )
            })
        }
        </>
    )
}