import { CONSTANTS } from '../../actions';

export const initUserProfile = (userProfile) => {
    return {
        type: CONSTANTS.INIT_USER_PROFILE,
        payload: userProfile
    }
}

export const changeAvatar = (newAvatar) => {
    return {
        type: CONSTANTS.CHANGE_AVATAR,
        payload: newAvatar
    }
}