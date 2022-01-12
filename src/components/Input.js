import React from "react";
import styled from "styled-components"

export default function Input() {

    return(

        <InputBox />

    );
}
// ::::::::::Styled-Components::::::::::
const InputBox = styled.input`
    width: 300px;
    height: 52px;
    border-radius: 8px;
    margin-top: 16px;
    border: none;
    padding-left: 14px;
    font-size: 14px;
    color: #7E7E7E;
`