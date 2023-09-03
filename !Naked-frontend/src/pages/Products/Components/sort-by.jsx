import { useEffect, useState ,useRef} from "react"
import styled from "styled-components"
import {motion} from "framer-motion"
const Container = styled.div`
position:relative;

`
const Button = styled.button`   
background:none;
outline:none;
border:none;
font-size:1rem;
font-weight:600;
cursor:pointer;
&:hover{
    opacity:.7;
}
display:flex;
align-items:center;
`
const Icon =styled.i`
transform:rotateX(${({rotate})=>rotate});
font-size:1em;
margin-left:.7rem;
transition:transform .3s;

`
const SortList =styled.div`
position:absolute;
background:white;
top:100%;
left:0;
max-height:${({height})=>height};
height:auto;
width:min(190%,200px);
border-radius: 0  0 10px 10px;

overflow:hidden;
transition:all .3s;

`
const Options= styled.div`
padding:1rem .8rem;
display:flex;
flex-direction:column;
gap:6px;
`
const Option = styled.div`
font-weight:600;
cursor:pointer;
&:hover{
    opacity:.7;
}
`

export default function SortBy(props){
    const [showList, setShowList] = useState(false)
    const [currentValue, setCurrentValue] = useState("From A-Z")
    const list =useRef(null)
    const button = useRef(null)
    const OrderBytoSortBy={
        "name-ASC":"From A-Z",
        "created_at-DESC":"Newest-Oldest",
        "created_at-ASC":"Oldest-Newest",
        "price-DESC":"Price: High-Low",
        "price-ASC":"Price: Low-High",
    }
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (list.current && !list.current.contains(event.target) && !button.current.contains(event.target)) {
                setShowList(false)
            }
            document.removeEventListener("mousedown", handleClickOutside);
        }
        if (showList) document.addEventListener("mousedown", handleClickOutside);
      
    }, [showList]);
  

    function handleSortButtonClick(){
        setShowList(!showList)
    }
    function handleOptionClick(value){
        props.urlSearchParams.set("sort-by",value)
        props.setUrlSearchParams(props.urlSearchParams)
    }
    
    return (
        <Container>
            <Button ref={button} onClick={handleSortButtonClick}>
                {
                    props.urlSearchParams.get("sort-by")&&OrderBytoSortBy[props.urlSearchParams.get("sort-by")]?
                    `Sort By : ${OrderBytoSortBy[props.urlSearchParams.get("sort-by")]}`
                    :"Sort By"
                }
                <Icon rotate={showList?"180deg":"0"} className="fa-solid fa-angle-down"></Icon>
            </Button>
            
            <SortList ref={list} height={showList?"100vh":"0px"}>
                <Options>
                <Option onClick={(e)=>handleOptionClick("name-ASC")}>From A-Z</Option>
                <Option onClick={(e)=>handleOptionClick("created_at-DESC")}>Newest-Oldest</Option>
                <Option onClick={(e)=>handleOptionClick("created_at-ASC")}>Oldest-Newest</Option>
                <Option onClick={(e)=>handleOptionClick("price-DESC")}>Price: High-Low</Option>
                <Option onClick={(e)=>handleOptionClick("price-ASC")}>Price: Low-High</Option>
                </Options>
            </SortList>
        </Container>
    )
}