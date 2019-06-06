import styled from "styled-components";
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextArea from 'react-textarea-autosize';

export const ActionButtonCard = styled(Card)`
    overflow: visible;    
    min-height: 80px;
    min-width: 272px;
    padding: 6px 8px 2px; 
    margin-top: 8px;    
`

export const ActionButtonTextArea = styled(TextArea)`
    resize: none;
    width: 100%;   
    min-height: 60px; 
    overflow: hidden;
    outline: none;
    border:none;
    margin: 8px;    
`

export const FormButtonGroup = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    margin: 8px;
`

export const SaveButton = styled(Button)`
    color: white;
    background-color: #5aac44;
`

export const CloseIcon = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;

`