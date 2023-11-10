import { useEffect, useState ,useRef} from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
position:relative;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
justify-content:center;
@media screen and (max-width:800px){
    display:${({removeUnder800px})=> removeUnder800px?'none':'flex'};
}

`
const Button = styled.button`   
background:none;
outline:none;
border:none;
cursor:pointer;
display:flex;
align-items:flex-end;
font-weight:inherit;
font-size:inherit;
// font-size:.4rem;
&:hover{
    opacity:.7;
}
`
const Icon =styled.i`
transform:rotateX(${({rotate})=>rotate});
margin-left:.4rem;
transition:transform .3s;
font-weight:inherit;
font-size:inherit;
`
const SortList =styled.div`
position:absolute;
background:white;
top:100%;
left:0;
max-height:${({height})=>height};
height:auto;
width:min(190%,200px);
border-radius: 0 0 10px 10px;
z-index:100;
overflow:hidden;
transition:all .3s;

`
const Options= styled.div`
padding:1rem .8rem;
display:flex;
flex-direction:column;
gap:6px;
font-size:clamp(.6rem,2vw,.9rem);
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
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (list.current && !list.current.contains(event.target) && !button.current.contains(event.target)) {
                setShowList(false)
                document.removeEventListener("mousedown", handleClickOutside);
            }
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
        <Container style={props.style} removeUnder800px={props.removeUnder800px}>
            <Button ref={button} onClick={handleSortButtonClick}>
                {
                    // update button text if an options is clicked to " sort by : options clicked "
                    urlSearchParams.get("sort-by")&&props.sortOptions[urlSearchParams.get("sort-by")]?
                    `Sort By : ${props.sortOptions[urlSearchParams.get("sort-by")]}`
                    :"Sort By"
                }
                <Icon rotate={showList?"180deg":"0"} className="fa-solid fa-angle-down"></Icon>
            </Button>
            <SortList ref={list} height={showList?"100vh":"0px"}>
                <Options>
                    {
                        Object.keys(props.sortOptions).map((key)=>{
                            return  <Option onClick={(e)=>handleOptionClick(key)}>{props.sortOptions[key]}</Option>
                        })
                    }
                </Options>
            </SortList>
        </Container>
    )
}