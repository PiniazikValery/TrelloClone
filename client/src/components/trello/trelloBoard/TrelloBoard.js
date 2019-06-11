import React, { Component } from 'react';
import { Card, Typography } from './TrelloBoardStyledComponents';
import CardContent from '@material-ui/core/CardContent';

class TrelloBoard extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {this.props.boardName}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default TrelloBoard;