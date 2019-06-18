import { CONSTANTS } from '../actions';

const initialState = {
    avatar: null,
    description: null,
    shortName: null
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.INIT_USER_PROFILE: {
            return action.payload;
        }
        case CONSTANTS.CHANGE_AVATAR: {
            let newState = state;
            newState.avatar = action.payload;
            return { ...state, newState };
        }
        default:
            return state;
    }
}

export default userProfileReducer;