import { CONSTANTS } from '../../actions';

export const showNotification = (message, variant, autoHideDuration) => {
    return {
        type: CONSTANTS.SHOW_NOTIFICATION,
        payload: { message, variant, autoHideDuration }
    }
}

export const hideNotification = () => {
    return {
        type: CONSTANTS.HIDE_NOTIFICATION,
    }
}
