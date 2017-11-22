import SinglePuyo from './SinglePuyo';
class DropPuyo {
    constructor() {
        this.centerPuyo = new SinglePuyo();
        this.rotatePuyo = new SinglePuyo(this.centerPuyo.col,this.centerPuyo.row-1);
        this.position = 0;
    }
}

export default DropPuyo;

export const rotate = (puyo) => {
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
