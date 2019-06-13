import { CONSTANTS } from '../actions';

const initialState = {};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.INIT_BOARD: {
            let newState = {};
            action.payload.lists.map(list => {
                const newList = {
                    _id: list._id,
                    title: list.title,
                    cards: [],
                };
                list.cards.map(card => newList.cards = [...newList.cards, card._id]);
                newState = { ...newState, [list._id]: newList };
                return undefined;
            });
            return newState;
        }
        case CONSTANTS.DRAG_HAPPENED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;

            if (type === "list") {
                return state;
            }

            if (droppableIdStart === droppableIdEnd) {
                const list = state[droppableIdStart];
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
                return { ...state, [droppableIdStart]: list };
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state[droppableIdStart];
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state[droppableIdEnd];
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
                return {
                    ...state,
                    [droppableIdStart]: listStart,
                    [droppableIdEnd]: listEnd
                };
            }
            return state;
        }
        case CONSTANTS.ADD_LIST: {
            const { title, listId } = action.payload;
            const newList = {
                title: title,
                id: listId,
                cards: []
            };

            const newState = { ...state, [listId]: newList };

            return newState;
        }
        case CONSTANTS.DELETE_LIST: {
            const { listId } = action.payload;
            const newState = state;
            delete newState[listId];
            return newState;
        }
        case CONSTANTS.EDIT_LIST_TITLE: {
            const { listId, title } = action.payload;
            const list = state[listId];
            list.title = title;
            return { ...state, [listId]: list };
        }
        case CONSTANTS.ADD_CARD: {
            const { listId, cardId } = action.payload;
            const list = state[listId];
            list.cards.push(cardId);
            return { ...state, [listId]: list };
        }
        case CONSTANTS.DELETE_CARD: {
            const { listId, cardId } = action.payload;
            const list = state[listId];
            const newCards = list.cards.filter(cardID => cardID !== cardId);
            return { ...state, [listId]: { ...list, cards: newCards } };
        }
        default:
            return state;
    }
}

export default listsReducer;

