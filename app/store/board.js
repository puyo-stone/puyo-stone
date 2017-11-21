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

const newBoardAction = ()=> ({ type: NEW_BOARD });

const getBoardAction = board => ({ type: GET_USER, board });
const updateBoardAction = board => ({ type: UPDATE_BOARD, board })

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


