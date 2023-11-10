import { useState } from "react";
import styled from "styled-components";
import { Input,Label,Submit } from "../../../../../Registration/registration";
import { useSearchParams } from "react-router-dom";
import { checkSelectedOption } from "./list-filter";

const Form = styled.form`
display:flex;
gap:3px;
margin-top:1.2rem;
`
const InputContainer = styled.div`
position:relative;
flex:2;
border:1px solid rgba(189, 189, 189,.7);
height:min(40px,6vh);
`
const EditedInput = styled(Input)`
outline:none;
border-radius:2px;
height:100%;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`

const EditedLabel = styled(Label)`
top:${({position})=>position?'-25%':"25%"};
font-size:${({position})=>position?'.7rem':".8rem"};
${Input}:focus + &{
    top:-25%;
    left:2%;
    font-size:.7rem;
}
`

const SubmitButton = styled(Submit)`
flex:1;
height:auto;
border-radius:2px;
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);
`
export const Option =styled.div`
cursor:pointer;
opacity:${({selected})=>selected?"1":'.7'};
font-weight:600;
font-size:clamp(.6rem,2vw,.9rem);

@media screen and (max-width:800px){
    font-size:clamp(.8rem , 2.3vw ,1.1rem);
}
@media screen and (min-width:800px){
    &:hover{
        opacity:1;
    }
}
`
export default function PriceFilter({filter,handleOptionClick}){
    const [priceForm, setPriceForm] =useState({})
    const [searchParams,setSearchParams] = useSearchParams();
    function handleFormSubmit(e){
        e.preventDefault();
        if (!priceForm['min'] || !priceForm['max']){
            setPriceForm({...priceForm,'error':"both inputs required"})
            param.delete("price")
            setParam(param)
        }
        else if (priceForm['min'] > priceForm['max']){
            setPriceForm({...priceForm,'error':'min can not be bigger than max'})
            param.delete("price")
            setParam(param)
        }
        else if (priceForm['min'] > 9999 || priceForm['max'] > 9999){
            setPriceForm({...priceForm,'error':'please enter a range between 0 and 9999'})
            param.delete("price")
            setParam(param)
        }
        else if (priceForm['min'] < 0 || priceForm['max'] < 0){
            setPriceForm({...priceForm,'error':'please enter a range between 0 and 9999'})
            param.delete("price")
            setParam(param)
        }
        else {
            setPriceForm({...priceForm,'error':''})
            param.set("page", 1);
            param.set('price' , priceForm['min'] + "-" + priceForm['max'])
            setParam(param)
        }
    }

    function handleInputChange(e,option){
        let obj ={...priceForm};
        obj[option] = parseInt(e.target.value);
        setPriceForm(obj);
    }


    return (
        <>
            {
                Object.keys(filter.options).map((option)=>{
                    return(
                        <Option 
                            selected={checkSelectedOption(filter,option,searchParams)}
                            key={option}
                            onClick={(e)=>{handleOptionClick(filter,option)}}
                        >
                            {option}
                        </Option>
                    )
                })
            }
            <Form onSubmit={handleFormSubmit}>
                <InputContainer>
                    <EditedInput 
                        style={{border:`${priceForm['error']?'1px solid red':"none"}`}} 
                        onChange={(e)=>handleInputChange(e,"max")} 
                        type="number"/>
                    <EditedLabel 
                        style={{color:`${priceForm['error']?'red':'black'}`}} 
                        position={priceForm['min']}>min</EditedLabel>
                </InputContainer>
                <InputContainer>
                    <EditedInput 
                        style={{border:`${priceForm['error']?'1px solid red':'none'}`}} 
                        onChange={(e)=>handleInputChange(e,"max")} 
                        type="number"/>
                    <EditedLabel 
                        style={{color:`${priceForm['error']?'red':'black'}`}} 
                        position={priceForm['max']}>max</EditedLabel>
                </InputContainer>
                <SubmitButton>Go</SubmitButton>
            </Form>
            <div style={{fontSize:'clamp(.8rem , 2.3vw ,1.1rem)',color:"red",fontWeight:"600"}}>{priceForm['error']}</div>
        </>
    )
}