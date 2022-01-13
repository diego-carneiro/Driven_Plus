import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

    const navigate = useNavigate();

    const initialValue = {
        email: "",
        name: "",
        cpf: "",
        password: "",
    }

    const [input, setInput] = useState(initialValue);
    
    function onChange(ev) {
        const { name, value } = ev.target

        setInput({ ...input, [name]: value });
    }

    function onSubmit(ev) {
        ev.preventDefault();

        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", input);
        promise.then(response => {
            navigate("/");
        });
        promise.catch(error => alert("Erro ao realizar cadastro"));
    }
    console.log(input);
    return (

        <Container>
            <Form onSubmit={onSubmit}>
                <Input placeholder="Nome" type="text" name="name" onChange={onChange}/>
                <Input placeholder="CPF" type="text" name="cpf" onChange={onChange}/>
                <Input placeholder="E-mail" type="text" name="email" onChange={onChange}/>
                <Input placeholder="Senha" type="password" name="password" onChange={onChange}/>
                <Button type="submit">
                    CADASTRAR
                </Button>
            </Form>

            <Link to="/">
                <SignUp>
                    Já possuí uma conta? Entre
                </SignUp>
            </Link>
        </Container>
    )
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
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
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
`
const SignUp = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: #FFFFFF;
    
`
