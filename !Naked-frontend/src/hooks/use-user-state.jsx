import { useContext } from "react";
import { userStateContext } from "../Contexts/user-state";

export default function useUserState(){
    const state = useContext(userStateContext)

    if (!state){
        throw new Error("userStateContext can not be used withing this component.")
    }

    return state;
}