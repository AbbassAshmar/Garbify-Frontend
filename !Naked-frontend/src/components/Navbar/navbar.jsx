import styled from "styled-components"
import CategoryList from "./category-list"
import { useEffect, useState } from "react"
import {useScroll,useMotionValueEvent} from "framer-motion"
import { Link } from "react-router-dom"
import NavbarSearch from "./navbar-search"
import Logo from "../Logo"
import SideNavbar from "./side-navbar"
import {Categories } from "./navbar-filters"

// padding: 0 min(2rem ,5%);

// navbar z-index : 100


const NavContainer = styled.div`
width :100%;
height:18vh;
background:#F1F4F9;
display:flex;
justify-content:center;
overflow:hidden;
align-items:center;
@media screen and (max-width:1000px){
    height:auto;
}
@media screen and (min-height:1000px){
    height:140px;
}
`
const NavWrapper = styled.div`
width:100%;
height:10vh;
position:relative;
padding: 0 min(2rem ,4%);
display:flex;
align-items:center;
justify-content:space-between;
background:white;
@media screen and (min-height:1000px){
    height:60px;
}
`

const NavPosition = styled.div`
width:100%;
top:0;
z-index:100;
position:${({$position})=>$position};
@media screen and (max-width:1000px){
    position:static;
}
`

const IconsContainer = styled.div`
display:flex;
gap:30px;
@media screen and (max-width:1000px){
    gap:20px;
}
`
const Icon = styled.i`
cursor:pointer;
color:black;
text-decoration: none;
font-size:1rem;
@media screen and (max-width:1000px){
    font-size:.8rem;
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
opacity:${({$selected})=> ($selected?"1":".6") };
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
    width:${({$selected})=> ($selected?"100%":"0") };
    position:absolute;
    height:3px;
    background:black;
    border-radius:100px;
    transition:width .3s, opacity .3s;
}

@media screen and (max-width:1000px){
    display:none;
}

font-weight:600;
font-size:1rem;
@media screen and (max-width:1000px){
    font-size:.8rem;
}
`


export default function Navbar({lockContainerScroll}){
    const [y,setY] = useState(0)
    const {scrollY} = useScroll()
    const [position , setPosition] = useState("static")
    const [showCategoryList,setShowCategoryList] = useState({display:false, value:[],topParent:null})
    const [showNavbarSearch, setShowNavbarSearch] = useState(false)
    const [showSideNavbar, setShowSideNavbar] = useState(false)

    // limit the height of the container in Default component according to side navbar 
    useEffect(()=>{
        lockContainerScroll && lockContainerScroll((prev_state)=>({...prev_state, side_nav:showSideNavbar}) )
    },[showSideNavbar])

    useEffect(()=>{
        lockContainerScroll && lockContainerScroll((prev_state)=>({...prev_state, nav_search:showNavbarSearch}) )
    },[showNavbarSearch])

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
            <NavPosition $position={position} >
            <NavWrapper >
                <Logo />
                <CategoriesContainer onMouseLeave={()=>{setShowCategoryList((prevState)=>({...prevState,display:false})) }} >
                    {
                        Categories.map((category)=>{
                            return (
                                <Category 
                                    key = {category.name}
                                    $selected={showCategoryList.display && showCategoryList.value==category.children}
                                    onMouseEnter={()=>{setShowCategoryList({display:true, value:category.children,topParent:category.name})}}
                                >{category.name}
                                </Category>
                            )
                        })
                    }
                    <CategoryList 
                        topParent = {showCategoryList.topParent}
                        show={showCategoryList.display} 
                        categories={showCategoryList.value} 
                        setShowCategoryList={setShowCategoryList}
                    />
                </CategoriesContainer>
                <IconsContainer>
                    <Icon onClick={handleSearchIconClick}><i  className="fa-solid fa-magnifying-glass"/></Icon>
                    <UserIcon><i className="fa-regular fa-user"/></UserIcon>
                    <Icon><i className="fa-regular fa-heart"/></Icon>
                    <Icon><i className="fa-solid fa-cart-shopping"/></Icon>
                    <BarsIcon onClick={handleBarsIconClick}><i className="fa-solid fa-bars"></i></BarsIcon>
                </IconsContainer>
            </NavWrapper>
            </NavPosition>
        </NavContainer>
        </>
    )
}