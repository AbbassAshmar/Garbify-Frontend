import { useContext } from "react";
import { userContext } from "../Contexts/user-state-context";

export default function useUserState(){
    const state = useContext(userContext)

    if (!state){
        throw new Error("user context can not be used within this component.")
    }

    return state;
}