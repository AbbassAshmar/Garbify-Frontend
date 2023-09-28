import styled from "styled-components"
import {Link} from "react-router-dom"


const Container =styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:50%;
margin: min(4rem ,10%) auto;
@media screen and (max-width:600px){
    width:100%;
}
`

const Page =styled(Link)`
padding:.7rem 1.2rem;
background:white;
border:1px solid grey;
border-radius:3px;
color:black;
text-decoration:none;
transition:background .3s;
&:hover{
    border:1px solid #00C2FF ;
    background:rgba(189, 189, 189,.1);
}
`

// const CurrentPage = 30;
export default function Pagination({CurrentPage,TotalPagesCount,getLink}){
    return(
        <Container>
            <Page  style={{display:`${CurrentPage<=3?"none":"block"}`}} to={getLink(1)}> 
                1
            </Page>
            <p style={{display:`${CurrentPage<=3?"none":"block"}`}}>...</p>


            <Page  style={{display:`${CurrentPage<=2?"none":"block"}`}} to={getLink(CurrentPage-2)}>
                {CurrentPage-2}
            </Page>

            <Page  style={{display:`${CurrentPage<=1?"none":"block"}`}} to={getLink(CurrentPage-1)}>
                {CurrentPage-1}
            </Page>

            <Page style={{background:"#00C2FF",color:"white"}} to={getLink(CurrentPage)}>
                {CurrentPage}
            </Page>

            <Page style={{display:`${CurrentPage >= TotalPagesCount?"none":"block"}`}} to={getLink(CurrentPage+1)}>
                {CurrentPage+1}
            </Page>

            <Page style={{display:`${CurrentPage+1 >= TotalPagesCount?"none":"block"}`}} to={getLink(CurrentPage+2)}>
                {CurrentPage+2}
            </Page>

            <p  style={{display:`${CurrentPage+2>=TotalPagesCount?"none":"block"}`}} >...</p>

            <Page  style={{display:`${CurrentPage+2 >= TotalPagesCount?"none":"block"}`}} to={getLink(TotalPagesCount)}>
                {TotalPagesCount}
            </Page>

        </Container>
    )
}