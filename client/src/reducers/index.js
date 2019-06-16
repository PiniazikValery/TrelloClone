import { combineReducers } from "redux";
import boardReducer from './boardReducer';
import listsReducer from './listsReducer';
import cardsReducer from './cardsReducer';
import notifierReducer from './notifierReducer'

export default combineReducers({
    board: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    notifier: notifierReducer
});