import _ from 'lodash';

export const createNewGrid = () => {
  const defaultGrid = [];
  for (let i = 0; i < 12; i++) {
    defaultGrid.push(new Array(6).fill(null));
  }
  return defaultGrid;
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function puyoRepeatRemoval(board, reArrangeFunc, removePuyoFunc, addToScore, chainCounter, Calc) {
  let check = true;
  let newBoard = deepCopy(board);
  let puyoRemovalArr=[];
  while (check) {
    check = false;
    const boardAfterFillEmptySpace = reArrange(newBoard);
    reArrangeFunc(boardAfterFillEmptySpace);
    await timeout(300);
    puyoRemovalArr = SearchBoard(boardAfterFillEmptySpace);
    if (puyoRemovalArr.length >= 4) {
      const boardAfterPuyoRemove = removePuyo(boardAfterFillEmptySpace, puyoRemovalArr);
      removePuyoFunc(boardAfterPuyoRemove);
      await timeout(300);
      check = true;
      addToScore(Calc(puyoRemovalArr.length, chainCounter));
      chainCounter++;
      puyoRemovalArr = [];
      newBoard=boardAfterPuyoRemove;
    }
  }
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

export const split = (board, puyo, updateFunc) => {
  const newBoard = deepCopy(board);

  const { centerPuyo, rotatePuyo } = puyo;
  const sameCol = centerPuyo.col === rotatePuyo.col;
  const sameRow = centerPuyo.row === rotatePuyo.row;
  const newCenterPuyo = _.cloneDeep(centerPuyo);
  const newRotatePuyo = _.cloneDeep(rotatePuyo);
  if (sameCol) {
    newBoard[centerPuyo.row][centerPuyo.col] = newCenterPuyo;
    newBoard[rotatePuyo.row][rotatePuyo.col] = newRotatePuyo;
    updateFunc(newBoard);
    return { board: newBoard, center: newCenterPuyo, rotate: newRotatePuyo };
  }
  if (sameRow) {
    if (centerPuyo.row === 11 && rotatePuyo.row === 11) {
      newBoard[centerPuyo.row][centerPuyo.col] = newCenterPuyo;
      newBoard[rotatePuyo.row][rotatePuyo.col] = newRotatePuyo;
      updateFunc(newBoard);
      return { board: newBoard, center: newCenterPuyo, rotate: newRotatePuyo };
    }

    if (newBoard[centerPuyo.row + 1][centerPuyo.col] && newBoard[rotatePuyo.row + 1][rotatePuyo.col]) {
      newBoard[centerPuyo.row][centerPuyo.col] = newCenterPuyo;
      newBoard[rotatePuyo.row][rotatePuyo.col] = newRotatePuyo;
      updateFunc(newBoard);
      return { board: newBoard, center: newCenterPuyo, rotate: newRotatePuyo };
    }

    if (newBoard[centerPuyo.row + 1][centerPuyo.col] && newBoard[rotatePuyo.row + 1][rotatePuyo.col] === null) {
      newBoard[centerPuyo.row][centerPuyo.col] = newCenterPuyo;
      for (let i = 11; i > rotatePuyo.row; i--) {
        if (newBoard[i][rotatePuyo.col] === null) {
          newRotatePuyo.row = i;
          newBoard[i][newRotatePuyo.col] = newRotatePuyo;
          updateFunc(newBoard);
          return { board: newBoard, center: newCenterPuyo, rotate: newRotatePuyo };
        }
      }
    }
    if (newBoard[rotatePuyo.row + 1][rotatePuyo.col] && newBoard[centerPuyo.row + 1][centerPuyo.col] === null) {
      newBoard[rotatePuyo.row][rotatePuyo.col] = newRotatePuyo;
      for (let i = 11; i > centerPuyo.row; i--) {
        if (newBoard[i][centerPuyo.col] === null) {
          newCenterPuyo.row = i;
          newBoard[i][newCenterPuyo.col] = newCenterPuyo;
          updateFunc(newBoard);
          return { board: newBoard, center: newCenterPuyo, rotate: newRotatePuyo };
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

export const explosion =async function(board, center, rotate, updateFunc, addToScore, reArrangeFunc, removePuyoFunc) {
  await timeout(125);
  let remove = [];
  let explode = false;
  let copy = board;
  let visit = {};
  let chainCounter = 1;
  let puyoCounter = 0;
  const scoreCalc = (puyoCounter, chainCounter) => ((10 * puyoCounter) * chainCounter)
  remove.push(...getAllConnection(board, center, visit));
  if (center.color !== rotate.color) visit = {};
  remove.push(...getAllConnection(board, rotate, visit));
  if (remove.length >= 4) {
    copy = removePuyo(board, remove);
    removePuyoFunc(copy);
    await timeout(300);
    explode = true;
    visit = {};
    puyoCounter = remove.length;
    remove = [];
    addToScore(scoreCalc(puyoCounter, chainCounter));
    chainCounter++;
  }
  if (explode) {
    puyoRepeatRemoval(copy, reArrangeFunc, removePuyoFunc, addToScore, chainCounter, scoreCalc);
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
