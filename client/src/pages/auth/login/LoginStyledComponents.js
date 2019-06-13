import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

export const Paper = styled.div`
    display: flex;
    margin-top: 64px;
    align-items: center;
    flex-direction: column;
`

const avatar = styled(Avatar)`
    margin: 8px;
    background-color: #f50057 !important;
`

export const Form = styled.form`
    width: 100%;
    margin-top: 8px;
`

const button = styled(Button)`
    margin: 24px 0px 16px !important;
`

const link = styled(Link)`
    cursor: pointer;
`

export const GoogleLoginButtonWrapper = styled.div`
    margin: 0px 0px 16px;    
`

export { button as Button };
export { link as Link };
export { avatar as Avatar };