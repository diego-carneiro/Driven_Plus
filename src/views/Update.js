import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { IconContext } from "react-icons";
import axios from "axios";

import { AuthContext } from "../providers/auth";

export default function Update() {

    const { theme, themeLight, themeDark } = React.useContext(AuthContext);
    const { token } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [user] = useState(() => {
        const userStorage = localStorage.getItem("user");
        return (JSON.parse(userStorage));
    });
    const [userId] = useState(() => {
        const storedId = localStorage.getItem("userId");
        return storedId;
    });
    const storage = (key, value) => {
        localStorage.setItem(key, value);
    }
    const initialValue = {
        name: "",
        cpf: user.cpf,
        email: "",
        currentPassword: "",
        newPassword: "",
    };

    const [input, setInput] = useState(initialValue);

    function onChange(ev) {
        const { name, value } = ev.target;

        setInput({ ...input, [name]: value })
    }
console.log(input);
    function update() {
        const promise = axios.put("https://mock-api.driven.com.br/api/v4/driven-plus/users/", input,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        promise.then((response) => {
            storage("user", JSON.stringify(response.data));
            navigate(`/users/${userId}`);
        });
        promise.catch((error) => {
            alert("Erro ao atualizar dados.")
        console.log(error);
        });
    }

    return (
        <ThemeProvider theme={theme ? themeDark : themeLight}>
            <Container>
                <Header>
                    <IconContext.Provider value={{ color: "white", size: "34px" }}>
                        <FaArrowLeft onClick={() => navigate(`/users/${userId}`)} />
                    </IconContext.Provider>
                </Header>
                <Input placeholder={user.name} name="name" onChange={onChange} />
                <Input placeholder={user.cpf} disabled={true} />
                <Input placeholder={user.email} name="email" onChange={onChange} />
                <Input placeholder="Senha atual" name="currentPassword" onChange={onChange} />
                <Input placeholder="Nova senha" name="newPassword" onChange={onChange} />
                <Button onClick={update}>SALVAR</Button>
            </Container>
        </ThemeProvider>
    );
}
const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${props => props.theme.background};
    padding: 32px 38px 5px 38px;

    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        font-size: 32px;
        color:${props => props.theme.text}
    }
`
const Input = styled.input`
    width: 300px;
    height: 52px;
    border-radius: 8px;
    margin-top: 16px;
    border: none;
    padding-left: 14px;
    font-size: 14px;
    color: #7E7E7E;
    background: #EBEBEB;
`
const Button = styled.button`
    width: 300px;
    height: 52px;
    margin-top: 24px;
    background-color: ${props => props.theme.button};
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;   
    &:last-child{
        margin-top: auto;
        margin-bottom: 15px;
    }
`
const Header = styled.div`
    width: 100%;
    height: fit-content;
`