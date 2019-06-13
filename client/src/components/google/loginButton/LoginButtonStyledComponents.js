import styled from "styled-components";

export const GoogleButton = styled.button`
    cursor: pointer;
    height: 40px;
    width: 100%;
    border-width: 0;
    background: white;
    color: #737373;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 1px 1px 0px 1px rgba(0,0,0,0.05);
    transition-property: background-color, box-shadow;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    padding: 0;

    &:focus,
    &:hover {
    box-shadow: 1px 4px 5px 1px rgba(0,0,0,0.1);
    }

    &:active {
    background-color: #e5e5e5;
    box-shadow: none;
    transition-duration: 10ms;
    }
`

export const GoogleIcon = styled.span`
    display: inline-block;
    vertical-align: middle;
    margin: 8px 0 8px 8px;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
`

export const GoogleButtonText = styled.span`
    display: inline-block;
    vertical-align: middle;
    padding: 0 24px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto',arial,sans-serif;
`