import { useEffect, useState ,useRef} from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import useClickOutside from "../../hooks/use-click-outside"

const Container = styled.div`
position:relative;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
justify-content:center;
@media screen and (max-width:800px){
    display:${({$removeUnder800px})=> $removeUnder800px?'none':'flex'};
}
z-index:10;
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
box-shadow:0px 0px 10px rgba(0,0,0,0.5);
top:125%;
right:0;
max-height:${({$height})=>$height};
width: 100%;
min-width: fit-content;
height:auto;
border-radius: 7px 0 7px 7px;
z-index:100;
overflow:hidden;
line-height:1;
transition:all .3s;
`

const Options= styled.div`
display:flex;
flex-direction:column;

`
const Option = styled.div`
cursor:pointer;
padding:.7rem;
white-space: nowrap;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
border-bottom: 2px solid #C0C3C7;
&:hover{
    background:#C0C3C7;
}

&:last-child {
    border: none !important;
}
`

export default function SortByButton({style,removeUnder800px,sortOptions}){
    const [showList, setShowList] = useState(false)
    const [urlSearchParams,setUrlSearchParams] = useSearchParams()
    const list =useRef(null)

    useClickOutside([list],showList,()=>{
        setShowList(false)
    })
  
    function handleSortButtonClick(){
        setShowList(!showList)
    }

    function handleOptionClick(value){
        urlSearchParams.set("sort",value)
        urlSearchParams.set("page", 1)
        setUrlSearchParams(urlSearchParams)
    }
    
    return (
        <Container ref={list} style={style} $removeUnder800px={removeUnder800px}>
            <Button onClick={handleSortButtonClick}>
                <p>
                {
                    // update button text if an options is clicked to " sort by : options clicked "
                    urlSearchParams.get("sort")&&sortOptions[urlSearchParams.get("sort")]?
                    `Sort By : ${sortOptions[urlSearchParams.get("sort")]}`
                    :"Sort By"
                }
                </p>
                <Icon $rotate={showList?"180deg":"0"} className="fa-solid fa-angle-down"></Icon>
            </Button>
            <SortList $height={showList?"100vh":"0px"}>
                <Options>
                    {
                        Object.keys(sortOptions).map((key,index)=>{
                            return <Option key={index} onClick={(e)=>handleOptionClick(key)}>{sortOptions[key]}</Option>
                        })
                    }
                </Options>
            </SortList>
        </Container>
    )
}