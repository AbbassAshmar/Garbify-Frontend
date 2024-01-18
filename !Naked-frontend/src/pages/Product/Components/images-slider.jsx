import { useState } from "react";
import styled from "styled-components";
import thinLongArrow from "../../../../src/assets/thingLongArrow.png";

const sliderWidth = 520;
const imageWidth=350;
const initialTransition = ((sliderWidth - imageWidth)/2) - imageWidth;

const Container = styled.div`
flex:1.3;
display:flex;
align-items:center;
justify-content:center;
// padding:2rem 0;
position:sticky;
top:60px;
`

const Slider = styled.div`
display:flex;
position:relative;
align-items:center;
justify-content:start;
height:85vh;
width:${sliderWidth}px;
overflow:hidden;
`

const Arrow = styled.img`
position:absolute;
width:40px;
z-index:71;
cursor:pointer;
`

const SlidingWindow = styled.div`
height:100%;
display:flex;
align-items:center;
justify-content:start;
flex-wrap:nowrap;
position:relative;
transition:all .3s;
`

const ImageContainer = styled.div`
width:${imageWidth}px;
height:80%;
flex-shrink:0;
transition:all .3s;
@media screen and (max-width:600px){
    min-width:100%;
    border-radius:10px;
    position:relative;
    overflow:hidden;
}
`

const Image= styled.img`
object-fit:cover;
height:100%;
width:100%;
@media screen and (max-width:600px){
    height:90vh;
}
`

export default function ImagesSlider({imagesList,ImagesColor}){
    const [currentImage , setCurrentImage] = useState(1)

    let imagesCount = imagesList[ImagesColor].length;

    function slideWindowLeft(){
        setCurrentImage(Math.max(currentImage-1,0))
    }

    function slideWindowRight(){
        setCurrentImage(Math.min(currentImage+1,imagesCount-1))
    }

    const findSlidingWindowTranslation = ()=>{
        if (currentImage == 0){
            return 0;
        }
        if (currentImage == 1){
            return initialTransition;
        }

        return initialTransition - ( (currentImage-1) * imageWidth);
    }

    const slidingWindowStyle ={
        transform: `translateX(${findSlidingWindowTranslation()}px)`,
    };

    const findInitialStyle = (index)=>{
        if (index == currentImage){
            return { 
                position:"absolute",
                zIndex:'70',
                opacity:'1',
                left:`${index * imageWidth }px`,
                boxShadow:"0px 0px 15px rgba(0,0,0,0.5)",
                scale:'1.2',
            }
        }

        if (index > currentImage){ 
            return {
                // border: '2px solid black',
                transform:"translateX(50%)",
                filter:'blur(2px)',
                // opacity:'0',
            }
        }

        if (index < currentImage){
            return {
                // border: s'2px solid black',
                transform:"translateX(50%)",
                // filter:'brightness(40%)',
                // opacity:'0',
                filter:'blur(2px)',
            }
        }
    };

    return (
        <Container>
            <Slider>
                <Arrow onClick={slideWindowLeft} style={{left:'2%',transform:'rotate(-180deg)'}} src={thinLongArrow}/>
                <SlidingWindow style={slidingWindowStyle}>
                    {ImagesColor && imagesList && (
                        imagesList[ImagesColor].map((image,index)=>{
                            return(
                                <ImageContainer $index={index} $isCurrent={currentImage===index} style={findInitialStyle(index)}>
                                    <Image  src={image.url} alt={image.image_details}/>
                                </ImageContainer>
                            )
                        })
                    )}
                </SlidingWindow>
                <Arrow onClick={slideWindowRight} style={{right:'2%'}} src={thinLongArrow}/>
            </Slider>
        </Container>
    )
}