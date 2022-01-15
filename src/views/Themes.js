import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { AuthContext } from "../providers/auth";

export default function Themes() {

    const navigate = useNavigate();

    const [userId] = useState(() => {
        const storedId = localStorage.getItem("userId");
        return storedId;
    });

    const { theme, setTheme, themeLight, themeDark } = React.useContext(AuthContext);

    const storage = (key, value) => {
        localStorage.setItem(key, value);
    }

    return (
        <ThemeProvider theme={theme ? themeDark : themeLight} >
            <Container>
                <Header>
                    <IconContext.Provider value={{ color: "white", size: "34px" }}>
                        <FaArrowLeft onClick={() => navigate(`/users/${userId}`)} />
                    </IconContext.Provider>
                </Header>
                <p>Escolha seu Tema</p>
                <Content>
                    <Button onClick={() => {
                        setTheme(true)
                        storage("theme", theme);
                    }}>Dark</Button>
                    <Button onClick={() => {
                        setTheme(false);
                        storage("theme", theme);
                    }}>Light</Button>
                </Content>
            </Container>
        </ThemeProvider>
    );

}
// ::::::::::Styled-Components::::::::::
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
        color:${props => props.theme.text};
    }
`
const Content = styled.div`
    width: 100%;
    height: fit-content;
    margin-top: 150px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

`
const Header = styled.div`
    width: 100%;
    height: fit-content;
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
`