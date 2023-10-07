import { useEffect, useState ,useRef} from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
position:relative;
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Button = styled.button`   
background:none;
outline:none;
border:none;
font-weight:600;
cursor:pointer;
&:hover{
    opacity:.7;
}
display:flex;
align-items:center;

font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Icon =styled.i`
transform:rotateX(${({rotate})=>rotate});
margin-left:.4rem;
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
font-size:1rem;
@media screen and (max-width:800px){
    font-size:.8rem;
}
`
const Option = styled.div`
font-weight:600;
cursor:pointer;
&:hover{
    opacity:.7;
}
`

export default function SortByButton(props){
    const [showList, setShowList] = useState(false)
    const [urlSearchParams,setUrlSearchParams] = useSearchParams()

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
        urlSearchParams.set("sort-by",value)
        urlSearchParams.set("page", 1)
        setUrlSearchParams(urlSearchParams)
    }
    
    return (
        <Container style={props.style}>
            <Button ref={button} onClick={handleSortButtonClick}>
                {
                    urlSearchParams.get("sort-by")&&OrderBytoSortBy[urlSearchParams.get("sort-by")]?
                    `Sort By : ${OrderBytoSortBy[urlSearchParams.get("sort-by")]}`
                    :"Sort By"
                }
                <Icon rotate={showList?"180deg":"0"} className="fa-solid fa-angle-down"></Icon>
            </Button>
            
            <SortList ref={list} height={showList?"100vh":"0px"}>
                <Options>
                    {
                        Object.keys(props.optionsObj).map((key)=>{
                            return  <Option onClick={(e)=>handleOptionClick(key)}>{props.optionsObj[key]}</Option>
                        })
                    }
                </Options>
            </SortList>
        </Container>
    )
}