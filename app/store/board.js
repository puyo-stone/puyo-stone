import { createNewGrid } from '../Func/game';

const iniState = createNewGrid();
const GET_BOARD = 'GET_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD';
const NEW_BOARD = 'NEW_BOARD';
const REMOVE_PUYO_FROM_BOARD = 'REMOVE_PUYO_FROM_BOARD';

export const newBoardAction = () => ({ type: NEW_BOARD });
export const getBoardAction = board => ({ type: GET_BOARD, board });
export const updateBoardAction = board => ({ type: UPDATE_BOARD, board });
export const removePuyoFromBoardAction = board => ({
  type: REMOVE_PUYO_FROM_BOARD,
  board
})

export const insertPuyo = (board) => dispatch => {
  dispatch(updateBoardAction(board));
}

export const removePuyoFromBoard = (board) => dispatch => {
  dispatch(removePuyoFromBoardAction(board));
}

export default function(state = iniState, action) {
  switch (action.type) {
  case GET_BOARD:
    return action.board;

  case UPDATE_BOARD:
    return action.board;

  case REMOVE_PUYO_FROM_BOARD:
    return action.board;

  case NEW_BOARD:
    return iniState;

  default:
    return state;
  }
}
