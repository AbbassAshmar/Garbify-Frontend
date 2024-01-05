import star from "../../assets/star.png"
import half_star from "../../assets/half_star.png"
import empty_star from "../../assets/empty_star.png"
import styled from "styled-components";


const Stars = styled.div`
margin:0;
`
const Star = styled.img`
width:15px;
`

// converts rating (int) to array ([star,star,half,empty,empty])
// result is rendered in jsx as images
export function ratingToStars(rating){
    let result = [];
    let i =0 ;
    for (; i < parseInt(rating);  i++ ){
        result.push("star")
    }
   
    if (((rating*10) % 10 ) != 0 ){
        result.push("half")
        i++;
    }
    for (; i <5 ; i++){
        result.push('empty')
    }
    return result;
}


export default function RatingStars({style,rating}){
    return (
        <Stars style={style}>
            {ratingToStars(rating).map((value)=>{
                if (value === "star") return <Star src={star} />
                if (value=== "half") return <Star src={half_star} />
                if (value=== "empty") return <Star src={empty_star} /> 
            })}
        </Stars>
    )
}