import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ImagesContainer from "./Components/images-container";
import DetailsContainer from "./Components/details-container";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { PRODUCTS,PRODUCT,REVIEWS } from "../../components/products-data";
import ReviewsSection from "./Components/reviews-section";
import { requestData } from "../OtherUsersFavorites/other-users-favorites";

const Container = styled.div`
width:100%;
padding: min(2rem ,5%);
display:flex;
flex-direction:column;
gap:4rem;
max-width:1500px;
margin:auto;
`
const AboveTheFolds = styled.div`
display:flex;
align-items:flex-start;
@media screen and (max-width:600px){
    flex-direction:column;
    gap:2rem;
}
`

export default function Product(){
    const [product,setProduct] = useState(PRODUCT);
    const [similarProducts, setSimilarProducts] = useState(PRODUCTS);
    const [ImagesColor, setImagesColor] = useState('red')
    const [sizePicked, setSizePicked] = useState(null)
    const [quantiy, setQuantity] = useState(400)
    const {id , name} = useParams()

    // useEffect(()=>{
    //     const PRODUCT_URL = "http://127.0.0.1:8000/api/products/"+id
    //     const SIMILAR_PRODUCTS_URL = "http://127.0.0.1:8000/api/products/"+id+"/similar"

    //     const retrieveProduct = requestData(PRODUCT_URL)
    //     const retrieveSimilarProducts = requestData(SIMILAR_PRODUCTS_URL)

    //     if (retrieveProduct) {
    //         setProduct(retrieveProduct['product'])
    //         setImagesColor(Object.keys(retrieveProduct['product']['colors'])[0])
    //         setQuantity(retrieveProduct['product']['quantity'])
    //     }

    //     if (retrieveSimilarProducts){
    //         setSimilarProducts(retrieveSimilarProducts['products'])
    //     }
    // } , [id])
    
    return (
        <Container>
            <AboveTheFolds>
                <ImagesContainer ImagesColor={ImagesColor} imagesList={product.images} />
                <DetailsContainer 
                    quantity= {quantiy}
                    sizePicked={sizePicked} 
                    setSizePicked={setSizePicked}
                    ImagesColor={ImagesColor} 
                    setImagesColor={setImagesColor} 
                    product={product}/>
            </AboveTheFolds>
            <ProductsSlider title={"You may also like : "} products={similarProducts}/>
            <ReviewsSection product_id={id}/>
        </Container>
    )
}

