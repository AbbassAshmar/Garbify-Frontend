import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ImagesContainer from "./Components/images-container";
import DetailsContainer from "./Components/details-container";
import jordan4_1 from "../../assets/jordan4redfront.jpg"
import jordan4_2 from "../../assets/jordan4redfront2.jpg"
import jordan4_3 from "../../assets/jordan4redside2.jpg"
import jordan4_4 from "../../assets/jordan4sidered.jpg"
import jordan4_5 from "../../assets/jordan4redback.jpg"

import jordan4_6 from "../../assets/jordan4greenfront.jpg"
import jordan4_7 from "../../assets/jordan4greenfront2.jpg"
import jordan4_8 from "../../assets/jordan4greenside2.jpg"
import jordan4_9 from "../../assets/jordan4greenback.jpg"

import jordan4_10 from "../../assets/jordan4blueside2.jpg"
import jordan4_11 from "../../assets/jordan4blueside.jpg"
import jordan4_12 from "../../assets/jordan4bluefront.jpg"
import jordan4_13 from "../../assets/jordan4blueback.jpg"
import ProductsSlider from "./Components/products-slider";


import { pp } from "../Products/Components/products-container";
import ReviewsSection from "./Components/reviews-section";

const Container = styled.div`
width:100%;
padding:2rem;
display:flex;
flex-direction:column;
gap:4rem;
`
const AboveTheFolds = styled.div`
display:flex;
align-items:flex-start;
`

export default function Product(){
    const [product,setProduct] = useState(pd);
    const [similarProducts, setSimilarProducts] = useState(pp);
    const [ImagesColor, setImagesColor] = useState('red')
    const [sizePicked, setSizePicked] = useState(null)
    const [quantiy, setQuantity] = useState(400)
    const {id , name} = useParams()

    async function retrieveProduct(id){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+id);
        const response = await request.json(); 
        if ( request.status == 200){
            // setImagesColor(response.product.colors[0])
            // setQuantity(response.product.quantity)
        }
    }

    async function retrieveSimilarProducts(id){
        const request = await fetch("http://127.0.0.1:8000/api/products/"+id+"/similar");
        const response = await request.json(); 
        if ( request.status == 200){
            // setSimilarProducts(response.products)
        }
    }

    useEffect(()=>{
        // retrieveProduct(id)
        // retrieveSimilarProducts(id)
    } , [id])
    
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
            <ReviewsSection />
        </Container>
    )
}
const rr  = {
    reviews:  [
        {
            user: "mike" ,
            helpful_count: 4,
            text: "appretiate your slaves work" ,
            title : 'Nice Work',
            height: 190,
            weight: 80,
            size : '10.5', 
            color: 'red',
            created_at:"2022-05-18T11:40:22.519222Z",
            rating: 4.5
        },
        {
            user: "denis" ,
            helpful_count: 90,
            text: "appretiate beating the kids" ,
            title : 'Nice clothes , bad smell tho , are they made by indians',
            height: 140,
            weight: 50,
            size : '2', 
            color: 'blue',
            created_at:"2022-06-18T11:40:22.519222Z",
            rating: 3
        }
    ] 
}
const pd = {
    pk :"1",
    name:'nike jordan 4',
    quantity:444,
    reviews_summary : {
        average_ratings : 4.5,
        reviews_count : 203,
    },
    price:304,
    type:"men's shoes",
    colors:['red', 'blue', 'green'],
    sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
    sizes_table: {
        units : ['Women/Men', 'inches','millimters'],
        sizes :[
            ['W 5 / M 6.5','4.3','143'],
            ['W 6 / M 8.5','3.3','324'],
        ]
    },
    added_at: "2022-03-18T11:40:22.519222Z",
    description:
                `gold glasses made with water lava and fabric shit by black slaves and kids beaten just before death.
                . right material used 
                . right slaves chosen
                . ensured the kids were starved
                . donald trump for presidency`,
    category : "casual",
    sale : {
        price_after_sale:200,
        percentage:32,
        starts_at:"2022-05-18T11:40:22.519222Z",
        ends_at:"2024-05-18T11:40:22.519222Z",
    },

    images:{
        red : [
            {
                image_details: "front image",
                color:"red",
                size:"xl",
                url: jordan4_1,
            },
            {
                image_details: "front 2  image",
                color:"red",
                size:"xl",
                url: jordan4_2,
            },
            {
                image_details: "side image",
                color:"red",
                size:"xl",
                url: jordan4_3,
            },
            {
                image_details: "side 2 image",
                color:"red",
                size:"xl",
                url: jordan4_4,
            },
            {
                image_details: "back image",
                color:"red",
                size:"xl",
                url: jordan4_5,
            }
        ],
        blue:[
            {
                image_details: "front image",
                color:"blue",
                size:"xl",
                url: jordan4_10,
            },
            {
                image_details: "front 2  image",
                color:"blue",
                size:"xl",
                url: jordan4_11,
            },
            {
                image_details: "side image",
                color:"blue",
                size:"xl",
                url: jordan4_12,
            },
            {
                image_details: "side 2 image",
                color:"blue",
                size:"xl",
                url: jordan4_13,
            },
        ],
        green:[
            {
                image_details: "front image",
                color:"green",
                size:"xl",
                url: jordan4_6,
            },
            {
                image_details: "front 2  image",
                color:"green",
                size:"xl",
                url: jordan4_7,
            },
            {
                image_details: "side image",
                color:"green",
                size:"xl",
                url: jordan4_8,
            },
            {
                image_details: "side 2 image",
                color:"green",
                size:"xl",
                url: jordan4_9,
            },
        ]

    }

}