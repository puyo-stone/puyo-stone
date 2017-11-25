function createNewGrid() {
  const defaultGrid = [];
  for (let i = 0; i < 12; i++) {
    defaultGrid.push(new Array(6).fill(null));
  }
  return defaultGrid;
}

const iniState = createNewGrid();

const GET_BOARD = 'GET_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD';
const NEW_BOARD = 'NEW_BOARD';

export const newBoardAction = ()=> ({ type: NEW_BOARD });
export const getBoardAction = board => ({ type: GET_BOARD, board });
export const updateBoardAction = board => ({ type: UPDATE_BOARD, board })

export const insertPuyo = (puyo, board) => dispatch => {
  const newMap = board.map(puyo => puyo)
  const col = puyo.col
  const row = puyo.row
  newMap[row][col] = puyo
  dispatch(updateBoardAction(newMap))
}

export default function (state = iniState, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board;
    case UPDATE_BOARD:
      return action.board;
    case NEW_BOARD:
      return iniState;
    default:
      return state;
  }
}


