import styled from 'styled-components';
import empty_star from "../../../assets/empty_star.png";
import star from "../../../assets/star.png";

import { useContext, useEffect, useState } from 'react';
import { ratingToStars } from '../../Product/Components/details-container';
import { useParams } from 'react-router-dom';
import { userStateContext } from '../../../Contexts/user-state';

const Container = styled.div`
padding: min(2rem ,5%);
display:flex;
flex-direction:column;
gap : 2rem;
align-items:flex-start;
`
const Text = styled.div`
align-self:center;
text-align:center;
`
const Title =styled.p`
color : #00C2FF;
font-size:1.5em;
font-weight:600;
margin: 0 0 .3em 0 ;
`
const SubTitle = styled.p`
color : #00C2FF;
font-size:1em;
font-weight:600;
`
const Content = styled.form`
display:flex;
flex-direction : column;
gap:2rem;
width:100%;
max-width:800px;
margin:auto;
`
const FormRow = styled.div`
display:flex;
flex-direction: column;
gap:1rem;
`
const Label = styled.label`
font-size:1em;
font-weight:600;

`
const ImageLabel = styled.label`
width:100px;
height:100px;
border:3px dashed black;
display:flex;
align-items:center;
justify-content:center;
font-size:4rem;
cursor:pointer;

&:hover{
    opacity:.7;
}

`
const TitleInput  = styled.input`
border:2px solid #A8AAAE;
border-radius:3px;
padding:10px;
`

const ReviewInput= styled.textarea`
width:100%;
resize:none;
height:200px;

border:2px solid #A8AAAE;
border-radius:3px;
padding:10px;
`
const StarsContainer = styled.div`
display:flex;
gap:15px;
`
const Star = styled.img`
width:10%;
cursor:pointer;
`
const RadioField = styled.div`
color:grey;
&:hover {
    color:#00C2FF;
}
cursor:pointer;
dispay:inline;
width:fit-content;
`
const RadioInput = styled.input`
cursor:pointer;
background:#00C2FF;
cursor:pointer;
&:checked+label{
    color:#00C2FF;
}
`
const RadioLabel= styled.label`
font-weight:600;
color:inherit;
cursor:pointer;
`
const SubmitButton = styled.button`
width:100%;
background:#00C2FF;
border:none;
padding:.5rem 0;
font-weight:600;
cursor:pointer;
`

