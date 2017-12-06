function puyoExist(puyo) {
  if (puyo) {
    if (puyo.centerPuyo.row<1) {
      return true
    }
  }
}

export const leftCheck = (board, puyo) => {
  if (puyoExist(puyo)) return false;
  const { centerPuyo, rotatePuyo } = puyo;
  const leftMostPuyo = centerPuyo.col < rotatePuyo.col ? centerPuyo : rotatePuyo;
  const sameCol = centerPuyo.col === rotatePuyo.col;
  if (sameCol) {
    if (centerPuyo.col > 0 && board[centerPuyo.row][centerPuyo.col - 1] === null && board[rotatePuyo.row][rotatePuyo.col - 1] === null) {
      return true;
    } else {
      return false;
    }
  }
  if (leftMostPuyo.col > 0) {
    if (board[leftMostPuyo.row][leftMostPuyo.col - 1] === null) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

export const rightCheck = (board, puyo) => {
  if (puyoExist(puyo)) return false;
  const { centerPuyo, rotatePuyo } = puyo;
  const rightMostPuyo = centerPuyo.col > rotatePuyo.col ? centerPuyo : rotatePuyo;
  const sameCol = centerPuyo.col === rotatePuyo.col;
  if (sameCol) {
    if (centerPuyo.col < 5 && board[centerPuyo.row][centerPuyo.col + 1] === null && board[rotatePuyo.row][rotatePuyo.col + 1]===null) {
      return true;
    } else {
      return false;
    }
  }
  if (rightMostPuyo.col < 5) {
    if (board[rightMostPuyo.row][rightMostPuyo.col + 1] === null) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}

export const rotateACheck = (board, puyo) => {
  if (puyoExist(puyo)) return false;
  const { centerPuyo, rotatePuyo } = puyo;
  switch (puyo.positions) {
  case 0:
    if (centerPuyo.col < 5 && board[centerPuyo.row][centerPuyo.col + 1] === null && board[rotatePuyo.row][rotatePuyo.col + 1] === null) {
      return true;
    } else {
      return false;
    }
  case 1:
    if (centerPuyo.row < 11 && board[centerPuyo.row + 1][centerPuyo.col] === null && board[rotatePuyo.row + 1][rotatePuyo.col] === null) {
      return true;
    } else {
      return false;
    }
  case 2:
    if (centerPuyo.col > 0 && board[centerPuyo.row][centerPuyo.col - 1] === null && board[rotatePuyo.row][rotatePuyo.col - 1] === null) {
      return true;
    } else {
      return false;
    }

  case 3:
    if (centerPuyo.row > 0 && board[centerPuyo.row - 1][centerPuyo.col] === null && board[rotatePuyo.row - 1][rotatePuyo.col] === null) {
      return true;
    } else {
      return false;
    }
  }
}

export const rotateBCheck = (board, puyo) => {
  if (puyoExist(puyo)) return false;
  const { centerPuyo, rotatePuyo } = puyo;
  switch (puyo.positions) {
  case 0:
    if (centerPuyo.col > 0 && board[centerPuyo.row][centerPuyo.col - 1] === null && board[rotatePuyo.row][rotatePuyo.col - 1] === null) {
      return true;
    } else {
      return false;
    }

  case 1:
    if (centerPuyo.row > 0 && board[centerPuyo.row - 1][centerPuyo.col] === null && board[rotatePuyo.row - 1][rotatePuyo.col] === null) {
      return true;
    } else {
      return false;
    }
  case 2:
    if (centerPuyo.col < 5 && board[centerPuyo.row][centerPuyo.col + 1] === null && board[rotatePuyo.row][rotatePuyo.col + 1] === null) {
      return true;
    } else {
      return false;
    }

  case 3:
    if (centerPuyo.row < 11 && board[centerPuyo.row + 1][centerPuyo.col] === null && board[rotatePuyo.row + 1][rotatePuyo.col] === null) {
      return true;
    } else {
      return false;
    }
  }
}

export const bottomCheck = (board, puyo) => {
  if (puyoExist(puyo)) return true;
  const { centerPuyo, rotatePuyo } = puyo;
  const sameCol = centerPuyo.col === rotatePuyo.col;
  if (centerPuyo.row<=-1||rotatePuyo.row<=-2) return true;
  const bottomMost = centerPuyo.row > rotatePuyo.row ? centerPuyo : rotatePuyo;
  if (sameCol) {
    if (bottomMost.row < 11 && board[centerPuyo.row + 1][centerPuyo.col] === null && board[rotatePuyo.row + 1][rotatePuyo.col] === null) {
      return true;
    } else {
      return false;
    }
  } else {
    if (bottomMost.row < 11 && board[rotatePuyo.row + 1][rotatePuyo.col] === null && board[centerPuyo.row+1][centerPuyo.col]===null) {
      return true;
    } else {
      return false;
    }
  }
}
