import styled from 'styled-components';
import ProductsSlider from '../../../components/ProductsSlider/products-slider';
import { pp } from '../../Products/Components/products-container';
const Container = styled.div`
display:flex;
flex-direction:column;
align-items : flex-start;
gap:2rem;
padding:2rem;
`
const Title = styled.h2 `
padding: 4rem 0 2rem 0;
color : red;
`
const ProductsToReview = styled.div`

`
export default function CanNotReview(){
   
    return (
        <Container>
            <Title> 
                You have already reviewed this product !
            </Title>
            <ProductsToReview>
                
            </ProductsToReview>
            <ProductsSlider title={"Products You May Like : "} products={pp}/>
        </Container>
    )
}
