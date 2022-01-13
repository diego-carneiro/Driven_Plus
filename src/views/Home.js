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

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(AuthContext);
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("userToken");
        return storedToken;
    });
    const [userId, setUserId] = useState(() => {
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
                <Logo src={user.membership.image} />
                <IconContext.Provider value={{ color: "white", size: "34px" }}>
                    <Link to={`users/${userId}`}>
                        <BsPersonCircle />
                    </Link>
                </IconContext.Provider>
            </Header>
            <Content>
                <h1>Olá, fulano</h1>
                <ButtonSection>
                    {user.membership.perks.map((items) => (
                        <Button>{items.title}</Button>
                    ))}

                </ButtonSection>
            </Content>
            <Membership>
                {/* <Link to="/subscriptions"> */}
                <Button>Mudar plano</Button>
                {/* </Link> */}
                <Button onClick={cancelSubscription}>Cancelar plano</Button>
            </Membership>
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
    size: 15px;
`
const Content = styled.div`
    width: 100%;
    height: 460px;

    display: flex;
    flex-direction: column;
    align-items: center;
`
const ButtonSection = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`
const Perks = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`
const Membership = styled.div`
    width: 100%;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
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

    &:last-child {
        background-color: #FF4747;
    }
`