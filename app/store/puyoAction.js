import DropPuyo, { rotate } from '../Func/DropPuyo';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const CREATE_PUYO = 'CREATE_PUYO';
const ROTATE_PUYO = 'ROTATE_PUYO';
const DROP = 'DROP';
const ACTION_CENTER = 'ACTION_CENTER';



const init = new DropPuyo();

const createPuyoAction = () => ({
    type: CREATE_PUYO
})


export const moveLeftAction = () => ({
    type: MOVE_LEFT
});

export const moveRightAction = () => ({
    type: MOVE_RIGHT
})

export const rotateAction = () => ({
    type: ROTATE_PUYO
})

export const dropAction = () => ({
    type: DROP
})

export const ActionCenter = (puyo) => ({
    type: ACTION_CENTER,
    puyo
})

export function leftMove(puyo) {
    return function (dispatch) {
        const newPuyo = JSON.parse(JSON.stringify(puyo));
        newPuyo.centerPuyo.col=puyo.centerPuyo.col-1;
        newPuyo.rotatePuyo.col=puyo.rotatePuyo.col-1;
        dispatch(ActionCenter(newPuyo));
        return;
    };
}

export function rightMove(puyo){
    return function (dispatch) {
        const newPuyo = JSON.parse(JSON.stringify(puyo));
        newPuyo.centerPuyo.col=puyo.centerPuyo.col+1;
        newPuyo.rotatePuyo.col=puyo.rotatePuyo.col+1;
        dispatch(ActionCenter(newPuyo));
        return;
    };
}

export default function (state = init, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // case MOVE_LEFT:
        //     --newState.centerPuyo.col;
        //     --newState.rotatePuyo.col;
        //     console.log('!!!new', newState);
        //     return newState;
        // case MOVE_RIGHT:
        //     ++newState.centerPuyo.col;
        //     ++newState.rotatePuyo.col;
        //     return newState;
        case ROTATE_PUYO:
            rotate(newState);
            return newState;
        case DROP:
            ++newState.centerPuyo.row;
            ++newState.rotatePuyo.row;
            return newState;
        case CREATE_PUYO:
            return new DropPuyo();
        case ACTION_CENTER:
            return action.puyo;
        default:
            return state;
    }
}
