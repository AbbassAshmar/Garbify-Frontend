import styled from "styled-components";
import ReviewCard from "../../../components/ReviewCard/review-card";
import SimplifiedProductCard from "../../../components/SimplifiedProductCard/simplified-product-card";
import SimplifiedProductCardHorizontal from "../../../components/SimplifiedProductCard/Simplified-product-card-horizontal";

const Container = styled.div`
box-shadow:0px 0px 10px rgba(0,0,0,0.6);
padding:1rem;
@media screen and (max-width:800px){
    padding:0 min(2rem,5%);
}
`

const Header = styled.div`
width:100%;
display:flex;
justify-content:flex-end;
`
const Icon = styled.i`
cursor:pointer;
padding-bottom:10px;
@media screen and (max-width:800px){
    padding:15px 0;
}
`
const Content = styled.div`
display:flex;
@media screen and (max-width:800px){
    flex-direction:column;
    border: 2px solid black;
}
`
const ReviewCardContainer = styled.div`
padding:0 min(2rem,5%);
border-bottom:2px solid #F1F4F9;
@media screen and (max-width:800px){
    padding:1rem;
}
`
export default function UserReviewCard({review}){
    return(
        <Container>
            <Header><Icon className="fa-solid fa-ellipsis"/></Header>
            <Content>
                {window.innerWidth > 800 && <SimplifiedProductCard style={{width:"35%",minWidth:"220px"}} product={review.product}/>}
                {window.innerWidth <= 800 &&(
                    <div style={{borderBottom:'2px solid black',padding:'1rem'}} >
                        <SimplifiedProductCardHorizontal style={{minHeight:'0'}} product={review.product}/>
                    </div>
                )}
                <ReviewCardContainer>
                    <ReviewCard review={review} />
                </ReviewCardContainer>
            </Content>
        </Container>
    )
}