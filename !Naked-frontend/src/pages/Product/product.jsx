import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ImagesContainer from "./Components/images-container";
import DetailsContainer from "./Components/details-container";
import ProductsSlider from "../../components/ProductsSlider/products-slider";
import { PRODUCT } from "../../components/products-data";
import ReviewsSection from "./Components/reviews-section";
import { useFetchData } from "../../hooks/use-fetch-data";
import Loading from "../../components/Loading/loading";

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
    const [ImagesColor, setImagesColor] = useState('red')
    const [sizePicked, setSizePicked] = useState(null)
    const [quantiy, setQuantity] = useState(400)
    const {id , name} = useParams()

    const {data,loading,error} = useFetchData("/api/products/"+id,[id]);
    let product = PRODUCT;
    if (data){
        product = data.data.product
        setImagesColor(Object.keys(retrieveProduct['product']['colors'])[0])
        setQuantity(retrieveProduct['product']['quantity'])
    }

    if (loading){
        return (<Loading />)
    }
    
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
            <ProductsSlider title={"You may also like : "} url={"/api/products/"+id+"/similar"}/>
            <ReviewsSection product_id={id}/>
        </Container>
    )
}

