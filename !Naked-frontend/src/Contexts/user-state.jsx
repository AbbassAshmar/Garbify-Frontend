
import { createContext } from 'react'

export const StateContext = createContext()

export default function UserState({children}){

    return (
        <>
        <StateContext.Provider value={{
            token : '7878',
            currentUser : null}}
        >
            {children}

        </StateContext.Provider>
        </>
    )
}