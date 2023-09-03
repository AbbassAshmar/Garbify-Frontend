import { styled } from "styled-components"

const Container = styled.div`
background:grey;
flex:6;
display:grid;
grid-template-columns: repeat(2,50%);
overflow:hidden;
gap:10px;

`
const ImageContainer = styled.div`

`
const Image= styled.img`
width:100%;
height:100%;
// object-fit:cover;
`
export default function ImagesContainer({imagesList,ImagesColor}){
    return (
        <Container>
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