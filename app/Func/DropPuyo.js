import SinglePuyo from './SinglePuyo';
class DropPuyo {
    constructor() {
        this.centerPuyo = new SinglePuyo();
        this.rotatePuyo = new SinglePuyo(this.centerPuyo.col,this.centerPuyo.row-1);
    } 
}  

export default DropPuyo;
