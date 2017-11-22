import DropPuyo, { rotateA, rotateB } from '../Func/DropPuyo';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const CREATE_PUYO = 'CREATE_PUYO';
const ROTATE_PUYO_A = 'ROTATE_PUYO_A';
const ROTATE_PUYO_B = 'ROTATE_PUYO_B';
const DROP = 'DROP';

const init = new DropPuyo();

const createPuyoAction = () => ({
    type : CREATE_PUYO
})

export const moveLeftAction = () =>({
    type: MOVE_LEFT
});

export const moveRightAction = () =>({
    type: MOVE_RIGHT
})

export const rotateActionA = () => ({
  type: ROTATE_PUYO_A
})

export const rotateActionB = () => ({
  type: ROTATE_PUYO_B
})

export const dropAction = () => ({
  type: DROP
})

export default function (state = init,action){
    const newState = Object.assign({},state);
    switch(action.type){
        case MOVE_LEFT:
            --newState.centerPuyo.col;
            --newState.rotatePuyo.col;
            return newState;
        case MOVE_RIGHT:
            ++newState.centerPuyo.col;
            ++newState.rotatePuyo.col;
            return newState;
        case ROTATE_PUYO_A:
            rotateA(newState);
            return newState;
        case ROTATE_PUYO_B:
            rotateB(newState);
            return newState;
        case DROP:
            ++newState.centerPuyo.row;
            ++newState.rotatePuyo.row;
            return newState;
        case CREATE_PUYO:
            return new DropPuyo();

        default:
            return state;
    }
}
