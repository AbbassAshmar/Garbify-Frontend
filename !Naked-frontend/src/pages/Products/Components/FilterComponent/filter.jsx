import SmallScreenFitler from "./SmallScreenFilter/small-screen-filter"
import LargeScreenFilter from "./LargeScreenFilter/large-screen-filter"
import CategoryFilter from "./LargeScreenFilter/Components/category-filter"
import PriceFilter from "./LargeScreenFilter/Components/price-filter"
import ListFilter from "./LargeScreenFilter/Components/list-filter"
import ColorFilter from "./LargeScreenFilter/Components/color-filter"
import { handleTagRemove } from "../products-container"
import { useFetchData } from "../../../../hooks/use-fetch-data"
import { constructUrl } from "../../../Orders/orders"
import { useLocation, useParams } from "react-router-dom"

export function handleOptionClick(filter,option,searchParams,setSearchParams){
    searchParams.set('page',1)
    let filterName = filter.name.toLowerCase()

    if (filterName == "price"){
        option = filter.options[option]
    }
 
    if (searchParams.get(filterName) && searchParams.get(filterName) == option){
        handleTagRemove(searchParams,setSearchParams,filterName)
        return null;
    }
   
    searchParams.set(filterName,option)
    setSearchParams(searchParams)
}

export function switchFunction(filter,show){
    if (filter.name== "price"){
        return <PriceFilter filter={filter} handleOptionClick={handleOptionClick} /> 
    }
    else if (filter.name=="Categories"){
        return <CategoryFilter filter={filter.options} />
    }
    else if (filter.name == "color"){
        return <ColorFilter show={show} filter={filter} handleOptionClick={handleOptionClick} />
    }
    else if (filter.type == 'list'){
        return <ListFilter filter={filter} handleOptionClick={handleOptionClick} />
    }
}

export function handleTitleClick(filter,showOptions,setShowOptions){
    if (showOptions[filter.name]){
        setShowOptions({...showOptions,[filter.name]:false})
    }else{
        setShowOptions({...showOptions,[filter.name]:true})
    }
}

export default function FilterContainer({show ,setShow}){
    const urlParams= useParams();
    const location = useLocation();

    let url = constructUrl(`http://127.0.0.1:8000/api/filter`,null,urlParams)
    const {data, error , loading } = useFetchData(url,{}, [location.pathname]) //fetch data on url parameters change

    return (
        <>
            <SmallScreenFitler show={show} setShow={setShow} filtersData={data} />  {/*displayed under 800px*/}
            <LargeScreenFilter show={show} filtersData={data}/>  {/*displayed over 800px*/}
        </>
    )
}