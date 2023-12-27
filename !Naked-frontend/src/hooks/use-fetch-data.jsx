import { useState,useEffect, useContext } from "react";


async function refreshAccessToken(userContext){
    let access_token_url = 'http://127.0.0.1:8000/api/access_tokens';
    let accessTokensInit = {
        method :"POST",
        headers:{
            'content-type' : "application/json",
            'accept' : 'application/json',
            'credentials': "include",        
        }
    };

    const request_access_token = await fetch(access_token_url,accessTokensInit);
    if (request_access_token.status == 201){
        const response_access_token = await request_access_token.json();
        const token =  response_access_token.body.token;
        userContext.setToken(token)
        return token;
    }

    userContext.setToken(null);
    return null;
}


// hook that sends a request and displays a PopUp component on server down error
export const useSendRequest = (userContext) => {
    const [isServerError, setIsServerError] = useState(false);

    const sendRequest = async (uri, init={}) => {
        let url = 'http://127.0.0.1:8000' + uri;
        let defaultInit = {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'accept': 'application/json',
                'Authorization': 'Bearer ' + userContext?.token
            },
            ...init
        };
        try {
            let request = await fetch(url, defaultInit);
            let response = await request.json();

            // request a new access token 
            if (request.status === 401 && (new_token = await refreshAccessToken(userContext))) {
                defaultInit.headers['Authorization'] = 'Bearer ' + new_token;
                request = await fetch(url, defaultInit);
                response = await request.json();
            }
            return {request, response};
        } catch (error) {
            setIsServerError(true); // set error state to true if there's an error
        }
        return null;
    };

    return { sendRequest, isServerError };
};

// used for get requests that need states 
export function useFetchData(url,dependency_array=[],userContext=null,init={}){
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData(url,init={},userContext=null){
        try{
            let data =  await sendRequest(url, init, userContext);
            setData(data)
        }catch(error){
            setData(null)
            setError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData(url , init,userContext)
    },dependency_array)

    return {data,setData, error, loading ,reFetchData:fetchData }
}