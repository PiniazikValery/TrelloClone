import { CONSTANTS } from '../../actions';

export const initBoard = (board) => {
    return {
        type: CONSTANTS.INIT_BOARD,
        payload: board
    }
}