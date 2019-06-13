import { CONSTANTS } from '../../actions';

export const addCard = (listId, cardId, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listId, cardId }
    }
}

export const editCardText = (listId, cardId, text) => {
    return {
        type: CONSTANTS.EDIT_CARD_TEXT,
        payload: { listId, cardId, text }
    }
}

export const deleteCard = (listId, cardId) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { listId, cardId }
    }
}