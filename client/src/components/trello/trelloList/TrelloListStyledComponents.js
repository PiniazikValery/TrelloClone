import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

export const ListContainer = styled.div`
    cursor: pointer !important;
    background-color: #dfe1e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin: 8px;  
`

export const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const StyledInput = styled.input`
  width: 100%;  
  border: none;
  margin-top: 1.33em;
  margin-bottom: 1.33em;  
  outline-color: blue;
  border-radius: 3px;
  padding-bottom: 5px;
  padding-top: 5px;  
`

export const ListTitle = styled.h4`
  transition: background 0.3s ease-in; 
`

export const DeleteButton = styled(Icon)`  
  cursor: pointer;  
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
`
