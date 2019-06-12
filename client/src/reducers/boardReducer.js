import { CONSTANTS } from '../actions'

let cardID = 5;

const initialState = {
    boardName: '',
    _id: null,
    lists: []
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.INIT_BOARD: {
            return action.payload;
        }
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload.title,
                cards: [],
                _id: action.payload.listId
            }
            const newState = { ...state };
            newState.lists = [...state.lists, newList];
            return newState;
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                _id: `card-${cardID}`
            }
            cardID += 1;

            const newState = { ...state };
            const list = newState.lists.find(list => list._id === action.payload.listID);
            list.cards = [...list.cards, newCard];
            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                type
            } = action.payload;
            const newState = { ...state };

            if (type === 'list') {
                const list = newState.lists.splice(droppableIndexStart, 1);
                newState.lists.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state.lists.find(list => droppableIdStart === list._id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find(list => droppableIdStart === list._id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.lists.find(list => droppableIdEnd === list._id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }
        case CONSTANTS.EDIT_LIST_TITLE: {
            const { listId, title } = action.payload;
            const newState = { ...state };
            const list = newState.lists.find((list) => { return list._id === listId });
            list.title = title;
            return newState;
        }
        case CONSTANTS.EDIT_CARD_TEXT: {
            const { listID, cardID, text } = action.payload;
            const newState = { ...state };
            const card = newState.lists.find((list) => { return list._id === listID }).cards.find((card) => { return card._id === cardID });
            card.text = text;
            return newState;
        }
        case CONSTANTS.DELETE_CARD: {
            const { listID, cardID } = action.payload;
            const newState = { ...state };
            const list = newState.lists.find((list) => { return list._id === listID });
            const newCards = list.cards.filter(card => card._id !== cardID);
            list.cards = newCards;
            return newState;
        }
        case CONSTANTS.DELETE_LIST: {
            const { listId } = action.payload;
            let newState = { ...state };
            newState.lists = newState.lists.filter(list => list._id !== listId);
            return newState;
        }
        default:
            return state;
    }
}

export default boardReducer;