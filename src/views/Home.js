import React from 'react';
import styled from 'styled-components'
import { useState } from "react";
import axios from "axios";

export default function Login() {

    return (
        <Container>
            <Content>
                <h1>Olá, fulano</h1>
                <ButtonSection>
                    <Button>Solicitar brindes</Button>
                    <Button>Materiais bônus de web</Button>
                    <Button>Mudar plano</Button>
                    <Button>Cancelar plano</Button>
                </ButtonSection>
            </Content>
        </Container>
    );
}
// ::::::::::Styled-Components::::::::::
const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: black;
    padding: 120px 0px 100px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 24px;
        font-weight: 700;
        color: #FFFFFF;
    }
`
const Content = styled.div`
    width: 100%;

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

    display: flex;
    flex-direction: column;
    align-items: center;

`
const Button = styled.button`
    width: 300px;
    height: 52px;
    margin-top: 24px;
    background-color: #FF4791;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;

    &:nth-child(2) {
        margin-bottom: 255px;
    }  
    &:last-child {
        background-color: #FF4747;
    }
`