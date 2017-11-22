import SinglePuyo from './SinglePuyo';
class DropPuyo {
    constructor() {
        this.centerPuyo = new SinglePuyo();
        this.rotatePuyo = new SinglePuyo(this.centerPuyo.col,this.centerPuyo.row-1);
        this.position = 0;
        this.positionTest = [0, 1, 2, 3];
                          // T, R, B, L
    }
}

export default DropPuyo;

// A is clockwise, B is counter-clockwise
export const rotateA = (puyo) => {
  const axis = puyo.centerPuyo;
  const satellite = puyo.rotatePuyo;
  if (axis.row > satellite.row) {
    // top to right
    puyo.rotatePuyo.col = axis.col + 1;
    puyo.rotatePuyo.row = axis.row;
    return;
  }
  else if (axis.col < satellite.col) {
    // right to bottom
    puyo.rotatePuyo.col = axis.col;
    puyo.rotatePuyo.row = axis.row + 1;
    return;
  }
  else if (axis.row < satellite.row) {
    // bottom to left
    puyo.rotatePuyo.col = axis.col - 1;
    puyo.rotatePuyo.row = axis.row;
    return;
  }
  else {
    // left to top
    puyo.rotatePuyo.col = axis.col;
    puyo.rotatePuyo.row = axis.row - 1;
    return;
  }
}

export const rotateB = (puyo) => {
  const axis = puyo.centerPuyo;
  const satellite = puyo.rotatePuyo;
  if (axis.row > satellite.row) {
    // top to left
    puyo.rotatePuyo.col = axis.col - 1;
    puyo.rotatePuyo.row = axis.row;
    return;
  }
  else if (axis.col > satellite.col) {
    // left to bottom
    puyo.rotatePuyo.col = axis.col;
    puyo.rotatePuyo.row = axis.row + 1;
    return;
  }
  else if (axis.row < satellite.row) {
    // bottom to right
    puyo.rotatePuyo.col = axis.col + 1;
    puyo.rotatePuyo.row = axis.row;
    return;
  }
  else {
    // right to top
    puyo.rotatePuyo.col = axis.col;
    puyo.rotatePuyo.row = axis.row - 1;
    return;
  }
}

export const rotateA2 = (puyo) => {
  puyo.position++;
  puyo.position = puyo.position % 4;
  switch (puyo.position) {
    case 0:
      puyo.rotatePuyo.col = puyo.centerPuyo.col;
      puyo.rotatePuyo.row = puyo.centerPuyo.row - 1;
    break;
    case 1:
      puyo.rotatePuyo.row = puyo.centerPuyo.row;
      puyo.rotatePuyo.col = puyo.centerPuyo.col + 1;
    break;
    case 2:
      puyo.rotatePuyo.row = puyo.centerPuyo.row + 1;
      puyo.rotatePuyo.col = puyo.centerPuyo.col;
    break;
    case 3:
    puyo.rotatePuyo.row = puyo.centerPuyo.row;
    puyo.rotatePuyo.col = puyo.centerPuyo.col - 1;
    break;
  }
}

export const rotateB2 = (puyo) => {
  puyo.position++;
  puyo.position = puyo.position % 4;
  switch (puyo.position) {
    case 0:
      puyo.rotatePuyo.col = puyo.centerPuyo.col - 1;
      puyo.rotatePuyo.row = puyo.centerPuyo.row;
    break;
    case 1:
      puyo.rotatePuyo.row = puyo.centerPuyo.row + 1;
      puyo.rotatePuyo.col = puyo.centerPuyo.col;
    break;
    case 2:
      puyo.rotatePuyo.row = puyo.centerPuyo.row;
      puyo.rotatePuyo.col = puyo.centerPuyo.col + 1;
    break;
    case 3:
    puyo.rotatePuyo.row = puyo.centerPuyo.row - 1;
    puyo.rotatePuyo.col = puyo.centerPuyo.col;
    break;
  }
}
