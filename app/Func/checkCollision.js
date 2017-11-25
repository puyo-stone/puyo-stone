export const leftCheck = (board, puyo) => {
    const { centerPuyo, rotatePuyo } = puyo;
    const leftMostPuyo = centerPuyo.col < rotatePuyo.col ? centerPuyo : rotatePuyo;
    const sameCol = centerPuyo.col === rotatePuyo.col;
    if (sameCol) {
        if (centerPuyo.col > 0 && board[centerPuyo.row][centerPuyo.col - 1] === null && board[rotatePuyo.row][rotatePuyo.col - 1] === null) {
            return true;
        }
    }
    if (leftMostPuyo.col > 0) {
        if (board[leftMostPuyo.row][leftMostPuyo.col - 1] === null) {
            return true;
        }
    }
    return false;
}

export const rightCheck = (board, puyo) => {
    const { centerPuyo, rotatePuyo } = puyo;
    const rightMostPuyo = centerPuyo.col > rotatePuyo.col ? centerPuyo : rotatePuyo;
    const sameCol = centerPuyo.col === rotatePuyo.col;
    if (sameCol) {
        if (centerPuyo.col < 5 && board[centerPuyo.row][centerPuyo.col + 1] === null && board[rotatePuyo.row][rotatePuyo.col + 1]) {
            return true;
        }
    }
    if (rightMostPuyo.col < 6) {
        if (board[rightMostPuyo.row][rightMostPuyo.col + 1] === null) {
            return true;
        }
    }

    return false;
}

export const rotateACheck = (board, puyo) => {
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
    const { centerPuyo, rotatePuyo } = puyo;
    const sameCol = centerPuyo.col === rotatePuyo.col;
    const bottomMost = centerPuyo.row > rotatePuyo.row ? centerPuyo : rotatePuyo;
    if (sameCol) {
        if (bottomMost.row < 11 && board[centerPuyo.row + 1][centerPuyo.col] === null && board[rotatePuyo.row + 1][rotatePuyo.col] === null) {
            return true;
        } else {
            return false;
        }
    } else {
        if (bottomMost.row < 11 && board[bottomMost.row + 1][bottomMost.col] === null) {
            return true;
        } else {
            return false;
        }
    }
}
