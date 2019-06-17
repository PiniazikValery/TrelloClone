import { CONSTANTS } from '../../actions';

export const initUserProfile = (userProfile) => {
    return {
        type: CONSTANTS.INIT_USER_PROFILE,
        payload: userProfile
    }
}