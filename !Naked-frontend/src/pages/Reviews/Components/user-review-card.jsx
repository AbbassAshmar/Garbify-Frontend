import styled from "styled-components";
import ProductCard from "../../../components/ProductCard/product-card";

const Container = styled.div`

`

const Header = styled.div`

`

const Content = styled.div`

`
export default function UserReviewCard({review}){
    return(
        <Container>
            <Header>

            </Header>
            <Content>
                <ProductCard product={review.product}/>
            </Content>
        </Container>
    )
}