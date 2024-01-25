import styled from 'styled-components';
import ProductsSlider from '../../../components/ProductsSlider/products-slider';
import { PRODUCTS } from '../../../components/products-data';
import ReviewImage from "../../../../src/assets/ReviewImage.png";
import { Link, useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
padding:2rem;
display:flex;
flex-direction:column;
gap:4rem;
margin-bottom:3rem;

@media screen and (max-width:800px){
    padding:1rem;
}
`

const MainSection = styled.div`
width:100%;
display:flex;
justify-content:space-between;
gap:5%;
align-items:center;
@media screen and (max-width:800px){
    gap:4rem;
    flex-direction:column;
}
`

export const TextContainer  = styled.div`
flex:1;
display:flex;
flex-direction:column;
gap:2rem;

@media screen and (max-width:800px){
    align-items:center;
    text-align:center;
}
`
export const TitleContainer = styled.div`
display:flex;
flex-direction:column;
gap:1rem;
@media screen and (max-width:800px){
    align-items:center;
}
`
export const DoneContainer = styled.div`
display:flex;
gap:1rem;
align-items:flex-end;
`
export const DoneWord  = styled.h2`
font-weight:600;
font-size:var(--heading-2);
color:#00C2FF;
@media screen and (max-width:600px){
    font-size:var(--heading-2-mobile);
}
`
export const Title = styled.h4 `
color : black;
font-weight:600;
letter-spacing:-0.01em;
font-size:var(--heading-4);
@media screen and (max-width:600px){
    font-size:var(--heading-4-mobile);
}
`
export const SubText = styled.h6`
margin:0;
font-weight:500;
color:grey;
line-height:1.3em;
font-size:var(--heading-6);
@media screen and (max-width:600px){
    font-size:var(--heading-6-mobile);
}
`
const ButtonsContainer = styled.div`
display:flex;
gap:1rem;
justify-content:flex-start;
@media screen and (max-width:800px){
    width:100%;
    flex-direction:column;
}
`
export const EditReviewButton = styled.button`
width:180px;
height:40px;
border:none;
color:white;
outline:none;
box-shadow:0px 0px 6px rgba(0,0,0,0.4);
background: #00C2FF;
font-weight:600;
border-radius:3px;
cursor:pointer;
transition:background .3s;
&:hover{
    background: #009BCC;
}
@media screen and (max-width:800px){
    width:100%;
}
`
const GoBackButton = styled(EditReviewButton)`
color:black;
background:white;
&:hover{
    background: rgb(230,230,230);
}
`

const ImageContainer = styled.div`
flex:1;
display:flex;
align-items:start;
`

const Image = styled.img`
width:100%;
`


export const CheckCircle = ({size=60, color="#00C2FF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

export default function CanNotReview({reviewId}){
    const navigate = useNavigate();

    function handleGoBackClick(e){
        navigate(-1);
    }

    function handleEditReviewClick(e){
        navigate('/review/'+reviewId+'/edit');
    }

   
    return (
        <Container>
            <MainSection>
                <TextContainer>
                    <TitleContainer>
                        <DoneContainer>
                            <CheckCircle size={window.innerWidth<600 ? 40 : 60}/> 
                            <DoneWord>Done</DoneWord>
                        </DoneContainer>
                        <Title>You have already reviewed this product !</Title>
                    </TitleContainer>

                    <SubText>If you'd like to make changes or add more details, feel free to edit your review below.</SubText>

                    <ButtonsContainer>
                        <EditReviewButton onClick={handleEditReviewClick}>Edit review</EditReviewButton>
                        <GoBackButton onClick={handleGoBackClick}>Go back</GoBackButton>
                    </ButtonsContainer>
                </TextContainer>
                <ImageContainer>
                    <Image src={ReviewImage}/>
                </ImageContainer>
            </MainSection>

            <ProductsSlider title={"Products You May Like : "} products={PRODUCTS}/>
        </Container>
    )
}
