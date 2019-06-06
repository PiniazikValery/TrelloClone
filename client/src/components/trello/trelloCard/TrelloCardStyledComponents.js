import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Card from '@material-ui/core/Card';

export const CardContainer = styled.div`   
    cursor: pointer !important;
    margin-bottom: 8px; 
    position: relative;
    max-width: 100%;
    word-wrap: break-word;    
`

const _Card = styled(Card)`
    &:hover{
        background-color: rgba(109,130,166,.08);
    }    
`

export {_Card as Card};

export const DeleteButton  = styled(Icon)`
    position: absolute;
    display: none;
    right: 1px;
    top: 1px;
    opacity: 0.5;
    ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
    }
    &:hover {
        opacity: 0.8;
    }
`