//multipart/form-data , sends file in binary fromat
//application/json , transfer binary to base64 string and send them 
//Url.createObjectUrl() , creates a url that acts like a pointer to an object.expires when refresh
//FileReader(), read data from Blob object (converts it to other formats), File() object is a descendend from Blob() 
//FileReader::readAsDataURL() converts Blob objects to base64
//Blob() represents a file (bites)
export default function ReviewForm(){
    const [stars,setStars] = useState(5);
    const [starsList, setStarsList ] = useState(["star","star","star","star","star"]);
    const [images , setImages ]=  useState([]);
    const [details, setDetails] = useState({sizes:ss, colors:cs});

    const {token} = useContext(userStateContext);
    const {product_id} = useParams();

    useEffect(()=>{
        setStarsList(ratingToStars(stars))
    },[stars])

    useEffect(()=>{
        // requestColorsOfProduct(product_id);
        // requestSizesOfProduct(product_id);
    })

    async function requestSizesOfProduct(product_id){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+product_id+"/sizes");
        const response = await request.json();
        if (request.status == 200){
            setDetails({...details, sizes:response.sizes})
        }
    }

    async function requestColorsOfProduct(product_id){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+product_id+"/colors");
        const response = await request.json();
        if (request.status == 200){
            setDetails({...details, colors:response.colors})
        }
    }
    
    async function postFormData(data){
        const request = await fetch("http://127.0.0.1:8000/api/reviews",{
            method:"POST",
            body:data, 
            headers:{
                'Authorization' : "Bearer " + "6|CQ40OBPD4Es8EqUoM3O0Ewmi3tIycNFk88kVJWhQ",
            }
        })
        const response = await request.json()
        if (request.status == 201){
            console.log(response);
        }
    }

    function handleReviewFormSubmit (e){
        e.preventDefault();
        let form_data = new FormData(e.target);
        for (let x in images){
            form_data.append('images[]', images[x].file)
        }
        form_data.append("product_rating" , stars)
        form_data.append("product_id",product_id)
        postFormData(form_data)
    }

    return (
        <Container>
            <Text>
                <Title>
                    Review our Product
                </Title>
                <SubTitle>
                    Help others make the right decision
                </SubTitle>
           </Text>
           <Content onSubmit={handleReviewFormSubmit}>
                <FormRow>
                    <Label htmlFor="title">
                        Rating : 
                    </Label>
                    <StarsContainer>
                        {
                            starsList.map((value, index)=>{
                                return <Star onMouseEnter={()=>{setStars(index+1)}} src={value == "empty" ? empty_star :star} />
                            })
                        
                        }
                    </StarsContainer>
                </FormRow>
                <FormRow>
                    <Label htmlFor="title">
                        Add a title : 
                    </Label>
                    <TitleInput 
                        type="text" 
                        id="title"
                        name="title"
                        placeholder='What is the headline of your review ?'
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="review">
                        Add a review : 
                    </Label>
                    <ReviewInput 
                        id="review"
                        name="text"
                        placeholder='What do you think about the product ?'
                    />
                </FormRow>
                <FormRow>
                    <Label >
                        Add a photo (optional) :
                    </Label>
                    <div style={{width:"100%",display:"flex",gap:'5%'}}>
                        <div>
                            <ImageLabel htmlFor="image">+</ImageLabel>
                            <input 
                                id="image"
                                accept=".jpg, .jpeg, .png"
                                type="file" 
                                style={{visibility:"hidden",width:"1px"}} 
                                onChange={(e)=>{
                                    // createObjectUrl creates a url that acts like a pointer or an address to an object in memory 
                                    setImages([...images,{url:URL.createObjectURL(e.target.files[0]) , file:e.target.files[0]}])
                                }}
                            />
                        </div>
                        <div style={{width:"100%",display:"flex",gap:'5%',felxWrap:"wrap"}}>
                            {
                                images && images.map((image)=>{
                                    return <div style={{width:"100px"}}><img src={image.url} style={{width:"100%", height:"auto"}}/></div>
                                })
                            }
                        </div>
                    </div>
                </FormRow>
                <FormRow>
                    <Label htmlFor="height">
                        what is your height ? (optional)
                    </Label>
                    <TitleInput 
                        type="text" 
                        id="height"
                        name="user_height"
                        placeholder={`example 180cm , 5'6"`}
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="weight">
                        what is your weight ? (optional)
                    </Label>
                    <TitleInput 
                        type="text" 
                        id="weight"
                        name="user_weight"
                        placeholder={`example 190lbs , 80kg`}
                    />
                </FormRow>
                <FormRow>
                    <Label>
                        what size did you purchase ? (optional)
                    </Label>
                    <div style={{display:"flex" , flexDirection:"column", gap:"1em"}}>
                        {
                            details.sizes && details.sizes.map((size)=>{
                                return (
                                    <RadioField style={{display:"flex", gap:"8px"}}>
                                        <RadioInput type="radio" name="size" value={size} id={size}/>
                                        <RadioLabel htmlFor={size}>{size}</RadioLabel>
                                    </RadioField>
                                )
                            })
                        }
                    </div>
                </FormRow>
                <FormRow>
                    <Label>
                        what color did you purchase ? (optional)
                    </Label>
                    <div style={{display:"flex" , flexDirection:"column", gap:"1em"}}>
                        {
                            details.colors && details.colors.map((color)=>{
                                return (
                                    <RadioField style={{display:"flex", gap:"8px"}}>
                                        <RadioInput type="radio" name="color" value={color} id={color}/>
                                        <RadioLabel htmlFor={color}>{color}</RadioLabel>
                                    </RadioField>
                                )
                            })
                        }
                    </div>
                </FormRow>
                <SubmitButton type="submit">
                    Add Review
                </SubmitButton>
           </Content>
        </Container>
    )
}

const ss = [
    'Large', 
    'Small',
    'Medium',
    'Xlarge'
]

const cs = [
    'red',
    'purple',
    'dark black',
    'yellow'
]
