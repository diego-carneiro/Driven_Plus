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
    
    const [theme, setTheme] = useState(true);

    const themeLight = {
        background: "#FF4791",
        text: "black",
        button: "black"
    }
    const themeDark = {
        background: "black",
        text: "#FFFFFF",
        button: "#FF4791",
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");

        currentTheme ?  setTheme(true) : setTheme(false);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, theme, setTheme, themeLight, themeDark }}>
            {children}
        </ AuthContext.Provider>
    )
}