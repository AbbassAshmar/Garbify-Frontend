import styled from "styled-components"


export const InputWrapper = styled.div`
width:100%;
position:relative;
`
export const Input = styled.input`
height:2.7rem;
width:100%;
border-radius:5px;
border:2px solid ${({$color})=>$color};
outline:none;
padding:.7rem 1rem;
font-size: clamp(.8rem , 2.3vw ,1.1rem);
&:focus{
    border:2px solid #00C2FF;
}
`
export const Label =styled.label`
position:absolute;
top:${({$position})=>$position?'-17%':"30%"};
left:${({$position})=>$position?'2%':"3%"};
font-size:${({$position})=>$position?'.6rem':".8rem"};
opacity:1;
z-index:3;
color:${({$color})=>$color};
background:white;
transition:all .3s;
${Input}:focus + &{
    top:-17%;
    left:2%;
    font-size:clamp(.5rem,1.8vw,.8rem);
    color:#00C2FF;
}
font-weight:600;
`

const ErrorMsg = styled.p`
margin:0;
color:red;
margin-top:4px;
margin-left: 3%;
font-weight:600;
font-size: clamp(.65rem,1.8vw,.8rem);
`

export default function InputField({field,input_type,error,setFormData,formData}){
    return (
        <div>
            <InputWrapper>
                <Input 
                    type={input_type}
                    value={formData[field]} 
                    color={error.fields && error.fields.includes(field)?"red":"#A8AAAE"} 
                    onChange={(e)=>setFormData({...formData,[field]:e.target.value})}
                />
                <Label 
                position={formData[field]}
                color={error.fields && error.fields.includes(field)?"red":"#C0C3C7"}>
                    {`${field.replace("_"," ")}`}
                </Label>
            </InputWrapper> 
            <ErrorMsg>{error.message.field}</ErrorMsg>
        </div>
    )
}