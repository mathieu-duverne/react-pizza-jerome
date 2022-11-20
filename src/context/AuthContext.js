import { createContext, useContext } from "react";

export const AuthContext = createContext({
    user: undefined,
    role: undefined,
    isLoading: false,
    setLog: () => {},
});

export const useAuthContext = () => useContext(AuthContext);