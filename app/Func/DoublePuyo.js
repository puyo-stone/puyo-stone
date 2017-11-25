import SinglePuyo from './SinglePuyo';
class DoublePuyo {
    constructor() {
        this.centerPuyo = new SinglePuyo();
        this.rotatePuyo = new SinglePuyo(this.centerPuyo.col,this.centerPuyo.row-1);
        this.positions = [true, false, false, false];
    }
}

export default DoublePuyo;


