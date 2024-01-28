import ProductCard from "../../../components/ProductCard/product-card";
import { cardsTitleVariant,cardVariant } from "../review-success";
import { useTransform,useScroll,motion } from "framer-motion";
import { useRef } from "react";
import useUserState from "../../../hooks/use-user-state";
import { useFetchData } from "../../../hooks/use-fetch-data";
import { PRODUCTS } from "../../../components/products-data";
import styled from "styled-components";

const Container = styled.div`
width:100%;
z-index:0;

@media screen and (max-width:800px){
   padding-bottom:2rem;
}
`

const Content = styled.div`
gap:4rem;
width:100%;
padding: 0 2rem;
display:flex;
flex-direction:column;
justify-content:center;
`

export const CardsTitle = styled.h4`
font-size: var(--heading-4);
font-weight:600;
`

export const ProductCardsContainer=  styled.div`
display:flex;
gap:2rem;
width:70%;
align-self:center;
padding-bottom:2rem;
@media screen and (max-width:1250px){
    width:100%;
}

@media screen and (max-width:800px){
    flex-direction:column;
}
`
export const CardContainer = styled.div`
flex:1;
transition:transform .1s;
`

export const CardContainer2 = styled(CardContainer)`
margin:20% 0 0 0;
@media screen and (max-width:800px){
    margin:0;
}
`


export default function ThirdSection(){
    const smallScreen = window.innerWidth < 800;

    const userContext = useUserState();
    let unReviewedProductsUri = '/api/users/user/products/unreviewed';
    const {data:unReviewedProductsData,loading,error} = useFetchData(unReviewedProductsUri,[],userContext);
    let unReviewedProducts =unReviewedProductsData?.data.products || PRODUCTS;

    const thirdSectionRef = useRef();

    const {scrollYProgress:thirdSectionScrollYProgress} = useScroll({
        target:thirdSectionRef,
        offset:[smallScreen?'0.7 0' : '0.4 0','end start']
    })

    let moveUnderFourthSection = useTransform(thirdSectionScrollYProgress,[0,1],['0%', smallScreen?"15%":'25%']);

    return (
        <Container as={motion.div} ref={thirdSectionRef} style={{y:moveUnderFourthSection}}>
            <Content>
                <CardsTitle variants={cardsTitleVariant} initial="initial" whileInView='animate' viewport={{margin:"0px 0px -40% 0px",once:"true",}} as={motion.div}>
                    Products you may like
                </CardsTitle>
                <ProductCardsContainer>
                    <CardContainer as={motion.div} variants={cardVariant} initial="initial" whileInView='animate' custom={.2} viewport={{once:true,margin:'0px 0px -40% 0px'}} >
                        <ProductCard product={unReviewedProducts[0]} />
                    </CardContainer>
                    <CardContainer2 as={motion.div} variants={cardVariant} initial="initial" whileInView='animate' custom={.3} viewport={{once:true,margin:'0px 0px -40% 0px'}}>
                        <ProductCard product={unReviewedProducts[1]} />
                    </CardContainer2>
                </ProductCardsContainer>
            </Content>
        </Container>
    )
}