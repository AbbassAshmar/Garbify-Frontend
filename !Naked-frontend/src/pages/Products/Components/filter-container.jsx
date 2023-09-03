import { useEffect, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { Input,Label,Submit } from "../../Registration/registration"


const Filters= [
    {
        name : "Categories",
        type: "list",
        options:[
            "running Shoes",
            "High Heals",
            "Formal Shoes",
            "loafers"
        ]
    },

    {
        name : "color",
        type:"list",
        options:[
            "red",
            "black",
            "blue"
        ]
    },
    {
        name: "price",
        type:"list",
        options:{
            "under 235$" : "0-235",
            "235$ to 270$":"235-270",
            "270$ to 305$":"270-305",
            "over 305$":"305"
        }
    },
    {
        name:"size",
        type:"list",
        options:[
            'xlarge',
            'large',
            'small',
            'medium',
            'xxlarge'
        ]
    }

]
const Container = styled.div`
flex:${({flex})=>flex};
overflow:hidden;
display:flex;
margin-right:${({margin})=>margin};
transition:flex .3s;
`
const Content = styled.div`

`

const FilterBy = styled.p`
font-size:1.1em;
margin:0;
margin-bottom:2rem;
font-weight:600;

`
const Wrapper =styled.div`
height:100vh;
width:100%;
display:flex;
flex-direction:column;
gap:.5rem;
font-size:1rem;
`
const FilterBox =styled.p`
margin:0;
border-bottom:1px solid rgba(189, 189, 189,.7);
margin-bottom:1.3rem;
padding-bottom:1.3em;
`
const Title = styled.button`
width:100%;
cursor:pointer;
border:none;
font-weight:600;
display:flex;
align-items:center;
font-size:1em;
padding-bottom:1.1em;
justify-content:space-between;
background:white;
`
const AngleIcon = styled.i`
transform:rotateX(${({angle})=>angle});
transition:transform .3s;
`
const Options = styled.div`
max-height:${({height})=>height};
width:100%;
overflow:hidden;
display:flex;
flex-direction:column;
transition:max-height .3s;
gap:.9rem;
`


const CategoryLink = styled(Link)`
color:black;
text-decoration:none;
font-weight:600;
width:fit-content;
opacity:.7;
&:hover{
    opacity:1;
}
`
const Option = styled(CategoryLink)`

`
const OptionColor = styled(Option)`
&:hover{
    opacity:1;
    color:${({color})=>color};
}
`
const Form = styled.form`
display:flex;
gap:3px;
margin-top:1.2rem;
`
const InputContainer = styled.div`
position:relative;
flex:2;
border:1px solid rgba(189, 189, 189,.7);
`
const EditedInput = styled(Input)`
height:min(1rem , 1vh);
outline:none;
border-radius:2px;
font-size:.9em;
`

const EditedLabel = styled(Label)`
top:${({position})=>position?'-25%':"20%"};
font-size:${({position})=>position?'.8em':"1em"};

${Input}:focus + &{
    top:-25%;
    left:2%;
    font-size:.8em;
}
`


const FormSubmit = styled(Submit)`
flex:1;
height:auto;
border-radius:2px;

`
export default function FilterContainer({show,category}){
    const [categories, setCategories] = useState([])
    const [showOptions, setShowOptions] = useState([])
    const [param,setParam]= useSearchParams()
    const location = useLocation()
    const [priceForm, setPriceForm] =useState({})

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
            param.set('price' , priceForm['min'] + "-" + priceForm['max'])
            setParam(param)
        }
        
    }
    async function requestCategoryChildren(){
        const request = await fetch(`http://127.0.0.1:8000/api/categories/${category}/children`)
        const response = await request.json();
        if (request.status == 200){
            setCategories(response["children"])
        }
    }


    function checkIfInArray(element, array){
        for (let e in array){
            if (array[e] == element){
                return true
            }
        }
        return false
    }

    function handleOptionClick(filter,option){
        if( filter.name == "price") {
            param.set(filter.name.toLowerCase(),filter.options[option])
        }else{
        param.set(filter.name.toLowerCase(),option)
        }
        setParam(param)
    }
    
    function SwitchFunction(filter){
        
        if (filter.name== "price"){
            return (
                <>
                {
                    Object.keys(filter.options).map((option)=>{
                        return(
                            <Option onClick={(e)=>{handleOptionClick(filter,option)}}
                            >{option}</Option>
                        )
                    })
                }
                <Form onSubmit={handleFormSubmit}>
                    <InputContainer>
                        <EditedInput style={{border:`${priceForm['error']?'1px solid red':"none"}`}} onChange={(e)=>{setPriceForm({...priceForm,'min':parseInt(e.currentTarget.value)})}}  type="number" />
                        <EditedLabel style={{color:`${priceForm['error']?'red':'black'}`}} position={priceForm['min']}>min</EditedLabel>
                    </InputContainer>
                    <InputContainer>
                        <EditedInput style={{border:`${priceForm['error']?'1px solid red':'none'}`}} onChange={(e)=>{setPriceForm({...priceForm,'max':parseInt(e.currentTarget.value)})}} type="number"/>
                        <EditedLabel style={{color:`${priceForm['error']?'red':'black'}`}} position={priceForm['max']}>max</EditedLabel>
                    </InputContainer>
                    <FormSubmit>Go</FormSubmit>
                </Form>
                <div style={{color:'red',fontWeight:"600",fontSize:".8em"}}>{priceForm['error']}</div>

                </>
            )
        }
        else if (filter.name=="Categories"){
            return(
                <>
                {
                    filter.options.map((option)=>{
                        return(
                            <CategoryLink to={`${location.pathname}/${option.replace(" ",'-')}`}>{option}</CategoryLink>
                        )
                    })
                }
                </>
            )
        }
        else if (filter.type == "list"){
            return (
            <>{
                filter.options.map((option)=>{
                    return(
                        <>
                        {
                        filter.name=='color' ?
                        <OptionColor 
                        color={option}
                        onClick={(e)=>{ e.preventDefault(); return handleOptionClick(filter,option)}}>
                            {option}
                        </OptionColor>
                        :
                        <Option onClick={(e)=>{return handleOptionClick(filter,option)}}>
                            {option}
                        </Option>
                        }
                        </>
                    )
                })
            }</>)
        }
    }


    const handleTitleClick =(filter)=>{
        if (showOptions[filter.name]){
            setShowOptions({...showOptions,[filter.name]:false})
        }else{
            setShowOptions({...showOptions,[filter.name]:true})
        }
    }


    return ( 
        <Container margin={show?"2rem":"0"} flex={show?"1":"0"}>
            <Content>
                <FilterBy>Filter by</FilterBy>
                <Wrapper>
                    {
                        Filters.map((filter)=>{
                            return (
                                <FilterBox key={filter.name}>
                                    <Title onClick={(e)=>{handleTitleClick(filter)}}>
                                        <span>{filter.name}</span> 
                                        <AngleIcon angle={showOptions[filter.name]?"180deg":"0"} className="fa-solid fa-angle-down"/>
                                    </Title>
                                    <Options height={showOptions[filter.name] ? "50vh":"0"}>
                                    {     
                                        SwitchFunction(filter)
                                    }
                                    </Options> 
                                </FilterBox>
                            )
                        })
                    }
                </Wrapper>
            </Content>
        </Container>
    )
}