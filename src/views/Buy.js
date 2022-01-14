import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { IconContext } from "react-icons";
import axios from "axios";

import Loading from "../components/Loading";
import { AuthContext } from "../providers/auth";

export default function Buy() {

    const storage = (key, value) => {

        localStorage.setItem(key, value);
    }

    const { idPlano } = useParams();
    const navigate = useNavigate();

    const initialValue = {
        membershipId: idPlano,
        cardName: "",
        cardNumber: "",
        securityNumber: "",
        expirationDate: "",
    }

    const [input, setInput] = useState(initialValue);
    const [info, setInfo] = useState([]);
    const [warning, setWarning] = useState(false);
    const { token } = React.useContext(AuthContext);

    function onChange(ev) {
        const { name, value } = ev.target

        setInput({ ...input, [name]: value });
    }

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
        });
        promise.catch(error => alert(error))
    }, []); //eslint-disable-line

    function buyPlan() {
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", input,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        promise.catch(error => alert("Erro ao realizar compra"))
        promise.then(response => {  
            storage("userPurchase", JSON.stringify(response.data));
            storage("userId", response.data.id);
            navigate("/home");
        })
    }

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
                    <IconContext.Provider value={{ color: "white", size: "34px" }}>
                        <Link to="/subscriptions">
                            <FaArrowLeft />
                        </Link>
                    </IconContext.Provider>
                </Header>
                <img src={info.image} />
                <h1>{info.name}</h1>
                <InformationBox>
                    <H2Title>
                        <IconContext.Provider value={{ color: "#FF4791", size: "15px" }}>
                            <HiOutlineClipboardCheck />
                        </IconContext.Provider>
                        <h2>Benefícios:</h2>
                    </H2Title>
                    {info.perks.map((items) => (
                        <h3>{items.title}</h3>
                    ))}
                </InformationBox>
                <InformationBox>
                    <H2Title>
                        <IconContext.Provider value={{ color: "#FF4791", size: "15px" }}>
                            <FaMoneyBillWave />
                        </IconContext.Provider>
                        <h2>Preço:</h2>
                    </H2Title>
                    <h3>R$ {info.price} cobrados mensalmente</h3>
                </InformationBox>
                <CardInfo>
                    <Input placeholder="Nome impresso no cartão" type="text" name="cardName" onChange={onChange} />
                    <Input placeholder="Digitos do cartão" type="text" name="cardNumber" onChange={onChange} />
                    <CardSecurity>
                        <Input placeholder="Código de segurança" type="text" name="securityNumber" onChange={onChange} />
                        <Input placeholder="Validade" type="text" name="expirationDate" onChange={onChange} />
                    </CardSecurity>
                    <Button onClick={() => { setWarning(true) }}>ASSINAR</Button>
                </CardInfo>
            </Container>
            <WarningContainer position={warning} >
                <WarningHeader>
                    <IconContext.Provider value={{ color: "#FFFFFF", size: "32px" }}>
                        <FaWindowClose onClick={() => { setWarning(false) }} />
                    </IconContext.Provider>
                </WarningHeader>
                <WarningBox>
                    <h1>Tem certeza que deseja assinar o {info.name} (R$ {info.price}) ?</h1>
                    <ButtonLayer>
                        <NoButton onClick={() => { setWarning(false) }}>Não</NoButton>
                        <YesButton onClick={buyPlan}>SIM</YesButton>
                    </ButtonLayer>
                </WarningBox>
            </WarningContainer>
        </>
    );
}
// ::::::::::Styled-Components::::::::::
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: black;
    padding: 24px 22px 24px 22px;
    filter: brightness(${props => props.position ? "0.3" : "1"});

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
    img{
        margin-right: 22px;
    }
`;
const WarningContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding: 24px 22px 24px 22px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    height: fit-content;
`
const WarningHeader = styled.div`
    width: 100%;
    height: fit-content;
    margin-right: 42px;
    margin-top: 25px;
    position: fixed;
    top: 0;

    display: flex;
    justify-content: flex-end;
`
const H2Title = styled.div`
    display: flex;
`
const InformationBox = styled.div`
    width: 100%;
    padding: 10px;
    h2{
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 10px;
        margin-left: 5px;
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
    gap: 10px;
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
    padding: 33px 22px 11px 22px;
    background-color: #FFFFFF;
    border-radius: 12px;
    border: none;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1{
        font-size: 18px;
        font-weight: 700; 
        color: black;
    }
    h2{  
        font-size: 14px;
        font-weight: 700;  
        color: #FFFFFF;
    }

`
const NoButton = styled.button`
    width: 95px;
    height: 52px;
    margin-top: 12px;
    background-color: #CECECE;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
`
const YesButton = styled.button`
    width: 95px;
    height: 52px;
    margin-top: 12px;
    background-color: #FF4791;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
`
const ButtonLayer = styled.div`
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`