import { createContext, useEffect, useState } from 'react'
import defaultUserProfilePicture from "../assets/defaultUserProfilePicture.jpg";

export const userStateContext = createContext({
    user:null,
    token:null,
    setToken:()=>{},
    setUser:()=>{},
})

const DEFAULT_USER = {
    id:null,
    name:null,
    email:null,
    profile_picture:defaultUserProfilePicture,
}

export default function UserState({children}){
    const [token , setToken] = useState(localStorage.getItem("token")||null);
    const [user, setUser] = useState(DEFAULT_USER);

    useEffect(() => {
        if (token && user === DEFAULT_USER) 
        fetchUserInfo();
    }, [token]);

    async function refreshAccessToken(){
        let access_token_url = import.meta.env.VITE_API_URL + "/api/access_tokens";
        let accessTokensInit = {
            method :"POST",
            headers:{
                'content-type' : "application/json",
                'accept' : 'application/json',
                'credentials': "include",        
            }
        };
    
        const request_access_token = await fetch(access_token_url,accessTokensInit);
        if (request_access_token.status === 201){
            const response_access_token = await request_access_token.json();
            const token =  response_access_token.body.token;
            return token;
        }

        return null;
    }

    
    async function fetchUserInfo() {
        try {
            const uri = import.meta.env.VITE_API_URL + '/api/users/user';
            let init = {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            };

            let request = await fetch(uri, init);
            
            // could be that the access token is expired
            if (request.status === 401 && (new_token = await refreshAccessToken())) {
                init.headers['Authorization'] = 'Bearer ' + new_token;
                request = await fetch(uri, init); // try again with the new token
                _setToken(new_token)
            }

            if (request.status === 200) {
                let response = await request.json();
                _setUser(response.data.user);
            } 
            
            else {
                // Handle scenarios where the server is down, or the token is invalid
                handleTokenError();
            }
        } catch (error) {
            // Handle network errors
            handleTokenError();
        }
    }
    
    const handleTokenError = () => {
        // Clear the token and set the user to the default state
        _setToken(null);
        _setUser(null);
    };

    const _setToken = (token)=>{
        setToken(token)
        if (token){
            localStorage.setItem('token',token)
        }else{
            localStorage.removeItem('token')
        }
    }

    const _setUser = (user) => {
        if (!user){
            setUser(DEFAULT_USER);
        }else{  
            setUser(user)
        }
    }

    return (
        <>
        <userStateContext.Provider value={{
            token,
            user,
            setToken:_setToken,
            setUser:_setUser,
        }}>
            {children}

        </userStateContext.Provider>
        </>
    )
}

