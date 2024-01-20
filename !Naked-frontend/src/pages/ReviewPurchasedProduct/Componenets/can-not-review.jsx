import styled from 'styled-components';
import ProductsSlider from '../../../components/ProductsSlider/products-slider';
import { PRODUCTS } from '../../../components/products-data';
import ReviewImage from "../../../../src/assets/ReviewImage.png";

const Container = styled.div`
padding:2rem;
display:flex;
flex-direction:column;
gap:4rem;
`

const MainSection = styled.div`
width:100%;
display:flex;
justify-content:space-between;
gap:20%;
`

const TextContainer  = styled.div`
flex:1;
display:flex;
flex-direction:column;
gap:3rem;
`
const TitleContainer = styled.div`
display:flex;
flex-direction:column;
gap:.7rem;
`
const DoneContainer = styled.div`
display:flex;
gap:1rem;
align-items:flex-end;
`
const DoneWord  = styled.p`
font-weight:600;
font-size:3rem;
color:#00C2FF;
`
const Title = styled.h2 `
color : black;
font-weight:600;
font-size:clamp(1.1rem,3vw,1.8rem);
`
const SubText = styled.p`
margin:0;
font-weight:600;
color:grey;
font-size:clamp(1.1rem,3vw,1.4rem);
`
const ButtonsContainer = styled.div`
display:flex;
gap:1rem;
justify-content:flex-start;
`
const EditReviewButton = styled.button`
width:25%;
height:35px;
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


const CheckCircle = ({size=60, color="#00C2FF"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

export default function CanNotReview(){

   
    return (
        <Container>
            <MainSection>
                <TextContainer>
                    <TitleContainer>
                        <DoneContainer>
                            <CheckCircle /> 
                            <DoneWord>Done</DoneWord>
                        </DoneContainer>
                        <Title>You have already reviewed this product !</Title>
                    </TitleContainer>

                    <SubText>If you'd like to make changes or add more details, feel free to edit your review below.</SubText>

                    <ButtonsContainer>
                        <EditReviewButton >Edit review</EditReviewButton>
                        <GoBackButton>Go back</GoBackButton>
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
