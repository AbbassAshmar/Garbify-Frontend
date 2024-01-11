import { useRef } from "react"
import { styled } from "styled-components"
import { ArrowIcon, SlideButton } from "../../../components/ProductsSlider/products-slider"

const Container = styled.div`
flex:1.2;
display:grid;
grid-template-columns: repeat(2,50%);
overflow:hidden;
gap:10px;
@media screen and (max-width:600px){
    display:flex;
    overflow-X:auto;
    width: 100%;
}
scroll-behavior: smooth;

`
const ImageContainer = styled.div`
width:100%;

@media screen and (max-width:600px){
    min-width:100%;
    border-radius:10px;
    position:relative;
    overflow:hidden;
}
`
const Image= styled.img`
width:100%;
object-fit:cover;
height:100%;
@media screen and (max-width:600px){
    height:90vh;
}
`
const SlideButtonCustom = styled(SlideButton)`
z-index:4;
opacity:.7;
@media screen and (min-width:600px){
    display:none;
}
&:hover{
    background:white;
}
`
export default function ImagesContainer({imagesList,ImagesColor}){
    const sliderRef = useRef(null)
    
    function handleLeftButtonClick(leftOffset){
        sliderRef.current.scrollLeft += leftOffset
    }

    return (
        <Container ref={sliderRef}>
            <SlideButtonCustom onClick={()=>handleLeftButtonClick(-300)} style={{left:"6%"}}>
                <ArrowIcon className="fa-solid fa-arrow-left"/>
            </SlideButtonCustom>
            <SlideButtonCustom onClick={()=>handleLeftButtonClick(300)}  style={{right:"6%"}}>
                <ArrowIcon className="fa-solid fa-arrow-right"/>
            </SlideButtonCustom>
            {
                ImagesColor&&imagesList[ImagesColor].map((image)=>{
                    return(
                        <ImageContainer>
                            <Image src={image.url} alt={image.image_details}/>
                        </ImageContainer>
                    )
                })
            }

        </Container>
    )
}