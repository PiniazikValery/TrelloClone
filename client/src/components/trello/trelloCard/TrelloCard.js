import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';
import { CardContainer } from './TrelloCardStyledComponents';

class TrelloCard extends Component {
    render() {
        return (
            <Draggable draggableId={String(this.props.id)} index={this.props.index}>
                {provided => (
                    <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {this.props.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContainer>
                )}
            </Draggable>
        );
    }
}

export default TrelloCard;