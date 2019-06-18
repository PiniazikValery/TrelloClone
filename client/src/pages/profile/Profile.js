import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { ProfileContainer, Avatar, Description, UploadButton } from './ProfileStyledComponents';
import IconButton from '@material-ui/core/IconButton';
import { bindActionCreators } from 'redux';
import { showNotification, changeAvatar } from '../../actions';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionText: '',
            savedUpdates: true
        };
        this.handleDescriptionEditing = this.handleDescriptionEditing.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFinishEditing = this.handleFinishEditing.bind(this);
        this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
    }

    handleDescriptionEditing(e) {
        this.setState({
            descriptionText: e.target.value,
            savedUpdates: false
        });
    }

    componentDidMount() {
        axios.get('/api/userInfo/profile')
            .then(res => this.setState({ descriptionText: res.data.user.profile.description }));
    }

    handleFinishEditing() {
        axios.put('/api/userInfo/description', {
            description: this.state.descriptionText
        })
            .then(() => {
                this.setState({
                    savedUpdates: true
                });
            })
            .catch(err => this.props.showNotification(err.response.data.register_errors[0].msg, 'error', 6000));
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            this.handleFinishEditing();
        }
    }

    handleAvatarUpload(event) {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            const formData = new FormData();
            formData.append('file', file);
            axios.post('/api/userInfo/avatar', formData)
                .then(res => this.props.changeAvatar(res.data.avatarId))
                .catch(() => this.props.showNotification('Error occure while uploading avatar', 'error', 6000));
        };
        if (file !== undefined) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <ProfileContainer>
                <Typography>Upload avatar</Typography>
                <IconButton>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        onChange={this.handleAvatarUpload}
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Avatar alt="Remy Sharp" src={this.props.userProfile.avatar ? `/api/userInfo/avatar/${this.props.userProfile.avatar}` : undefined} >
                            {this.props.userProfile.shortName}
                        </Avatar>
                    </label>
                </IconButton>
                <Typography align="center" variant="subtitle1" gutterBottom>
                    Description:
                </Typography>
                <Description
                    onKeyPress={this.handleKeyPress}
                    multiline={true}
                    rows={5}
                    value={this.state.descriptionText}
                    onChange={this.handleDescriptionEditing}
                    rowsMax={50}
                />
                {this.state.savedUpdates ? undefined : <Typography variant="subtitle1" color="error" gutterBottom>
                    Your changes isn`t saved , press Enter + Shift to save it.
                </Typography>}
            </ProfileContainer>
        );
    }
}

const mapStateToProps = state => ({
    userProfile: state.userProfile
});

const mapDispatchToProps = dispatch => ({
    showNotification: bindActionCreators(showNotification, dispatch),
    changeAvatar: bindActionCreators(changeAvatar, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);