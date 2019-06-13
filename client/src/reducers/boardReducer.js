import { CONSTANTS } from '../actions'

const initialState = {
    boardName: '',
    _id: null,
    lists: []
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.INIT_BOARD: {
            const newState = {
                boardName: action.payload.boardName,
                _id: action.payload._id,
                lists: []
            }
            action.payload.lists.map(list => newState.lists = [...newState.lists, list._id]);
            return newState;
        }
        case CONSTANTS.ADD_LIST:
            const { listId } = action.payload;
            const board = state;
            const newListID = listId;
            const newLists = [...board.lists, newListID];
            board.lists = newLists;
            return { ...state, board };
        case CONSTANTS.DELETE_LIST: {
            const { listId } = action.payload;
            const board = state;
            const lists = board.lists;
            const newLists = lists.filter(id => id !== listId);
            board.lists = newLists;
            return { ...state, board };
        }
        case CONSTANTS.DRAG_HAPPENED: {
            const board = state;
            const lists = board.lists;
            const {
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;

            if (type === "list") {
                const pulledOutList = lists.splice(droppableIndexStart, 1);
                lists.splice(droppableIndexEnd, 0, ...pulledOutList);
                board.lists = lists;

                return { ...state, board };
            }
            return state;
        }
        default:
            return state;
    }
}

export default boardReducer;