import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./views/Login";
import SignUp from "./views/SignUp"
import Subscriptions from "./views/Subscriptions"

export default function App() {

    return (

        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
            </Routes>
        </BrowserRouter>

    );
}