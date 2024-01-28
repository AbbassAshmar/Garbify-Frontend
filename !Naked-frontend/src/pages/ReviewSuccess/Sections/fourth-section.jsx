import styled from "styled-components";
import cargoLeft from "../../../assets/cargoLeft.png";
import cargoRight from "../../../assets/cargoRight.png";


export default function FourthSection(){
    return (
        <Container>
            <Content>
                <CargoWordContainer>CARGOS</CargoWordContainer>
                <ImagesTextContainer>
                    <CargoImagesContainer>
                        <CargoImage src={cargoLeft}/>
                        <CargoImage style={{transform:"translateY(13.4%)"}}  src={cargoRight}/>
                    </CargoImagesContainer>
                    <TextButtonContainer>
                        <CargoTextContainer>
                            <CollectionWord>COLLECTION</CollectionWord>
                            <div style={{borderLeft:"8px solid black"}}>
                                <CargoText>
                                    Explore our premium collection of hoodies, crafted 
                                    with high-quality materials for maximum comfort and style
                                </CargoText>
                            </div>
                        </CargoTextContainer>
                        <ShopNowButton>
                            Shop Now <i style={{color:"white"}} className="fa-solid fa-angle-right"/>
                        </ShopNowButton>
                    </TextButtonContainer>
                </ImagesTextContainer>
            </Content>
        </Container>
    )
}

const Container = styled.div`
width:100%;
background:#cdbeaa;
position:relative;
`

const Content = styled.div`
width:100%;
display:flex;
padding:2rem;
@media screen and (max-width:900px){
    padding:1rem;
    flex-direction:column;
    gap:2rem;
}
`
const CargoWordContainer = styled.div`
font-weight:600;
font-size:var(--heading-1);
z-index:1;
align-self:center;
margin-bottom:25%;

@media screen and (max-width:1200px){
    font-size:var(--heading-2);
    margin-bottom:30%;

}
@media screen and (max-width:900px){
    align-self:flex-start;
    margin:0;
}
`

const ImagesTextContainer = styled.div`
gap:2rem;
z-index:0;
display:flex;
flex-shrink:0;
transform:translateX(-7rem);
width:88%;
@media screen and (max-width:1200px){
    width:90%;
}
@media screen and (max-width:900px){
    flex-direction:column;
    transform:none;
    width:100%;
}
`

const CargoImagesContainer = styled.div`
gap:2.78%;
width:53%;
display:flex;
flex-shrink:0;
overflow:hidden;
padding: 0 0 7% 0;
@media screen and (max-width:900px){
    transform:none;
    width:100%;
}
`

const CargoImage = styled.img`
flex-shrink:0;
width:50%;
`
const TextButtonContainer = styled.div`
display:flex;
gap:4rem;
align-self:center;
flex-direction:column;
flex:1;

@media screen and (max-width:900px){
    align-self:flex-start;
    gap:2rem;
}
`
const CargoTextContainer = styled.div`
display:flex;
gap:2rem;
flex-direction:column;

@media screen and (max-width:900px){
    gap:1rem;
}
`
const CollectionWord = styled.h1`
font-weight:600;
font-size:var(--heading-1);
@media screen and (max-width:1200px){
    font-size:var(--heading-2);
}
`
const CargoText = styled.p`
font-weight:600;
margin: 0 0 0 5px;
max-width:min(80%, 500px);
@media screen and (max-width:1200px){
    width:min(100% , 380px);
}
`
const ShopNowButton = styled.button`
background:black;
border:none;
outline:none;
color:white;
width:290px;
height:40px;
font-weight:600;
border-radius:3px;
box-shadow: -2px 4px 7px rgba(0,0,0,0.5);
cursor:pointer;
transition:background .2s;
&:hover{
    background:#ac9472;
}
`