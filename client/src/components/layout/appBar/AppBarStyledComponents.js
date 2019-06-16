import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

export const RootBar = styled.div`
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
`

const _AppBar = styled(AppBar)`    
    background-color: #026aa7 !important;
`

export const Title = styled(Typography)`
    flex-grow: 1;
`

export { _AppBar as AppBar }