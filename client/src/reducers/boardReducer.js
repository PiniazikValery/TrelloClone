import { CONSTANTS } from '../actions'

let listID = 2;
let cardID = 5;

const initialState = {
    boardName:'',
    boardId: null,
    lists: [
        {
            title: "Last coding time",
            id: `list-${0}`,
            cards: [
                {
                    id: `card-${0}`,
                    text: "I create a static list and a static card"
                },
                {
                    id: `card-${1}`,
                    text: "I use a mix between material UI React and styled components"
                }
            ]
        },
        {
            title: "This coding time",
            id: `list-${1}`,
            cards: [
                {
                    id: `card-${2}`,
                    text: "I will create our first reducer"
                },
                {
                    id: `card-${3}`,
                    text: "and render many cards on our list with static data"
                },
                {
                    id: `card-${4}`,
                    text: "I will also make some little changes I forgot in the last episode"
                }
            ]
        }
    ]
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            const newState = { ...state };
            newState.lists = [...state.lists, newList];
            return newState;
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;

            const newState = { ...state };
            const list = newState.lists.find(list => list.id === action.payload.listID);
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
                const list = state.lists.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.lists.find(list => droppableIdEnd === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }
        case CONSTANTS.EDIT_LIST_TITLE: {
            const { listId, title } = action.payload;
            const newState = { ...state };
            const list = newState.lists.find((list) => { return list.id === listId });
            list.title = title;
            return newState;
        }
        case CONSTANTS.EDIT_CARD_TEXT: {
            const { listID, cardID, text } = action.payload;
            const newState = { ...state };
            const card = newState.lists.find((list) => { return list.id === listID }).cards.find((card) => { return card.id === cardID });
            card.text = text;
            return newState;
        }
        case CONSTANTS.DELETE_CARD: {
            const { listID, cardID } = action.payload;
            const newState = { ...state };
            const list = newState.lists.find((list) => { return list.id === listID });
            const newCards = list.cards.filter(card => card.id !== cardID);
            list.cards = newCards;
            return newState;
        }
        case CONSTANTS.DELETE_LIST: {
            const { listId } = action.payload;
            let newState = { ...state };
            newState.lists = newState.lists.filter(list => list.id !== listId);
            return newState;
        }
        default:
            return state;
    }
}

export default boardReducer;