import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw Error('userAuthContext must be inside an AuthContextProvider')
    }

    return context;
}