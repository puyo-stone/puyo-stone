import _ from 'lodash';

export const split = (board, puyo) => {
    const newBoard = _.cloneDeep(board);
    const { centerPuyo, rotatePuyo } = puyo;
    const sameCol = centerPuyo.col === rotatePuyo.col;
    const sameRow = centerPuyo.row === rotatePuyo.row;
    if (sameCol) {
        board[centerPuyo.row][centerPuyo.col] = centerPuyo;
        board[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
        return { board, center: centerPuyo, rotate: rotatePuyo };
    }
    if (sameRow) {
        if (centerPuyo.row === 11 && rotatePuyo.row === 11) {
            board[centerPuyo.row][centerPuyo.col] = centerPuyo;
            board[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
            return { board, center: centerPuyo, rotate: rotatePuyo };
        }
        
        if(board[centerPuyo.row+1][centerPuyo.col] && board[rotatePuyo.row+1][rotatePuyo.col]){
             board[centerPuyo.row][centerPuyo.col] = centerPuyo;
             board[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
             return { board , center: centerPuyo, rotate: rotatePuyo};
        }

        if (board[centerPuyo.row + 1][centerPuyo.col] && board[rotatePuyo.row + 1][rotatePuyo.col] === null) {
            board[centerPuyo.row][centerPuyo.col] = centerPuyo;
            const newPuyo = _.cloneDeep(rotatePuyo);
            for (let i = 11; i > rotatePuyo.row; i--) {
                if (board[i][rotatePuyo.col] === null) {
                    newPuyo.row = i;
                    board[i][rotatePuyo.col] = newPuyo;
                    return { board, center: centerPuyo, rotate: newPuyo };
                }
            }
        }
        if (board[rotatePuyo.row + 1][rotatePuyo.col] && board[centerPuyo.row + 1][centerPuyo.col] === null) {
            board[rotatePuyo.row][rotatePuyo.col] = rotatePuyo;
            const newPuyo = _.cloneDeep(centerPuyo);
            for (let i = 11; i > centerPuyo.row; i--) {
                if (board[i][centerPuyo.col] === null) {
                    newPuyo.row = i;
                    board[i][centerPuyo.col] = newPuyo;
                    return { board, center: centerPuyo, rotate: rotatePuyo };
                }
            }
        }
    }
}