import styled from "styled-components";
import Card from '@material-ui/core/Card';
import Icon from "@material-ui/core/Icon";

const _Card = styled(Card)`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 36px;
    width: 278px;
    padding-left: 10px;
    margin: 10px;
`

export const Content = styled.p`
    color: rgba(0, 0, 0, 0.54);
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
`

export const AddIcon = styled(Icon)`
    color: rgba(0, 0, 0, 0.54);
`

export const TrelloActionFormContainer = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 2px;
`

export { _Card as Card };
