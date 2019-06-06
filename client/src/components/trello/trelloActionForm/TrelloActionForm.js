import React, { Component } from 'react';
import { ActionButtonCard, ActionButtonTextArea, FormButtonGroup, SaveButton, CloseIcon } from './TrelloActionFormStyledComponents'

class TrelloActionForm extends Component {
    render() {
        return (
            <div>
                <ActionButtonCard>
                    <ActionButtonTextArea
                        placeholder={this.props.placeholder}
                        autoFocus
                        onBlur={this.props.onCloseForm}
                        value={this.props.value}
                        onChange={this.props.onInputChange}
                    />
                </ActionButtonCard>
                <FormButtonGroup>
                    <SaveButton onMouseDown={this.props.onSaveClick} style={{ color: "white", backgroundColor: "#5aac44" }} variant="contained">{this.props.buttonTitle}</SaveButton>
                    <CloseIcon onMouseDown={this.props.onCloseForm} style={{ marginLeft: 8, cursor: "pointer" }}>close</CloseIcon>
                </FormButtonGroup>
            </div>
        );
    }
}

export default TrelloActionForm;