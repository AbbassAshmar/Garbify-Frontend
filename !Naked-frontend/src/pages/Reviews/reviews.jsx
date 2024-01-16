import styled from "styled-components";
import { Content } from "../../components/StyledComponents/styled-components";
import { Title } from "../Orders/orders";
import SortByButton from "../../components/SortByButton/sort-by-button";
import UserReviewCard from "./Components/user-review-card";
import { useFetchData } from "../../hooks/use-fetch-data";
import { useSearchParams } from "react-router-dom";
import useUserState from "../../hooks/use-user-state";
import Loading from "../../components/Loading/loading";

const Container = styled.div`

`

const Header = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
`

const sortOptions = {
    "created_at+DESC":"Newest-Oldest",
    "created_at+ASC":"Oldest-Newest",
    "total_cost+DESC":"Likes: High-Low",
    "total_cost+ASC":"Likes: Low-High",
}

const SortByButtonStyle ={
boxShadow:"0px 0px 4px rgba(0,0,0,0.6)",
padding:"4px 14px 4px 16px",
borderRadius:'3px',
marginRight:"20px"
}



export default function Reviews(){
    

    return(
        <Container>
            <Content>
                <Header>    
                    <Title>Your Reviews</Title>
                    <SortByButton style={SortByButtonStyle} sortOptions={sortOptions}/>
                </Header>
                
            </Content>
        </Container>
    )
}