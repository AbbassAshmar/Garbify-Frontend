import styled from "styled-components"
import SmallScreenFitler from "./SmallScreenFilter/small-screen-filter"
import LargeScreenFilter from "./LargeScreenFilter/large-screen-filter"


export default function FilterContainer({show ,setShow}){
    return (
        <>
            <SmallScreenFitler show={show} setShow={setShow} />  {/*displayed under 800px*/}
            <LargeScreenFilter show={show}/>  {/*displayed over 800px*/}
        </>
    )
}