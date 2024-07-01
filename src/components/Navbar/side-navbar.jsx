import styled from "styled-components"
import { useState } from "react"
import {Categories } from "./navbar-filters"
import SideTitlesList from "./side-titles-list"
import { OptionAnimation } from "./side-titles-list"
import { motion } from "framer-motion"
// side navbar z-index  200

const Container = styled.div`
width:${({width})=>width};
height:100vh;
position:fixed;
overflow:hidden;
z-index:200;
display:flex;
transition:width .3s;
`

const SideNav= styled.div`
background:white;
width:300px;
@media screen and (max-width:365px){
    width:90%;
}
`

const Background =styled.div`
backdrop-filter: blur(5px);
flex:4;
`
const Content = styled.div`
width:100%;
padding: 1rem 2rem;
display:flex;
flex-direction:column;
gap:1rem;
position:relative;

`

const CancelIcon =styled.div`
font-size:1.3rem;
@media screen and (max-width:1000px){
    font-size:1.1rem;
}
`
export const OptionsContainer =styled.div`
display:flex;
flex-direction:column;
gap:20px;
`
export const Option = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
overflow:hidden;
white-space: nowrap;
color:black;
text-decoration:none;
`
export const Text = styled.p`
margin:0;
font-weight:600;

font-size:1.3rem;
@media screen and (max-width:1000px){
    font-size:1.1rem;
}
`
export const Icon = styled.div`
display:flex;
font-weight:100;

font-size:1.3rem;
@media screen and (max-width:1000px){
    font-size:1.1rem;
}
`
export default function SideNavbar(props){
    const [showDetails, setShowDetails]  = useState({show:false, details:[],category:""})

    function handleSideNavbarClose(){
        setShowDetails({show:false, details:[],category:""})
        props.setShow(false)
    }

    function handleOptionClick(object,category){
        setShowDetails({show:true, details:object,category:category})
    }

return (
    <Container width={props.show?"100%":"0"}>
        <SideNav>
            <Content>
                <SideTitlesList 
                    parentsState={setShowDetails} 
                    show={showDetails.show}
                    details={showDetails.details} 
                    category={showDetails.category}
                />
                <CancelIcon>
                    <i onClick={handleSideNavbarClose} className="fa-solid fa-xmark"/>
                </CancelIcon>

                <OptionsContainer>

                    {
                        !showDetails.show &&
                        Categories.map((category)=>{
                            
                            return(
                                <Option 
                                    key={category.name}
                                    as = {motion.div}
                                    variants={OptionAnimation}
                                    initial="start"
                                    animate="animate"
                                    onClick={()=>handleOptionClick(category.children,category.name)} 
                                >
                                    <Text>{category.name}</Text> 
                                    <Icon><i className="fa-regular fa-greater-than"/></Icon>
                                </Option>
                            )
                        })
                    }
                    {/* {
                    !showDetails.show &&
                    <Option 
                        as = {motion.div}
                        variants={OptionAnimation}
                        initial="start"
                        animate="animate"
                        onClick={()=>handleOptionClick(new_arrivals,"New Arrivals")} 
                    >
                        <Text>New Arrivals </Text> 
                        <Icon><i className="fa-regular fa-greater-than"/></Icon>
                    </Option>
                    }   

                    {
                    !showDetails.show &&
                    <Option 
                        as = {motion.div}
                        variants={OptionAnimation}
                        initial="start"
                        animate="animate"
                        onClick={()=>handleOptionClick(women,"Women")}
                    >
                        <Text>Women</Text> 
                        <Icon><i className="fa-regular fa-greater-than"/></Icon>
                    </Option>
                    }
                    {
                    !showDetails.show &&
                    <Option 
                        as = {motion.div}
                        variants={OptionAnimation}
                        initial="start"
                        animate="animate"
                        onClick={()=>handleOptionClick(men,"Men")}
                    >
                        <Text>Men</Text> 
                        <Icon><i className="fa-regular fa-greater-than"/></Icon>
                    </Option>
                    }
                    {
                    !showDetails.show &&
                    <Option  as = {motion.div}
                        variants={OptionAnimation}
                        initial="start"
                        animate="animate"
                        onClick={()=>handleOptionClick(kids,"Kids")}
                    >
                        <Text>Kids</Text> 
                        <Icon><i className="fa-regular fa-greater-than"/></Icon>
                    </Option>
                    }
                    {
                    !showDetails.show &&
                    <Option 
                        as = {motion.div}
                        variants={OptionAnimation}
                        initial="start"
                        animate="animate"
                        onClick={()=>handleOptionClick(sales,"Sales")}
                    >
                        <Text>Sales</Text> 
                        <Icon><i className="fa-regular fa-greater-than"/></Icon>
                    </Option>
                    }    */}
                </OptionsContainer>
            </Content>
        </SideNav>
        <Background onClick={handleSideNavbarClose}/>

    </Container>

)
}