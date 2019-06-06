import styled from "styled-components";
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