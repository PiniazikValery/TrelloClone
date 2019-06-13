import { CONSTANTS } from '../actions'

const initialState = {};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.INIT_BOARD: {
            let newState = {};
            action.payload.lists.map(list =>
                list.cards.map(card => {
                    const newCard = {
                        _id: card._id,
                        text: card.text
                    };
                    newState = { ...newState, [card._id]: newCard };
                    return undefined;
                })
            );
            return newState;
        }
        case CONSTANTS.ADD_CARD: {
            const { text, cardId } = action.payload;

            const newCard = {
                text,
                id: cardId,
            };

            return { ...state, [cardId]: newCard };
        }
        case CONSTANTS.EDIT_CARD_TEXT: {
            const { cardId, text } = action.payload;
            const card = state[cardId];
            card.text = text;
            return { ...state, [cardId]: card };
        }
        case CONSTANTS.DELETE_CARD: {
            const { cardId } = action.payload;
            const newState = state;
            delete newState[cardId];
            return newState;
        }
        default:
            return state;
    }
}

export default cardsReducer;