import SinglePuyo from './SinglePuyo';
class DoublePuyo {
    constructor() {
        this.centerPuyo = new SinglePuyo();
        this.rotatePuyo = new SinglePuyo(this.centerPuyo.col,this.centerPuyo.row-1);
        this.positions = 0;
    }
}

export default DoublePuyo;


