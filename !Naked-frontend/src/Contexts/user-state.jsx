import { createContext, useEffect, useState } from 'react'

export const userStateContext = createContext({
    user:null,
    token:null,
    setToken:()=>{},
    setUser:()=>{},
})

export default function UserState({children}){
    const [token , setToken] = useState(localStorage.getItem("token")||null);
    const [user, setUser] = useState({});

    useEffect(()=>{console.log("fetch")},[])
    useEffect(()=>{
        if (token && !user){
            try{
                fetchUserInfo();
            }catch(e){
                setUser({})
            }
        }
    },[token])

    async function fetchUserInfo(){
        const domain = process.env.REACT_APP_DOMAIN
        const uri = domain+'/api/users/user'
        let init = {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };

        let request = await fetch(uri,init);
        if (request?.status == 200){
            let response = await request.json();
            _setUser(response.data.user);
        }
    }

    const _setToken = (token)=>{
        setToken(token)
        if (token){
            localStorage.setItem('token',token)
        }else{
            localStorage.removeItem('token')
        }
    }

    const _setUser = (user) => {
        setUser(user)
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

