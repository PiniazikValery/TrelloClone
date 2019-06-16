import { CONSTANTS } from '../actions';

const initialState = {
    isOpen: false,
    notificationMessage: '',
    notificationVariant: 'info',
    autoHideDuration: 6000
};

const notifierReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SHOW_NOTIFICATION: {
            return {
                ...state,
                isOpen: true,
                notificationMessage: action.payload.message,
                notificationVariant: action.payload.variant,
                autoHideDuration: action.payload.autoHideDuration
            }
        }
        case CONSTANTS.HIDE_NOTIFICATION: {
            return {
                ...state, isOpen: false,
            }
        }
        default:
            return state;
    }
}

export default notifierReducer;