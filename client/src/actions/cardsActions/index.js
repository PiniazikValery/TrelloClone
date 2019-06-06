import { CONSTANTS } from '../../actions';

export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID }
    }
}

export const editCardText = (listID, cardID, text) => {
    return {
        type: CONSTANTS.EDIT_CARD_TEXT,
        payload: { listID, cardID, text }
    }
}