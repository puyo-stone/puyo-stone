// A is clockwise, B is counter-clockwise
export const rotateAFunc = (puyo) => {
  puyo.positions++;
  puyo.positions = puyo.positions % 4;
  switch (puyo.positions) {
  case 0:
      // from left to top
    puyo.rotatePuyo.col = puyo.centerPuyo.col;
    puyo.rotatePuyo.row = puyo.centerPuyo.row - 1;
    break;
  case 1:
      // from top to right
    puyo.rotatePuyo.row = puyo.centerPuyo.row;
    puyo.rotatePuyo.col = puyo.centerPuyo.col + 1;
    break;
  case 2:
      // right to bottom
    puyo.rotatePuyo.row = puyo.centerPuyo.row + 1;
    puyo.rotatePuyo.col = puyo.centerPuyo.col;
    break;
  case 3:
      // bottom to left
    puyo.rotatePuyo.row = puyo.centerPuyo.row;
    puyo.rotatePuyo.col = puyo.centerPuyo.col - 1;
    break;
  }
}

export const rotateBFunc = (puyo) => {
  puyo.positions--;
  puyo.positions = (puyo.positions+4) % 4;
  switch (puyo.positions) {
  case 0:
      // from right to top
    puyo.rotatePuyo.col = puyo.centerPuyo.col;
    puyo.rotatePuyo.row = puyo.centerPuyo.row - 1;
    break;
  case 1:
      // from bottom to right
    puyo.rotatePuyo.row = puyo.centerPuyo.row;
    puyo.rotatePuyo.col = puyo.centerPuyo.col + 1;
    break;
  case 2:
      // from left to bottom
    puyo.rotatePuyo.row = puyo.centerPuyo.row + 1;
    puyo.rotatePuyo.col = puyo.centerPuyo.col;
    break;
  case 3:
      // from top to left
    puyo.rotatePuyo.row = puyo.centerPuyo.row;
    puyo.rotatePuyo.col = puyo.centerPuyo.col - 1;
    break;
  }
}
