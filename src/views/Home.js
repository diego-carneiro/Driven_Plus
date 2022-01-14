import React from 'react';
import styled from 'styled-components'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from 'react-icons/bs';
import { IconContext } from "react-icons";
import axios from "axios";

import { AuthContext } from "../providers/auth";

export default function Home() {

    const { token } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [user] = useState(() => {
        const userStorage = localStorage.getItem("user");
        return (JSON.parse(userStorage));
    });
    const [userPurchase] = useState(() => {
        const storedPurchase = localStorage.getItem("userPurchase");
        return (JSON.parse(storedPurchase));
    })

    const [userId] = useState(() => {
        const storedId = localStorage.getItem("userId");
        return storedId;
    });

    function cancelSubscription() {
        const promise = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        promise.then(() => {
            navigate("/subscriptions");
        });
        promise.catch(error => alert("Erro ao cancelar plano."));
    }

    return (
        <Container>
            <Header>
                <Logo src={userPurchase.membership.image} />
                <IconContext.Provider value={{ color: "white", size: "34px" }}>
                    <Link to={`/users/${userId}`}>
                        <BsPersonCircle />
                    </Link>
                </IconContext.Provider>
            </Header>
            <Content>
                <h1>Olá, {user.name}</h1>
                {userPurchase.membership.perks.map((items, index) => (
                    <Button key={items.id}><a href={items.link}>{items.title}</a></Button>
                ))}
                <Button onClick={() => navigate("/subscriptions")}>Mudar plano</Button>
                <Button onClick={cancelSubscription}>Cancelar plano</Button>
            </Content>
        </Container>
    );
}
// ::::::::::Styled-Components::::::::::
const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: black;
    padding: 32px 38px 5px 38px;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 24px;
        font-weight: 700;
        color: #FFFFFF;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`
const Header = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Logo = styled.img`
    height: 50px;
`
const Content = styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
`
const Button = styled.button`
    width: 100%;
    height: 52px;
    margin-top: 24px;
    background-color: #FF4791;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;

    &:nth-last-child(2){
        margin-top: auto;
    }
    &:last-child {
        background-color: #FF4747;
        margin: 15px;
    }
`