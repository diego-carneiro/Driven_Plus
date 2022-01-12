import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../components/Loading";

export default function Buy() {

    const [info, setInfo] = useState([]);
    const [warning, setWarning] = useState(false);
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("userToken");
        return storedToken;
    });

    const { idPlano } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`,
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
                    <Loading />
                </Container>

            </>
        )
    }

    return (
        <>
            <Container position={warning}>
                <Header>
                    <Arrow src="assets/img/arrow.png" />
                </Header>
                <img src={info.image} />
                <h1>{info.name}</h1>
                <InformationBox>
                    <h2>Benefícios:</h2>
                    {info.perks.map((items) => (
                        <h3>{items.title}</h3>
                    ))}
                </InformationBox>
                <InformationBox>
                    <h2>Preço:</h2>
                    <h3>R$ {info.price} cobrados mensalmente</h3>
                </InformationBox>
                <CardInfo>
                    <Input placeholder="Nome impresso no cartão" type="text" name="cardName" />
                    <Input placeholder="Digitos do cartão" type="text" name="cardName" />
                    <CardSecurity>
                        <Input placeholder="Código de segurança" type="text" name="cardName" />
                        <Input placeholder="Validade" type="text" name="cardName" />
                    </CardSecurity>
                    <Button onClick={() => { setWarning(true) }}>ASSINAR</Button>
                </CardInfo>
            </Container>
            <WarningContainer position={warning} >
                <WarningBox>
                    <NoButton onClick={() => { setWarning(false) }}>Não</NoButton>
                </WarningBox>
            </WarningContainer>
        </>
    );
}
// ::::::::::Styled-Components::::::::::
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    padding: 24px 22px 24px 22px;
    filter: brightness(${props => props.position ?  "0.3" : "1"});

    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 2;
    p{
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    h1{
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
    }
`;
const WarningContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding: 24px 22px 24px 22px;

    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    position: fixed;

    z-index: ${props => props.position ? "3" : "1"};
    p{
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    h1{
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
    }
`;
const Header = styled.div`
    width: 100%;
`
const Arrow = styled.img`

`
const InformationBox = styled.div`
    width: 100%;
    padding: 10px;
    h2{
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    h3{
        font-size: 14px;
        color: #FFFFFF;

    }
`
const CardInfo = styled.div`
    width: 100%;
    padding: 10px;

    display: flex;
    flex-direction: column;
`
const CardSecurity = styled.div`
    width: 100%;

    display: flex;
`
const Input = styled.input`
    width: 100%;
    height: 52px;
    border-radius: 8px;
    margin-top: 8px;
    border: none;
    padding-left: 14px;
    font-size: 14px;
    color: #7E7E7E;
`
const Button = styled.button`
    width: 100%;
    height: 52px;
    margin-top: 12px;
    background-color: #FF4791;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
`
const WarningBox = styled.button`
    width: 248px;
    height: 210px;
    margin-top: 12px;
    background-color: #FFFFFF;
    border-radius: 12px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
`
const NoButton = styled.button`
    width: 100%;
    height: 52px;
    margin-top: 12px;
    background-color: #CECECE;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
`