import styled from "styled-components"
import { OptionsContainer,Option ,Text,Icon} from "./side-navbar"
import { useEffect,useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getOptionsUrl, arrayNameParentsForm} from "./category-list"

const Container =styled.div`
display:${({display})=> display};
width:100%;
height:100vh;
transition: width .4s;
overflow:hidden;


// for the recursion approach
// position:absolute;
// top:0;
// left:0;
// z-index:300;
`
const BackButton =styled.button`
display:flex;
font-size:1rem;
background:none;
outline:none;
align-items:center;
gap:8px ;
font-weight:600;
border:none;
margin:2rem 0 2rem 0;
`

export const OptionAnimation  = {
    start : {
        x:-13,
        opacity:0,
    },
    animate :{
        x: 0,
        opacity:1,
        transition:{
            type:"tween"
        }
    }

}

//changes options using a state and a stack to store the history of options 

export default function SideTitlesList(props){
    const [optionsList, setOptionsList] = useState([])
    const [historyStack, setHistoryStack] = useState([])

    let key1 = 0;
    let key2 =1000;
    function Key1() {
        key1 += 1
        return key1;
    }
    function Key2(){
        key2+=1
        return key2
    }

    useEffect(()=>{
        if  (props.show == false){
            setHistoryStack([])
            setOptionsList([])
        }
        else{
        
        setHistoryStack([arrObjParentsForm(props.details,[props.category]),...historyStack])
        setOptionsList(arrObjParentsForm(props.details,[props.category]))

        }
    
    },[props])

    

    function handleBackButtonClick(){
        let latest = historyStack
        latest.shift()
        if (latest.length == 0) {
            props.parentsState({show:false, details:[],category:""})
        }
        setHistoryStack(latest)
        setOptionsList(historyStack[0])

    }

    function handleOptionClick(detail){
        setHistoryStack([detail.children,...historyStack])
        setOptionsList(detail.children) 
    }

    // [{name:abc, children:[{name:def, children}]} ,{},{}] -> [{name:abc ,parents:.., children:[{name,parents}]},{},{}]
    function arrObjParentsForm(arrObj,category){
        let new_arr = []
        for (let i =0 ; i < arrObj.length;i++ ){
            let result =[]
            for (let j = 0; j<arrObj[i]['children'].length; j++){
                result =[ ...result,  ...arrayNameParentsForm(arrObj[i]['children'][j], [...category,arrObj[i]['name']]) ]
            }
            new_arr =  [...new_arr, {"name":arrObj[i]['name'],'parents':category, "children" : result} ]
        }
        return new_arr
    }
    
 
    return (
        <Container  display={props.show ? "block": "none"}> 
            <BackButton onClick={handleBackButtonClick}>
                <Icon><i style={{fontSize:"1rem"}} className="fa-regular fa-less-than"/></Icon>
                Back 
            </BackButton>
            <OptionsContainer>
                {
                    optionsList ?
                        optionsList.map((detail)=>{
                            return (
                                detail.children && detail.children.length > 0 ?
                                    <Option 
                                        as = {motion.div}
                                        variants={OptionAnimation}
                                        initial="start"
                                        animate="animate"
                                        key={Key1()} 
                                        onClick={()=>handleOptionClick(detail)}
                                    >
                                        <Text>{detail.name}</Text> 
                                        <Icon><i className="fa-regular fa-greater-than"/></Icon>
                                    </Option>
                                :   
                                    <Option
                                    as= {motion.div}
                                    variants={OptionAnimation}
                                    initial="start"
                                    animate="animate"
                                    key={Key2()}
                                    >
                                        {/* detail.parents?"/products/"+detail.parents.join("/")+"/"+detail.name:"#" */}
                                        <Link to={getOptionsUrl(detail.parents, detail.name)} style={{color:"black", textDecoration:"none"}}>
                                            <Text>{detail.name}</Text> 
                                        </Link>
                                    </Option>
                            )
                        }): null
                }
            </OptionsContainer>
        </Container>
    )
}


// uses recursion to render a SideTitlesList for each option that has other options 
// export default function SideTitlesList(props){
//     const [showDetails, setShowDetails]  = useState({show:false, details:[],category:""})
    
    
//     function handleBackButtonClick(){
//         if (props.parentsState){
//             props.parentsState({show:false, details:[] , category:""})
//         }
//     }
//     function handleOptionClick(object,category){
//         setShowDetails({show:true, details:object,category:category})
//     }
//     useEffect(()=>{
//         console.log(showDetails)
//     }, [showDetails])

//     let myuniqueidcounter = 0;
//     let unique2 =1000;
//     function uniqueId() {
//         myuniqueidcounter += 1
//         return myuniqueidcounter;
//     }
//     function uniqueId2(){
//         unique2+=1
//         return unique2
//     }
//     return (

//     <Container  
//                 width={props.show ? "100%": "0"}
//                 display={props.show?"block":"none"}
//     > 
//         <BackButton onClick={handleBackButtonClick}>Back</BackButton>
//         <OptionsContainer>
//             <Title>{props.category}</Title>
//                 {
//                     props.details.map((detail)=>{
//                         return (
//                             !detail.options || detail.options.length == 0?
//                             <Option
//                                 as={motion.div}
//                                 variants={OptionAnimation}
//                                 initial="start"
//                                 animate="animate"
//                                 key={uniqueId()}
//                             >
//                                 <Text>{detail.title}</Text> 
//                             </Option>
//                             :
//                             <>
//                             <SideTitlesList 
//                                 parentsState={setShowDetails}
//                                 show={showDetails.show} 
//                                 details={showDetails.details} 
//                                 category={showDetails.category}
//                                 />
//                             <Option 
//                                 as={motion.div}
//                                 variants={OptionAnimation}
//                                 initial="start"
//                                 animate="animate" 
//                                 onClick={()=> handleOptionClick(detail.options,detail.title)}
//                                 key={uniqueId2()}
//                             >
//                                 <Text>{detail.title}</Text> 
//                                 <Icon><i className="fa-regular fa-greater-than"/></Icon>
//                             </Option>
//                             </>
//                         )
//                     })
//                 } 
//         </OptionsContainer>
//     </Container>
//     )

// }
