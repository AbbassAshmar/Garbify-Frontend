import styled from "styled-components";

const ColorOption = styled.div`
color:black;
text-decoration:none;
width:fit-content;
opacity:.7;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
&:hover{
    opacity:1;
    color:${({color})=>color};
}
`

export default function ColorFilter({filter ,handleOptionClick}){
        
    function handleColorOptionClick(e, filter, option){
        e.preventDefault(); 
        return handleOptionClick(filter,option);
    }

    return (
        <>
            {
            filter.options.map((option)=>{
                return(
                    <ColorOption
                        key={option}
                        color={option}
                        onClick={handleColorOptionClick(e,filter,option)}
                    >
                        {option}
                    </ColorOption>
                )
            })
            }
        </>
    )
}