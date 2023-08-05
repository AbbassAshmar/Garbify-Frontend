import styled from "styled-components"
import CategoryList from "./category-list"
import { useEffect, useState } from "react"
import {useScroll,useMotionValueEvent} from "framer-motion"
import { Link } from "react-router-dom"
import NavbarSearch from "./navbar-search"
import Logo from "../Logo"
import SideNavbar from "./side-navbar"
import { men,women,kids,sales,new_arrivals } from "./navbar-filters"

// padding 2rem
// navbar z-index : 100


const NavContainer = styled.div`
width :100%;
height:18vh;
max-height:110px;
// background:#E4E4E4;
background:#F1F4F9;
display:flex;
justify-content:center;
align-items:center;
@media screen and (max-width:1000px){
    height:auto;
}

`
const NavWrapper = styled.div`
width:100%;
height:10vh;
max-height:60px;
position:relative;
padding:0 2rem 0 2rem;
display:flex;
align-items:center;
justify-content:space-between;
background:white;
`

const NavPosition = styled.div`
width:100%;
top:0;
z-index:100;
position:${({position})=>position};

@media screen and (max-width:1000px){
    position:static;
}
`

const IconsContainer = styled.div`

display:flex;
gap:40px;
@media screen and (max-width:1000px){
    gap:20px;
}
`

const Icon = styled(Link)`
color:black;
text-decoration: none;
font-size:22px;
@media screen and (max-width:1000px){
    font-size:20px;
}

`

const BarsIcon =styled(Icon)`
display:none;
@media screen and (max-width:1000px){
    display:block;
}
`

const UserIcon =styled(Icon)`
@media screen and (max-width:1000px){
    display:none;
}
`

const CategoriesContainer = styled.div`
height:100%;
display:flex;
justify-content:space-between;
align-items:end;
overflow:hidden;
`
const Category = styled.div`
font-size:19px;
font-weight:100;
opacity:${({selected})=> (selected?"1":".6") };
height:85%;
cursor:pointer;
padding:.1rem 1rem 1rem 1rem;
position:relative;
display:flex;
align-items:center;
&::before{
    content:"";
    top:92%;
    left:0;
    width:${({selected})=> (selected?"100%":"0") };
    position:absolute;
    height:3px;
    background:black;
    border-radius:100px;
    transition:width .3s, opacity .3s;
}

@media screen and (max-width:1000px){
    display:none;
}
`


export default function Navbar({setSideNavbarOpened}){
    const [y,setY] = useState(0)
    const {scrollY} = useScroll()
    const [position , setPosition] = useState("static")
    const [showCategoryList,setShowCategoryList] = useState({display:false, value:[]})
    const [showNavbarSearch, setShowNavbarSearch] = useState(false)
    const [showSideNavbar, setShowSideNavbar] = useState(false)

    // limit the height of the container in Default component according to side navbar 
    useEffect(()=>{
        setSideNavbarOpened(showSideNavbar)
    },[showSideNavbar])

    function handleSearchIconClick(){
        setShowNavbarSearch(true)
    }
    
    function handleBarsIconClick(){
        setShowSideNavbar(!showSideNavbar)
    }


    // make the navbar fixed when scrolling below 25px 
    // EventListener for motion values
    useMotionValueEvent(scrollY, "change", (latest) => {
        // adjust the state whenever scrollY changes to the value of scrollY
        setY(latest)
    })
    useEffect(()=>{
        if (y < 25 ){
            if (position === "fixed"){
                setPosition("static")
            }
        }
        if (y >= 25){
            if (position === "static"){
                setPosition("fixed")
            }
        }
    },[y])


    return (
        <>
        <NavbarSearch show={showNavbarSearch} setShow={setShowNavbarSearch}/>
        <SideNavbar show={showSideNavbar} setShow={setShowSideNavbar}/>

        <NavContainer >
            <NavPosition position={position} >
            <NavWrapper >
                    <Logo />
                    <CategoriesContainer onMouseLeave={()=>{setShowCategoryList((prevState)=>({...prevState,display:false})) }} >
                        <Category selected={showCategoryList.display && showCategoryList.value==new_arrivals?true:false} 
                            onMouseEnter={()=>{setShowCategoryList({display:true, value:new_arrivals})}}
                        >New Arrivals</Category>

                        <Category  selected={showCategoryList.display && showCategoryList.value==men?true:false}
                            onMouseEnter={()=>{setShowCategoryList({display:true, value:men})}}
                        >Men</Category>

                        <Category  selected={showCategoryList.display && showCategoryList.value==women?true:false}
                            onMouseEnter={()=>{setShowCategoryList({display:true, value:women})}}
                        >Women</Category>

                        <Category selected={showCategoryList.display && showCategoryList.value==kids?true:false}
                            onMouseEnter={()=>{setShowCategoryList({display:true, value:kids})}}
                        >Kids</Category>

                        <Category selected={showCategoryList.display && showCategoryList.value==sales?true:false}
                            onMouseEnter={()=>{setShowCategoryList({display:true, value:sales})}}
                        >Sales</Category>

                        <CategoryList 
                            show={showCategoryList.display} 
                            categories={showCategoryList.value} 
                            setShowCategoryList={setShowCategoryList}
                        />
                    </CategoriesContainer>
                <IconsContainer>
                    
                    <Icon onClick={handleSearchIconClick}><i  className="fa-solid fa-magnifying-glass"/></Icon>
                    <UserIcon><i className="fa-regular fa-user"/></UserIcon>
                    <Icon><i className="fa-solid fa-cart-shopping"/></Icon>
                    <BarsIcon onClick={handleBarsIconClick}><i class="fa-solid fa-bars"></i></BarsIcon>
                </IconsContainer>
            </NavWrapper>
            </NavPosition>
        </NavContainer>
        </>
    )
}