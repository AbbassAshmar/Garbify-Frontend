import styled from 'styled-components';
import empty_star from "../../assets/empty_star.png";
import star from "../../assets/star.png"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSendRequest } from '../../hooks/use-fetch-data';
import useUserState from '../../hooks/use-user-state';
import SuccessOrErrorPopUp from '../../components/SuccessOrErrorPopUp/success-or-error-pop-up';
import Loading from '../../components/Loading/loading';
import ReviewSuccess from '../ReviewSuccess/review-success';
import { ratingToStars } from '../../components/RatingStars/rating-stars';
import useRenderInputField, { ErrorMsg } from '../../hooks/user-render-input-field';

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
color : black;
font-size:1.5em;
font-weight:600;
margin: 0 0 .3em 0 ;
`
const SubTitle = styled.p`
color:grey;
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
color:${({$color})=>$color};
font-size:1rem;
font-weight:600;

`
const ImageLabel = styled.label`
width:100px;
height:100px;
color:${({$color})=>$color};
border:3px dashed ${({$color})=>$color};
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
font-weight:600;
`

const ReviewInput= styled.textarea`
width:100%;
resize:none;
height:200px;
border:2px solid #A8AAAE;
border-radius:3px;
padding:.5rem;
font-weight:600;
`
const StarsContainer = styled.div`
display:flex;
gap:15px;
`
const Star = styled.img`
width:7%;
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
padding:.8rem 0;
font-weight:600;
cursor:pointer;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
border-radius:3px;
height:50px;
display:flex;
align-items:center;
justify-content:center;
&:disabled{
    background:grey;
}
`

//multipart/form-data , sends file in binary fromat
//application/json , transfer binary to base64 string and send them 
//Url.createObjectUrl() , creates a url that acts like a pointer to an object.expires when refresh
//FileReader(), read data from Blob object (converts it to other formats), File() object is a descendend from Blob() 
//FileReader::readAsDataURL() converts Blob objects to base64
//Blob() represents a file (bites)

function AvailableColors({inputErrors,formData,setFormData}){
    let {product_id} = useParams();
    const [productColors,setProductColors] = useState();
    
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    useEffect(()=>{
        requestColorsOfProduct(product_id)
    },[]);

    function requestColorsOfProduct(product_id){
        const uri = "/api/products/"+product_id+"/colors"
        const {request, response} = sendRequest(uri)
    
        if (request?.status == 200){
            setProductColors(response.data.colors)
        }

        setProductColors(['red','green','yellow','blue'])
    }

    return(
        <FormRow>
            <Label $color={inputErrors.fields.includes('colors')?"red":"black"}>
                what color did you purchase ? (optional)
            </Label>
            <div style={{display:"flex" , flexDirection:"column", gap:"1em"}}>
                {productColors && productColors.map((color,index)=>{
                    return (
                        <RadioField key={index} style={{display:"flex", gap:"8px"}}>
                            <RadioInput onChange={()=>setFormData({...formData,colors:color})} checked={formData.colors === color} type="radio" name="color" value={color} id={color}/>
                            <RadioLabel htmlFor={color}>{color}</RadioLabel>
                        </RadioField>
                    )
                })}
            </div>
            {inputErrors.message['colors'] && <ErrorMsg>{inputErrors.message['colors']}</ErrorMsg>}
        </FormRow>
    )
}

function AvailableSizes({inputErrors,formData,setFormData}){
    let {product_id} = useParams();
    const [productSizes,setProductSizes] = useState();

    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);


    useEffect(()=>{
        requestSizesOfProduct(product_id)
    },[])

    async function requestSizesOfProduct(product_id){
        const uri = "/api/products/"+product_id+"/sizes"
        const {request, response} = await sendRequest(uri)
    
        if (request?.status == 200){
            setProductSizes(response.data.sizes)
        }

        // test 
        setProductSizes(['xl','small','medium']);
    }

    return (
        <FormRow>
            <Label $color={inputErrors.fields.includes('sizes')?"red":"black"}>
                what size did you purchase ? (optional)
            </Label>
            <div style={{display:"flex" , flexDirection:"column", gap:"1rem"}}>
                {
                    productSizes && productSizes.map((size,index)=>{
                        return (
                            <RadioField key={index} style={{display:"flex", gap:"8px"}}>
                                <RadioInput onChange={()=>setFormData({...formData,sizes:size})} checked={formData.sizes === size} type="radio" name="size" value={size} id={size}/>
                                <RadioLabel htmlFor={size}>{size}</RadioLabel>
                            </RadioField>
                        )
                    })
                }
            </div>
            {inputErrors.message['sizes'] && <ErrorMsg>{inputErrors.message['sizes']}</ErrorMsg>}
        </FormRow>
    )
}

export default function ReviewForm({review}){

    const TITLE_KEY = 'title';
    const HEIGHT_KEY = 'example 180cm';
    const WIEGHT_KEY = 'example 80kg';
    const REVIEW_KEY = 'What do you think about the product ?';

    const [formData, setFormData] = useState({
        [TITLE_KEY]: null,
        [HEIGHT_KEY]: null,
        [WIEGHT_KEY]: null,
        [REVIEW_KEY]: null,
        sizes : null,
        colors : null,
    });

    const [inputErrors,setInputErrors] = useState({
        fields:[], 
        message:{} 
    })
   

    const inputField = useRenderInputField(inputErrors,setFormData,formData);

    const [starsOnLastClick,setStarsOnLastClick] = useState(5)
    const [stars,setStars] = useState(5);
    const [starsList, setStarsList ] = useState(["star","star","star","star","star"]);

    const [deletedImages, setDeletedImages] = useState([]);
    const [images , setImages]=  useState([]);

    const [submitLoading,setSubmitLoading] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(null);

    const {product_id} = useParams();
    const userContext = useUserState();
    const {sendRequest,serverError} = useSendRequest(userContext);

    useEffect(()=>{
        return ()=>{
            const imageUrls = images.map((image) => image.url);
            for (const url of imageUrls) {
                URL.revokeObjectURL(url);
            }
        }
    },[])

    useEffect(()=>{
        setStarsList(ratingToStars(stars))
    },[stars])

    // Update state based on the provided review data
    useEffect(() => {
        if (review && !actionSuccess) {
            setStars(review.rating || 5);
            setStarsOnLastClick(review.rating || 5);

            setFormData({
                [TITLE_KEY] : review.title || "",
                [REVIEW_KEY] : review.text || "",
                [HEIGHT_KEY] : review.user_height || "",
                [WIEGHT_KEY] : review.user_weight || "",
                sizes:review.size || '',
                colors: review.color || '',
            })
            
            setImages(review.images?.map((x) => ({ url: x, file: null ,new:false})) || []);
        }
    }, [review]);

    function handleImageUpload(e){
        // createObjectUrl creates a url that acts like a pointer or an address to an object in memory 
        setImages([...images,{url:URL.createObjectURL(e.target.files[0]) , file:e.target.files[0],new:true}])
    }

    function handleImageDelete(image_url){
        setImages(images.filter((image)=> {
            if(image.url == image_url && !image.new){
                setDeletedImages([...deletedImages,image_url])
            }
            return image.url != image_url
        }))
    }

    async function handleReviewFormSubmit (e){
        e.preventDefault();
        let data=  handleformData(e,stars,product_id,images,deletedImages,formData);
      
        setSubmitLoading(true);
        await (review ? updateReview(data) :  createReview(data))
        setSubmitLoading(false);

    }

    function handleResponseKeysNaming(responseObject){
        const keyMappings = {
            'user_height': HEIGHT_KEY,
            'user_weight': WIEGHT_KEY,
            'title' : TITLE_KEY,
            'text' : REVIEW_KEY,
        };

        const updatedObject = {};

        if (Array.isArray(responseObject)) {
            return responseObject.map(item => {              
                const updatedItem = keyMappings[item] || item;
                return updatedItem;
            });
        }

        for (const key in responseObject) {
            const updatedKey = keyMappings[key] || key;
            updatedObject[updatedKey] = responseObject[key];
        }

        return updatedObject;
    }

    async function createReview(data){
        const uri = '/api/reviews';
        const init = {method:"POST",body:data};
        const {request,response} = await sendRequest(uri,init)

        if (request?.status == 201){
            // review created
            setActionSuccess(true);
        }

        else if (request?.status === 400){ // error related to user's input
            let fields = handleResponseKeysNaming(response.metadata.error_fields);
            let message = handleResponseKeysNaming(response.error.details);

            setInputErrors({fields: fields, message : message})
        }
        
        else {  //error that is not related to user's input
            setInputErrors({fields:[], message:[]});
        }
        
    }

    async function updateReview(data){
        const review_id = review.id;
        const uri = '/api/reviews/' + review_id;
        const init = {method:"PATCH",body:data};
        const {request,response} = await sendRequest(uri,init)

        if (request?.status == 200){
            // review updated
            setActionSuccess(true)
        }

        else if (request?.status === 400){ // error related to user's input
            let fields = handleResponseKeysNaming(response.metadata.error_fields);
            let message = handleResponseKeysNaming(response.error.details);

            setInputErrors({fields: fields, message : message})
        }
        
        else {  //error that is not related to user's input
            setInputErrors({fields:[], message:[]});
        }

    }
    
    async function handleformData (e,stars,product_id,images,deletedImages,formData){
        let form_data = new FormData();

        form_data.append('title',formData['title']);
        form_data.append('sizes',formData['sizes']);
        form_data.append('colors',formData['colors']);
        form_data.append('text',formData[REVIEW_KEY]);
        form_data.append('user_height',formData[HEIGHT_KEY]);
        form_data.append('user_weight',formData[WIEGHT_KEY]);

        form_data.append("product_rating" , stars);
        form_data.append("product_id",product_id);

        for (let image in images){
            images[image].file && form_data.append('images[]', images[image].file);
        }

        for (let image of deletedImages){
            form_data.append('deletedImages[]', image);
        }

        return form_data;
    }
    
    if (actionSuccess){
        return (<ReviewSuccess action={review ? 'edited' : 'created'}/>)
    }

    return (
        <Container>
            <SuccessOrErrorPopUp serverError={serverError} />
            <Text>
                <Title>Review our Product</Title>
                <SubTitle>Help others make the right decision</SubTitle>
           </Text>
           <Content onSubmit={handleReviewFormSubmit}>
                <FormRow >
                    <Label $color={inputErrors.fields.includes('rating')?"red":"black"}>
                        Rating :
                    </Label>
                    <StarsContainer>
                        {
                            starsList.map((value, index)=>{
                                return <Star
                                key={index} 
                                onMouseEnter={()=>{setStars(index+1)}} 
                                onClick={(e)=>{setStarsOnLastClick(stars)}}
                                onMouseLeave={(e)=>{setStars(starsOnLastClick)}}
                                src={value == "empty" ? empty_star :star}/>
                            })
                        }
                    </StarsContainer>
                    {inputErrors.message['rating'] && <ErrorMsg>{inputErrors.message['rating']}</ErrorMsg>}
                </FormRow>

                <FormRow>
                    <Label $color={inputErrors.fields.includes(TITLE_KEY)?"red":"black"}>
                        Add a title : 
                    </Label>
                    {inputField(TITLE_KEY,'text')}
                </FormRow>
                
                <FormRow>
                    <Label $color={inputErrors.fields.includes(REVIEW_KEY)?"red":"black"}>
                        Add a review :
                    </Label>
                    {inputField(REVIEW_KEY,'textarea')}
                </FormRow>

                <FormRow>
                    <Label $color={inputErrors.fields.includes('images')?"red":"black"}>
                        Add a photo (optional) :
                    </Label>
                    <div style={{display:'fex', flexDirection:'column'}}>
                        <div style={{width:"100%",display:"flex",gap:'5%'}}>
                            <div>
                                <ImageLabel $color={inputErrors.fields.includes('images')?"red":"black"} htmlFor="images">+</ImageLabel>
                                <input 
                                    id="images"
                                    accept=".jpg, .jpeg, .png"
                                    type="file" 
                                    style={{visibility:"hidden",width:"1px"}} 
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div style={{width:"100%",display:"flex",gap:'5%',flexWrap:"wrap"}}>
                                {
                                    images && images.map((image,index)=>{
                                        return (
                                            <div key={index} style={{width:"100px"}} onClick={(e)=>{handleImageDelete(image.url)} }>
                                                <img src={image.url} style={{width:"100%", height:"auto",cursor:'pointer'}}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {inputErrors.message['images'] && <ErrorMsg>{inputErrors.message['images']}</ErrorMsg>}
                    </div>
                    
                </FormRow>
                <FormRow>
                    <Label $color={inputErrors.fields.includes(HEIGHT_KEY)?"red":"black"}>
                        what is your height ? (optional)
                    </Label>
                    {inputField(HEIGHT_KEY,'text')}
                </FormRow>

                <FormRow>
                    <Label $color={inputErrors.fields.includes(WIEGHT_KEY)?"red":"black"}>
                        what is your weight ? (optional)
                    </Label>
                    {inputField(WIEGHT_KEY,'text')}
                </FormRow>

                <AvailableSizes inputErrors={inputErrors} formData={formData} setFormData={setFormData}/>
                <AvailableColors inputErrors={inputErrors} formData={formData} setFormData={setFormData}/>

                <SubmitButton disabled={submitLoading || ""} type="submit" >
                    {submitLoading && <Loading style={{scale:'.3'}}/> }
                    {!submitLoading && 'Submit Review' }
                </SubmitButton>
           </Content>
        </Container>
    )
}


