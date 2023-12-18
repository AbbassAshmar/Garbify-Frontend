import { useState,useEffect } from "react";



export async function sendRequest(uri,init={},token=null){
    let defaultInit = {
        method :"GET",
        headers:{
            'content-type' : "application/json",
            'accept' : 'application/json',
            'Authorization' : 'Bearer ' + token
        },
        ...init
    }
    
    try{
        let url = 'http://127.0.0.1:8000' + uri
        const request = await fetch(url,defaultInit);
        const response = await request.json();
        return {request ,response};
    }catch(error){
        throw new Error("connection to server failed")
    }
}

export function useFetchData(url,init={},dependency_array=[]){
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return {data,setData, error, loading ,reFetchData:fetchData }
}