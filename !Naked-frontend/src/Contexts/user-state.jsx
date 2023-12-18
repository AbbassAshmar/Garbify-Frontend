import { createContext, useState } from 'react'

export const userStateContext = createContext({
    user:null,
    token:null,
    setToken:()=>{},
    setUser:()=>{},
})

export default function UserState({children}){

    const [token , setToken] = useState(localStorage.getItem("token")||null);
    const [user, setUser] = useState({});

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

