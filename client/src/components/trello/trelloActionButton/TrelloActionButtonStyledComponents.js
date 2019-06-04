import styled from "styled-components";
import TextArea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card'

export const OpenForButtonGroup = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 36px;
    width: 272px;
    padding-left: 10px;
    margin: 8px;
`

export const ActionButtonTextArea = styled(TextArea)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border:none;
    margin: 8px;
`

export const ActionButtonCard = styled(Card)`
    overflow: visible;
    min-height: 80px;
    min-width: 272px;
    padding: 6px 8px 2px;
    margin: 8px;
`

export const FormButtonGroup = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    margin: 8px;
`