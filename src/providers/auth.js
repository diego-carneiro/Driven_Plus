import React from "react";
import { useState, useEffect } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenStorage = localStorage.getItem("userToken");

        if (tokenStorage) {
            setToken(tokenStorage);
        } 
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </ AuthContext.Provider>
    )
}