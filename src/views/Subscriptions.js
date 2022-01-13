import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

import Loading from "../components/Loading";
import { AuthContext } from "../providers/auth";

export default function Subscriptions() {

    const [info, setInfo] = useState([]);
    const { token } = React.useContext(AuthContext);

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
                <Link to={`/subscriptions/${items.id}`} >
                    <PassBox key={items.id}>
                        <img src={items.image} />
                        <p>R$ {items.price}</p>
                    </PassBox>
                </Link>
            ))}
        </Container>
    );
}
// ::::::::::Styled-Components::::::::::

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: black;
    padding: 30px 0px 100px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 15px;
    }
`;
const PassBox = styled.div`
    width: 290px;
    height: 180px;
    border-radius: 12px;
    border: 3px solid #7E7E7E;
    padding: 38px 16px 38px 16px;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    p{
        font-size: 24px;
        color: #FFFFFF;
    }
    
`