import styled from "styled-components"
import {useSearchParams} from "react-router-dom"
import { useEffect, useState } from "react";


const Container =styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
margin: auto;
gap:min(3%,30px);

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

font-size:clamp(.8rem , 2.3vw ,1.1rem);
@media screen and (max-width:1000px){
    padding:max(1.3% ,.2rem) max(3%,.7rem);
}
`

// const CurrentPage = 30;
export default function Pagination({TotalPagesCount}){
    const [searchParams ,setSearchParams] = useSearchParams();
    const [CurrentPage , setCurrentPage ] =useState(searchParams.get("page")?parseInt(searchParams.get("page")):1)

    useEffect(()=>{
        let page = parseInt(searchParams.get('page'))
        if (  page && CurrentPage != page){
            setCurrentPage(page)
        }
    },[searchParams])

    function handleLinkClick(pageNumber){
        setCurrentPage(pageNumber)
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    }

    return(
        <Container>
            <Page  style={{display:`${CurrentPage<=3?"none":"block"}`}} onClick={()=>handleLinkClick(1)}> 
                1
            </Page>
            <p style={{display:`${CurrentPage<=3?"none":"block"}`}}>...</p>

            {/* 
            <Page  style={{display:`${CurrentPage<=2?"none":"block"}`}} onClick={()=>handleLinkClick(CurrentPage-2)}>
                {CurrentPage-2}
            </Page> */}

            <Page  style={{display:`${CurrentPage<=1 || CurrentPage > TotalPagesCount ?"none":"block"}`}} onClick={()=>handleLinkClick(CurrentPage-1)}>
                {CurrentPage-1}
            </Page>

            <Page style={{background:"#00C2FF",color:"white"}} onClick={()=>handleLinkClick(CurrentPage)}>
                {CurrentPage}
            </Page>

            <Page style={{display:`${CurrentPage >= TotalPagesCount?"none":"block"}`}}  onClick={()=>handleLinkClick(CurrentPage+1)}>
                {CurrentPage+1}
            </Page>

            {/* <Page style={{display:`${CurrentPage+1 >= TotalPagesCount?"none":"block"}`}} onClick={()=>handleLinkClick(CurrentPage+2)}>
                {CurrentPage+2}
            </Page> */}

            <p  style={{display:`${CurrentPage+2>=TotalPagesCount?"none":"block"}`}} >...</p>

            <Page  style={{display:`${CurrentPage+2 >= TotalPagesCount?"none":"block"}`}} onClick={()=>handleLinkClick(TotalPagesCount)}>
                {TotalPagesCount}
            </Page>

        </Container>
    )
}