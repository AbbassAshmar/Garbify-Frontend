import { useState,useEffect } from "react";

export function useFetchData(url,init={},dependency_array=[]){

    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function requestData(url,init={}){
        let defaultInit = {
            method :"GET",
            headers:{
                'content-type' : "application/json",
                'accept' : 'application/json'
            },
            ...init
        }
        
        const request = await fetch(url,defaultInit);
        const response = await request.json();
        if (!request.ok)
            return response

        throw new Error(`request failed with status code ${request.status}`) ;
    }

    function handleState(requestData,url,init={},setData, setError, setLoading){
        try{
            let data = requestData(url, init);
            setData(data)
        }catch(error){
            setData(null)
            setError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        handleState(requestData, url , init , setData, setError, setLoading)
    },dependency_array)

    return {data, error, loading}
}