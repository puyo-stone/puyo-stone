import DropPuyo, { rotateAFunc, rotateBFunc } from '../Func/DropPuyo';
import _ from 'lodash';
const CREATE_PUYO = 'CREATE_PUYO';
const ACTION_CENTER = 'ACTION_CENTER';

const init = new DropPuyo();

const createPuyoAction = () => ({
    type: CREATE_PUYO
})

export const ActionCenter = (puyo) => ({
    type: ACTION_CENTER,
    puyo
})

export function leftMove(puyo) {
    return function (dispatch) {
        const newPuyo = _.cloneDeep(puyo);
        newPuyo.centerPuyo.col=puyo.centerPuyo.col-1;
        newPuyo.rotatePuyo.col=puyo.rotatePuyo.col-1;
        dispatch(ActionCenter(newPuyo));
    };
}

export function rightMove(puyo) {
    return function (dispatch) {
        const newPuyo = _.cloneDeep(puyo);
        newPuyo.centerPuyo.col=puyo.centerPuyo.col+1;
        newPuyo.rotatePuyo.col=puyo.rotatePuyo.col+1;
        dispatch(ActionCenter(newPuyo));
    };
}

export function rotateA(puyo) {
    return function (dispatch) {
        const newPuyo = _.cloneDeep(puyo);
        rotateAFunc(newPuyo);
        dispatch(ActionCenter(newPuyo));
    }
}

export function rotateB(puyo) {
    return function (dispatch) {
        const newPuyo = _.cloneDeep(puyo);
        rotateBFunc(newPuyo);
        dispatch(ActionCenter(newPuyo));
    }
}

export function dropMove(puyo) {
    return function (dispatch) {
        const newPuyo = _.cloneDeep(puyo);
        newPuyo.centerPuyo.row=puyo.centerPuyo.row+1;
        newPuyo.rotatePuyo.row=puyo.rotatePuyo.row+1;
        dispatch(ActionCenter(newPuyo));
    };
}

export default function (state = init, action) {
    switch (action.type) {
        case CREATE_PUYO:
            return new DropPuyo();
        case ACTION_CENTER:
            return action.puyo;
        default:
            return state;
    }
}
