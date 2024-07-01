import star from "../../assets/star.png"
import half_star from "../../assets/half_star.png"
import empty_star from "../../assets/empty_star.png"
import styled from "styled-components";


const Stars = styled.div`
margin:0;
display:flex;
`
const Star = styled.img`
width:${({$width})=>$width};

@media screen and (max-width:600px){
    width: ${({$width_600})=>$width_600};
}
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


export default function RatingStars({style,rating,width='15px',width_600='15px'}){
    return (
        <Stars style={style}>
            {ratingToStars(rating).map((value,i)=>{
                if (value === "star") return <Star loading="lazy" alt="full star" key={i} $width={width} $width_600={width_600} src={star} />
                if (value=== "half") return <Star  loading="lazy" alt="half star" key={i} $width={width} $width_600={width_600} src={half_star} />
                if (value=== "empty") return <Star loading="lazy" alt="empty star"  key={i} $width={width} $width_600={width_600} src={empty_star} /> 
            })}
        </Stars>
    )
}