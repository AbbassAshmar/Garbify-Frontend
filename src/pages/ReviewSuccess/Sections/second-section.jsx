import styled from "styled-components";
import { motion} from "framer-motion";
import { cardsTitleVariant } from "../review-success"
import useUserState from "../../../hooks/use-user-state";
import { useFetchData } from "../../../hooks/use-fetch-data";
import { PRODUCTS } from "../../../components/products-data";
import AnimatedCard from "../Components/animated-card";
import { CardsTitle,ProductCardsContainer,CardContainer,CardContainer2 } from "./third-section";
import { useEffect, useState } from "react";

const Container = styled.div`
z-index:2;
width:100%;
padding: 0 0 10vh 0;
position:relative;

&:before{
    content:"";
    width:200%;
    height:110%;
    margin:auto;
    border-radius:50%;
    transform:rotate(${({$rotate})=>$rotate})  translateX(-20%) translateY(-5%);
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position:absolute;
    z-index:0;
    background: linear-gradient(to bottom, #00C2FF 10%,#86E2FF);
    @media screen and (max-width:800px){
        transform:none;
        border-radius:0;
        left:-50%;
        top:0;
    }
}
`
const Content = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:4rem;
padding:20% 0 0 2rem;
z-index:3;
position:relative;
justify-content:center;
@media screen and (max-width:800px){
    padding: 20% 1rem;
}
`

export default function SecondSection({containerRef,rotationState}){
    const [triedFetchingSuggested, setTriedFetchingSuggested] = useState(false);

    const userContext = useUserState();
    let unreviewedProductsUri = '/api/users/user/products/unreviewed';
    const {data:productsData,loading,error,refetchData} = useFetchData(unreviewedProductsUri,[],userContext);
    let products =productsData?.data[Object.keys(productsData?.data)[0]] ||PRODUCTS ;


    useEffect(() => {
        // Check if there are no unreviewed products and haven't tried fetching suggested yet
        if (!loading && !error && products?.length === 0 && !triedFetchingSuggested) {
            const suggestedProductsUri = '/api/users/user/products/suggested';
            refetchData(suggestedProductsUri);
            setTriedFetchingSuggested(true);
        }
    }, [loading, error, products, triedFetchingSuggested, refetchData]);

    return(
        <>
        {products && products.length > 0 &&
            <Container $rotate={rotationState} as={motion.div} ref={containerRef}>
                <Content>
                    <CardsTitle variants={cardsTitleVariant} initial="initial" whileInView='animate' viewport={{margin:"0px 0px -40% 0px",once:"true",}} as={motion.div}>
                        Products you haven't reviewed yet
                    </CardsTitle>
                        <ProductCardsContainer>
                            <AnimatedCard Container={CardContainer} product={products[0]} />
                            <AnimatedCard Container={CardContainer2} product={products[1]} />
                        </ProductCardsContainer>
                </Content>
            </Container>
        }
        </>

    )
}