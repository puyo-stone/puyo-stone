import _ from 'lodash';

export const createNewGrid = () => {
  const defaultGrid = [];
  for (let i = 0; i < 12; i++) {
    defaultGrid.push(new Array(6).fill(null));
  }
  return defaultGrid;
}

const deepCopy = (board) => {
  const newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard[i] = board[i].slice(0);
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (newBoard[i][j]) {
        newBoard[i][j] = _.cloneDeep(newBoard[i][j]);
      }
    }
  }

  return newBoard;
}

const newBoard = createNewGrid();

export const split = (board, puyo, updateFunc) => {
  const newBoard = deepCopy(board);

  const { centerPuyo, rotatePuyo } = puyo;
  const sameCol = centerPuyo.col === rotatePuyo.col;
  const sameRow = centerPuyo.row === rotatePuyo.row;
  if (sameCol) {
    newBoard[centerPuyo.row][centerPuyo.col] = centerPuyo;
    newBoard[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
    updateFunc(newBoard);
    return { board: newBoard, center: centerPuyo, rotate: rotatePuyo };
  }
  if (sameRow) {
    if (centerPuyo.row === 11 && rotatePuyo.row === 11) {
      newBoard[centerPuyo.row][centerPuyo.col] = centerPuyo;
      newBoard[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
      updateFunc(newBoard);
      return { board: newBoard, center: centerPuyo, rotate: rotatePuyo };
    }

    if (newBoard[centerPuyo.row + 1][centerPuyo.col] && newBoard[rotatePuyo.row + 1][rotatePuyo.col]) {
      newBoard[centerPuyo.row][centerPuyo.col] = centerPuyo;
      newBoard[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
      updateFunc(newBoard);
      return { board: newBoard, center: centerPuyo, rotate: rotatePuyo };
    }

    if (newBoard[centerPuyo.row + 1][centerPuyo.col] && newBoard[rotatePuyo.row + 1][rotatePuyo.col] === null) {
      newBoard[centerPuyo.row][centerPuyo.col] = centerPuyo;
      const newPuyo = _.cloneDeep(rotatePuyo);
      for (let i = 11; i > rotatePuyo.row; i--) {
        if (newBoard[i][rotatePuyo.col] === null) {
          newPuyo.row = i;
          newBoard[i][newPuyo.col] = newPuyo;
          updateFunc(newBoard);
          return { board: newBoard, center: centerPuyo, rotate: newPuyo };
        }
      }
    }
    if (newBoard[rotatePuyo.row + 1][rotatePuyo.col] && newBoard[centerPuyo.row + 1][centerPuyo.col] === null) {
      newBoard[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
      const newPuyo = _.cloneDeep(centerPuyo);
      for (let i = 11; i > centerPuyo.row; i--) {
        if (newBoard[i][centerPuyo.col] === null) {
          newPuyo.row = i;
          newBoard[i][newPuyo.col] = newPuyo;
          updateFunc(newBoard);
          return { board: newBoard, center: centerPuyo, rotate: rotatePuyo };
        }
      }
    }
  }
}

const reArrange = (board) => {
  const emptyBoard = createNewGrid();   // createNewGrid just a function to make a empty 2D array and fill with null
  for (let i = 0; i < 6; i++) {
    let counter = 11;
    for (let j = 11; j >= 0; j--) {
      if (board[j][i]) {
        const newPuyo = _.cloneDeep(board[j][i]);
        newPuyo.row = counter--;
        emptyBoard[newPuyo.row][newPuyo.col] = newPuyo;
      } else {
        continue;
      }
    }
  }
  return emptyBoard;
}

const getNeighbor = (board, puyo) => {
  const result = [];
  if (board[puyo.row + 1] && board[puyo.row + 1][puyo.col] && board[puyo.row + 1][puyo.col].color === puyo.color) {
    result.push(board[puyo.row + 1][puyo.col]);
  }

  if (board[puyo.row - 1] && board[puyo.row - 1][puyo.col] && board[puyo.row - 1][puyo.col].color === puyo.color) {
    result.push(board[puyo.row - 1][puyo.col]);
  }

  if (board[puyo.row][puyo.col + 1] && board[puyo.row][puyo.col + 1].color === puyo.color) {
    result.push(board[puyo.row][puyo.col + 1]);
  }

  if (board[puyo.row][puyo.col - 1] && board[puyo.row][puyo.col - 1].color === puyo.color) {
    result.push(board[puyo.row][puyo.col - 1]);
  }
  return result;
}

const getAllConnection = (board, puyo, visit) => {
  const queue = [puyo];
  const result = [];
  while (queue.length) {
    const pop = queue.shift();
    if (!visit[pop.row]) {
      visit[pop.row] = {};
    }
    if (!visit[pop.row][pop.col]) {
      visit[pop.row][pop.col] = true;
      result.push(pop);
      queue.push(...getNeighbor(board, pop))
    }
  };
  return result.length >= 4 ? result : [];
}

export const explosion = (board, center, rotate, updateFunc, addToScore) => {
  let remove = [];
  let explode = false;
  let copy = board;
  let visit = {};
  let chainCounter = 1;
  let puyoCounter = 0;
  let scoreCalc = (puyoCounter, chainCounter) => {
    return ((10 * puyoCounter) * chainCounter);
  }
  remove.push(...getAllConnection(board, center, visit));
  if (center.color !== rotate.color) visit = {};
  remove.push(...getAllConnection(board, rotate, visit));
  if (remove.length >= 4) {
    copy = removePuyo(board, remove);
    updateFunc(copy);
    explode = true;
    visit = {};
    puyoCounter = remove.length;
    console.log('TESTING');

    remove = [];
    addToScore(scoreCalc(puyoCounter, chainCounter));
    // console.log( addToScore(scoreCalc(puyoCounter, chainCounter)) );
    chainCounter++;
  }
  while (explode) {
    explode = false;
    copy = reArrange(copy);
    updateFunc(copy);
    remove = SearchBoard(copy);
    if (remove.length >= 4) {
      copy = removePuyo(copy, remove);
      updateFunc(copy);
      explode = true;
      visit = {};
      remove = [];
      chainCounter++;
    }
  }
}

const removePuyo = (board, arr) => {
  const returnBoard = deepCopy(board);
  arr.forEach(puyo => {
    returnBoard[puyo.row][puyo.col] = null;
  })
  return returnBoard;
}

const SearchBoard = (board) => {
  const result = [];
  const visit = {};
  for (let i = 11; i >= 0; i--) {
    for (let j = 0; j < 6; j++) {
      if (!board[i][j]) continue;
      result.push(...getAllConnection(board, board[i][j], visit));
    }
  }
  return result;
}
