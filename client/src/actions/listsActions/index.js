import { CONSTANTS } from '../../actions';

export const addList = (title, listId) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: { title, listId }
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}

export const editListTitle = (listId, title) => {
    return {
        type: CONSTANTS.EDIT_LIST_TITLE,
        payload: {
            listId,
            title
        }
    }
}

export const deleteList = (listId) => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload: {
            listId
        }
    }
}