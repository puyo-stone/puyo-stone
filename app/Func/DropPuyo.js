import SinglePuyo from './SinglePuyo';
class DropPuyo {
    constructor() {
        this.centerPuyo = new SinglePuyo();
        this.rotatePuyo = new SinglePuyo(this.centerPuyo.col,this.centerPuyo.row-1);
        this.positions = [true, false, false, false];
    }
}

export default DropPuyo;

// A is clockwise, B is counter-clockwise
export const rotateAFunc = (puyo) => {
  const axis = puyo.centerPuyo;
  const satellite = puyo.rotatePuyo;
  let index = puyo.positions.indexOf(true);
  let temp = index;
  if (index === 3) { index = 0 }
  else { index = index + 1 }
  puyo.positions[temp] = false;
  puyo.positions[index] = true;
  switch (index) {
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
  const axis = puyo.centerPuyo;
  const satellite = puyo.rotatePuyo;
  let index = puyo.positions.indexOf(true);
  let temp = index;
  if (index === 0) { index = 3 }
  else { index = index - 1 }
  puyo.positions[temp] = false;
  puyo.positions[index] = true;
  switch (index) {
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
