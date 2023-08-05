import styled from "styled-components"
import {Link} from "react-router-dom"
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
font-size:20px;
font-weight:600;
color:black;
text-decoration:none;
`
const ElementsContainer = styled.div`
display:flex;
flex-direction: column;
gap:2vh;

`

const Element = styled(Link)`;
font-size:18px;
font-weight:600;
text-decoration:none;
color:black;
opacity:.67;
`

export default function CategoryList(props){

    // collect all the options of each first title in an array and display the array under the title in the navbar
    function OptionsToArray(object){
        let arr= []
        OptionRender(object, arr)
        return arr
    }

    function OptionRender(object,arr){
        let title = object.title
        arr.push(title)
        let options =object.options
        if (!options || options.length == 0) {
            return null
        }
        for (let i = 0 ; i< options.length; i++){
            OptionRender(options[i],arr)
        }

    }
    return (
        <Parent display={props.show}>
            <ListContainer>
                <ListContent>
                    {props.categories.map((category)=>{
                        let options = OptionsToArray(category)
                        options.shift()
                        return (
                            <CategoryColumn key={category.title}>
                                <Title to="#">{category.title}</Title>
                                <ElementsContainer>
                                    {
                                        options.map((option) =>{
                                            return (<Element key={option} to="#">{option}</Element>)
                                        })
                                    }
                                </ElementsContainer>
                            </CategoryColumn>
                        )
                    })}
                </ListContent>
            </ListContainer>
            <Background onMouseEnter={()=>{props.setShowCategoryList((prevState)=>({...prevState,display:false}))}} />
        </Parent>
    )
}