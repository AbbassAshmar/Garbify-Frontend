import styled from "styled-components";
import ReviewCard from "../../../components/ReviewCard/review-card";
import SimplifiedProductCard from "../../../components/SimplifiedProductCard/simplified-product-card";
import SimplifiedProductCardHorizontal from "../../../components/SimplifiedProductCard/Simplified-product-card-horizontal";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/use-click-outside";
import ConfirmationPopUp from "../../../components/ConfirmationPopUp/confirmation-pop-up";
import useUserState from "../../../hooks/use-user-state";
import { useSendRequest } from "../../../hooks/use-fetch-data";
import { useNavigate } from "react-router-dom";
import SuccessOrErrorPopUp from "../../../components/SuccessOrErrorPopUp/success-or-error-pop-up";

const Container = styled.div`
box-shadow:0px 0px 10px rgba(0,0,0,0.6);
padding:1rem;
@media screen and (max-width:800px){
    padding: 0 15px 15px 15px;
}
`

const Header = styled.div`
width:100%;
display:flex;
justify-content:flex-end;
align-items:flex-start;
`
const DropDownContainer = styled.div`
position:relative;
margin:0 0 1rem 0;
@media screen and (max-width:800px){
    margin: 1rem 0;
}
`
const OptionsIcon = styled.i`
cursor:pointer;
`
const Icon = styled.i`
font-size:clamp(.7rem,2vw,.9rem);
width:15px;
`
const Content = styled.div`
display:flex;
@media screen and (max-width:800px){
    flex-direction:column;
    border: 2px solid #C0C3C7;
}
`
const ReviewCardContainer = styled.div`
padding:0 min(2rem,5%);
@media screen and (max-width:800px){
    padding:1rem;
}
`
const DropDownOptions = styled.div`
background:white;
box-shadow:0px 0px 4px rgba(0,0,0,0.8);
position:absolute;
border-radius:3px;
overflow:hidden;
right:0%;
z-index:2;
max-height:${({$show})=>$show ? '500px':'0'};
transition: max-height .3s, padding .3s;
`
const OptionsContainer = styled.div`
display:flex;
flex-direction:column;
`
const Option = styled.div`
font-weight:600;
font-size:clamp(.7rem,2vw,.9rem);
text-wrap:nowrap;
display:flex;
gap:10px;
justify-content:flex-start;
align-items:flex-end;
border-bottom:2px solid #C0C3C7;
padding-bottom:.5rem;
padding:1rem;
cursor:pointer;
&:hover{
    background:#C0C3C7;
}
`

const DeleteReviewPopUpContainer = styled.div`
position:fixed;
`

function DeleteReviewConfirmationPopUp({review}){
    return (
        <DeleteReviewPopUpContainer>

        </DeleteReviewPopUpContainer>
    )
}


export default function UserReviewCard({review,setReviews}){
    const [showDropDownOptions,setShowDropDownOptions] = useState(false);
    const [showDeleteConfirmation,setShowDeleteConfirmation] = useState(false);
    const [showArchiveConfirmation , setShowArchiveConfirmation] = useState(false);
    const [resultPopUp ,setResultPopUp] = useState({show:false,status:'',message:''})

    let navigate = useNavigate();
    const userContext = useUserState();
    const {sendRequest, serverError} = useSendRequest(userContext);

    const DropDownOptionsRef = useRef();
    const archiveButtonRef = useRef();
    const deleteButtonRef = useRef();

    useClickOutside([DropDownOptionsRef],showDropDownOptions,()=>{
        setShowDropDownOptions(false);
    })

    function handleOptionsIconClick(){
        setShowDropDownOptions(!showDropDownOptions)
    }

    function handleEditReviewClick(){
        navigate('/reviews/' + review.id + '/edit');
    }

    function handleArchiveReviewClick(){
        setShowArchiveConfirmation(true)
    }
    
    function handleDeleteReviewClick(){
        setShowDeleteConfirmation(true)
    }

    async function handleDeleteReview(e){
        let url = '/api/reviews/' + review.id;
        let init = { method :"DELETE" };
        let {request, response} = await sendRequest(url,init);

        if (request?.ok){
            setResultPopUp({show:true,status:"Success",message:response.metadata.message})
            setReviews((prev)=> (prev.filter((rev)=> review.id != rev.id )))

        }

        if (request && !request.ok){
            setResultPopUp({show:true,status:"Error",message:response.error.message})
        }
    }

    async function handleArchiveReview(e){
        let url = '/api/reviews/'+review.id+'/archive';
        let init = { method :"DELETE" };
        let {request, response} = await sendRequest(url,init);

        if (request?.ok){
            setResultPopUp({show:true,status:"Success",message:response.metadata.message})
        }

        if (request && !request.ok){
            setResultPopUp({show:true,status:"Error",message:response.error.message})
        }
    }
    

    return(
        <Container>
            <SuccessOrErrorPopUp settings={resultPopUp} setSettings={setResultPopUp} serverError={serverError}/>
            <Header>
                <DropDownContainer ref={DropDownOptionsRef}>
                    <OptionsIcon onClick={handleOptionsIconClick}  className="fa-solid fa-ellipsis"/>
                    <DropDownOptions $show={showDropDownOptions} >
                        <OptionsContainer>
                            <Option onClick={handleEditReviewClick} >
                                <Icon className="fa-solid fa-pen"/> 
                                <div style={{lineHeight:"1"}}>Edit review</div> 
                            </Option>

                            <div>
                                <Option onClick={handleArchiveReviewClick} ref={archiveButtonRef}>
                                    <Icon className="fa-solid fa-trash"/> 
                                    <div style={{lineHeight:"1"}}>Archive review</div> 
                                </Option>
                                <ConfirmationPopUp 
                                handleAction = {handleArchiveReview}
                                show={showArchiveConfirmation}  
                                setShow={setShowArchiveConfirmation}
                                cancelButtonRef={archiveButtonRef}
                                subTitle={"Are you sure you want to archive this review? Archived reviews won't be visible to others but will be kept for our records."}
                                title={'Archive Review'}
                                cancelAction={'keep Review'}
                                confirmAction={'Archive Review'}/>
                            </div>
                            
                            <div>
                                <Option onClick={handleDeleteReviewClick} ref={deleteButtonRef} style={{border:"none"}}>
                                    <Icon className="fa-solid fa-box-archive"/>
                                    <div  style={{lineHeight:"1"}}>Delete review</div>
                                </Option>
                                <ConfirmationPopUp 
                                handleAction = {handleDeleteReview}
                                show={showDeleteConfirmation}  
                                setShow={setShowDeleteConfirmation}
                                cancelButtonRef={deleteButtonRef}
                                subTitle={'Are You sure You want to delete this review ?'}
                                title={'Delete Review'}
                                cancelAction={'keep Review'}
                                confirmAction={'Delete Review'}/>
                            </div>
                        </OptionsContainer>
                    </DropDownOptions>
                </DropDownContainer>
            </Header>
            <Content>
                {window.innerWidth > 800 && <SimplifiedProductCard style={{width:"35%",minWidth:"220px"}} product={review.product}/>}
                {window.innerWidth <= 800 &&(
                    <div style={{borderBottom:'2px solid #C0C3C7',padding:'1rem'}} >
                        <SimplifiedProductCardHorizontal image_width={'80px'} style={{minHeight:'0'}} product={review.product}/>
                    </div>
                )}
                <ReviewCardContainer>
                    <ReviewCard review={review} />
                </ReviewCardContainer>
            </Content>
        </Container>
    )
}