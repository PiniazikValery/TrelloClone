import { combineReducers } from "redux";
import boardReducer from './boardReducer';
import listsReducer from './listsReducer';
import cardsReducer from './cardsReducer';
import notifierReducer from './notifierReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
    board: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    notifier: notifierReducer,
    userProfile: userProfileReducer
});