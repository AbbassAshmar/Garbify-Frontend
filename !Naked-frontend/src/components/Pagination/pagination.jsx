import styled from "styled-components"
import {Link, useSearchParams} from "react-router-dom"
import { useEffect, useState } from "react"


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

const Page =styled.p`
cursor:pointer;
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

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`

// const CurrentPage = 30;
export default function Pagination({CurrentPage,TotalPagesCount}){
    const [searchParams ,setSearchParams] = useSearchParams();

    function handleLinkClick(pageNumber){
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    }

    return(
        <Container>
            <Page  style={{display:`${CurrentPage<=3?"none":"block"}`}} onClick={()=>handleLinkClick(1)}> 
                1
            </Page>
            <p style={{display:`${CurrentPage<=3?"none":"block"}`}}>...</p>


            <Page  style={{display:`${CurrentPage<=2?"none":"block"}`}} onClick={()=>handleLinkClick(CurrentPage-2)}>
                {CurrentPage-2}
            </Page>

            <Page  style={{display:`${CurrentPage<=1?"none":"block"}`}} onClick={()=>handleLinkClick(CurrentPage-1)}>
                {CurrentPage-1}
            </Page>

            <Page style={{background:"#00C2FF",color:"white"}} onClick={()=>handleLinkClick(CurrentPage)}>
                {CurrentPage}
            </Page>

            <Page style={{display:`${CurrentPage >= TotalPagesCount?"none":"block"}`}}  onClick={()=>handleLinkClick(CurrentPage+1)}>
                {CurrentPage+1}
            </Page>

            <Page style={{display:`${CurrentPage+1 >= TotalPagesCount?"none":"block"}`}} onClick={()=>handleLinkClick(CurrentPage+2)}>
                {CurrentPage+2}
            </Page>

            <p  style={{display:`${CurrentPage+2>=TotalPagesCount?"none":"block"}`}} >...</p>

            <Page  style={{display:`${CurrentPage+2 >= TotalPagesCount?"none":"block"}`}} onClick={()=>handleLinkClick(TotalPagesCount)}>
                {TotalPagesCount}
            </Page>

        </Container>
    )
}