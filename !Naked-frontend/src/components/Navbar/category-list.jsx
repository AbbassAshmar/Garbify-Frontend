import styled from "styled-components"
import {Link} from "react-router-dom"
import { useEffect } from "react"

// z-index : 200
export const Parent = styled.div`
height:100vh;
max-height:${({display})=>display?"100vh":"0"};
width:100%;
position:absolute;
top:100%;
left : 0;
transition:max-height .4s;
overflow:hidden;
z-index:200;
`

export const Background = styled.div`
backdrop-filter: blur(10px) ;
height:100%;
width:100%;
opacity:${({opacity})=>opacity};
transition:opacity .2s .2s;
`

const ListContainer = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
background:white;
`
const ListContent = styled.div`
margin:7vh 0;
display:flex;
gap:13vw;
align-items:flex-start;
background:white;
`
const CategoryColumn = styled.div`
display:flex;
flex-direction:column;
gap:3vh;
background:white;
`


const Title = styled(Link)`
font-weight:600;
color:black;
text-decoration:none;

font-size:1.3rem;
@media screen and (max-width:1000px){
    font-size:1.1rem;
}
`
const ElementsContainer = styled.div`
display:flex;
flex-direction: column;
gap:2vh;

`

const Element = styled(Link)`;
font-weight:600;
text-decoration:none;
color:black;
opacity:.67;

font-size:1rem;
@media screen and (max-width:1000px){
    font-size:.8rem;
}
`
// return url for titles 
const getTitlesUrl = (parent,name)=>{
    name = name.replaceAll(" ","-")
    if (parent == "sales" || parent=="new arrivals"){
        return '/products/'+name+`?${parent.split(" ")[0]}=true`
    }
    return (`/products/`+parent.replaceAll(" ","-")+"/"+name)
}

// return url for options 
export const getOptionsUrl = (parents ,name)=>{
    parents = parents.map((parent)=> parent.replaceAll(" ","-"))
    name = name.replaceAll(" ","-")
    if (parents[0]== 'sales' || parents[0]=="new-arrivals"){
        let queryString = parents.shift()
        return'/products/'+parents.join("/")+"/"+name+`?${queryString}=true`
    }
    return '/products/'+parents.join("/")+"/"+name
}

//converts {name,children[{name,children[...]}]} to [{name , parents[]} , {name,parents[]} ...]
export function arrayNameParentsForm(obj, arr){
    let result = [{name:obj["name"] , parents:arr}];
    if (obj['children']) {
        for (let i= 0 ; i < obj['children'].length ; i++ ){
            result = [...result, ...arrayNameParentsForm(obj['children'][i],[...arr,obj['name']])]            }
    }
    return result;
}

export default function CategoryList(props){

    return (
        <Parent display={props.show}>
            <ListContainer>
                <ListContent>
                    {props.categories.map((category)=>{
                        let optionsArr = arrayNameParentsForm(category,[props.topParent])
                        optionsArr.shift()
                        return (
                            <>
                            {
                            optionsArr&&optionsArr.length>0?
                            <CategoryColumn key={category.name}>
                                <Title to={getTitlesUrl(props.topParent, category.name)}>
                                    {category.name}
                                </Title>
                                <ElementsContainer>
                                    {
                                        optionsArr.map((option) =>{
                                            return (
                                                <Element 
                                                    key={option.name} 
                                                    to={getOptionsUrl(option.parents,option.name)}
                                                >{option.name}
                                                </Element>
                                            )
                                        })
                                    }
                                </ElementsContainer>
                            </CategoryColumn>
                            :null
                            }
                            </>
                        )
                    })}
                </ListContent>
            </ListContainer>
            <Background opacity={props.show?'1':'0'} onMouseEnter={()=>{props.setShowCategoryList((prevState)=>({...prevState,display:false}))}} />
        </Parent>
    )
}