import styled from "styled-components";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const _Card = styled(Card)`
    margin: 10px;
    min-width: 250px;

`

const _Typography = styled(Typography)`
    font-size: 20px;
`

export { _Card as Card };
export { _Typography as Typography };