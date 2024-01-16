import { useEffect, useState ,useRef} from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
position:relative;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
justify-content:center;
@media screen and (max-width:800px){
    display:${({$removeUnder800px})=> $removeUnder800px?'none':'flex'};
}
`

const Button = styled.button`   
white-space: nowrap;
background:none;
outline:none;
border:none;
cursor:pointer;
font-weight:inherit;
font-size:inherit;
line-height:1;
display:flex;
justify-content:center;
align-items:flex-end;
gap:5px;
&:hover{
    opacity:.7;
}
`

const Icon =styled.i`
transform:rotateX(${({$rotate})=>$rotate});
transition:transform .3s;
font-weight:inherit;
font-size:inherit;
`

const SortList =styled.div`
position:absolute;
background:white;
top:110%;
left:0;
max-height:${({$height})=>$height};
width: 100%;
min-width: fit-content;
height:auto;
border-radius: 0 0 10px 10px;
z-index:100;
overflow:hidden;
line-height:1;
transition:all .3s;
`

const Options= styled.div`
padding:.7rem;
display:flex;
flex-direction:column;
gap:.7rem;
`
const Option = styled.div`
cursor:pointer;
&:hover{
    opacity:.7;
}
white-space: nowrap;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);

`

export default function SortByButton({style,removeUnder800px,sortOptions}){
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
        urlSearchParams.set("sort+by",value)
        urlSearchParams.set("page", 1)
        setUrlSearchParams(urlSearchParams)
    }
    
    return (
        <Container style={style} $removeUnder800px={removeUnder800px}>
            <Button ref={button} onClick={handleSortButtonClick}>
                <p>
                {
                    // update button text if an options is clicked to " sort by : options clicked "
                    urlSearchParams.get("sort+by")&&sortOptions[urlSearchParams.get("sort+by")]?
                    `Sort By : ${sortOptions[urlSearchParams.get("sort+by")]}`
                    :"Sort By"
                }
                </p>
                <Icon $rotate={showList?"180deg":"0"} className="fa-solid fa-angle-down"></Icon>
            </Button>
            <SortList ref={list} $height={showList?"100vh":"0px"}>
                <Options>
                    {
                        Object.keys(sortOptions).map((key)=>{
                            return  <Option onClick={(e)=>handleOptionClick(key)}>{sortOptions[key]}</Option>
                        })
                    }
                </Options>
            </SortList>
        </Container>
    )
}