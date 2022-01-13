import React from "react";
import { useState, useEffect } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        id: "",
        name: "",
        image: "",
        price: "",
        perks: [],
    });

    useEffect(() => {
        const userStorage = localStorage.getItem("user");

        if (userStorage) {
            setUser(JSON.parse(userStorage));
        } 
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </ AuthContext.Provider>
    )

}