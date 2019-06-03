import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TrelloActionButton } from '../../components/trello/trelloActionButton';
import { TrelloList } from '../../components/trello/trelloList'
import styles from './Home.module.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.lists = this.props.lists;
    }
    render() {
        return (
            <div className="Home">
                <p>
                    This is Home page
                </p>
                <div className={styles.listsContainer}>
                    {this.lists.map(list => <TrelloList key={list.id} title={list.title} cards={list.cards} />)}
                    <TrelloActionButton list />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(Home);