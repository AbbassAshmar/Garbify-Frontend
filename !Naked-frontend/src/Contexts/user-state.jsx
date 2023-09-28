
import { createContext } from 'react'

export const userStateContext = createContext()

export default function UserState({children}){

    return (
        <>
        <userStateContext.Provider value={{
            token : '7878',
            currentUser : null}}
        >
            {children}

        </userStateContext.Provider>
        </>
    )
}