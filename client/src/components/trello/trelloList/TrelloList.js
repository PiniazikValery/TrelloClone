import React, { Component } from 'react';
import styles from './TrelloList.module.css';
import { TrelloCard } from '../trelloCard'
import { TrelloActionButton } from '../trelloActionButton';


class TrelloList extends Component {
    render() {
        return (
            <div className={styles.TrelloListContainer}>
                <h4>{this.props.title}</h4>
                {this.props.cards.map(card => <TrelloCard key={card.id} text={card.text} />)}
                <TrelloActionButton />
            </div>
        );
    }
}

export default TrelloList;