import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './TrelloCard.module.css'

class TrelloCard extends Component {
    render() {
        return (
            <Card className={styles.TrelloCardContainer}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {this.props.text}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default TrelloCard;