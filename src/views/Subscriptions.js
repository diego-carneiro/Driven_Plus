import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../components/Loading";

export default function Subscriptions() {

    const [info, setInfo] = useState([]);
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("userToken");
        return storedToken;
    });

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        promise.then(response => {
            setInfo(response.data);
            console.log(response);
        });
        promise.catch(error => alert(error))
    }, []);
    console.log(info);

    if (info.length === 0) {
        return (
            <>
                <Container>
                    <p>Escolha seu Plano</p>
                    <Loading />
                </Container>
              
            </>
        )
    }

    return (
        <Container>
            <p>Escolha seu Plano</p>
            {info.map((items) => (
                <PassBox>
                    <img src={items.image} />
                </PassBox>))}
        </Container>
    );

}// ::::::::::Styled-Components::::::::::

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    padding: 120px 0px 100px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
    }
`;
const PassBox = styled.div`
    width: 290px;
    height: 180px;
    border-radius: 12px;
    border: 3px solid #7E7E7E;
    
    p{
        color: green;
    }
    
`