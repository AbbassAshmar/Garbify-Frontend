import { useState,useEffect } from "react";

export function useFetchData(url,init={},dependency_array=[]){

    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function sendRequest(url,init={}){
        let defaultInit = {
            method :"GET",
            headers:{
                'content-type' : "application/json",
                'accept' : 'application/json'
            },
            ...init
        }
        
        try{
            const request = await fetch(url,defaultInit);
            if (!request.ok){
                throw new Error(`request failed with status code ${request.status}`) ;
            }

            const response = await request.json();
            return response
        }catch(error){
            throw new Error("connection to server failed")
        }
    }

    async function fetchData(url,init={}){
        try{
            let data =  await sendRequest(url, init);
            setData(data)
        }catch(error){
            setData(null)
            setError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData(url , init)
    },dependency_array)

    return {data,setData, error, loading,sendRequest ,reFetchData:fetchData }
}