import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

export const ProfileContainer = styled.div`
    margin: auto;
    width: 60%;
    text-align: center;
    padding: 10px;
`

const _Avatar = styled(Avatar)`
    cursor: pointer;
    width: 300px !important;
    height: 300px !important;
`

export const Description = styled(TextField)`
    margin: auto !important;
    width: 100%;    
`

export { _Avatar as Avatar };