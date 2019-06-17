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
        default:
            return state;
    }
}

export default userProfileReducer;