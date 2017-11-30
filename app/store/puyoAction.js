import DoublePuyo from '../Func/DoublePuyo';
import { rotateAFunc, rotateBFunc } from '../Func/rotatePuyo';
import _ from 'lodash';

const ACTION_CENTER = 'ACTION_CENTER';
const CLEAR_PUYO = 'CLEAR_PUYO';
const GET_PUYO = 'GET_PUYO';
const RESTART = 'RESTART';

const init = new DoublePuyo();

export const clearPuyoAction = () => ({
  type: CLEAR_PUYO
});

export const ActionCenter = (puyo) => ({
  type: ACTION_CENTER,
  puyo
});

export const getPuyo = (puyo) => ({
  type: GET_PUYO,
  puyo
});

export const restartPuyo = () => ({
  type: RESTART
});

export function leftMove(puyo) {
  return function(dispatch) {
    const newPuyo = _.cloneDeep(puyo);
    newPuyo.centerPuyo.col = puyo.centerPuyo.col - 1;
    newPuyo.rotatePuyo.col = puyo.rotatePuyo.col - 1;
    dispatch(ActionCenter(newPuyo));
  };
};

export function rightMove(puyo) {
  return function(dispatch) {
    const newPuyo = _.cloneDeep(puyo);
    newPuyo.centerPuyo.col = puyo.centerPuyo.col + 1;
    newPuyo.rotatePuyo.col = puyo.rotatePuyo.col + 1;
    dispatch(ActionCenter(newPuyo));
  };
};

export function rotateA(puyo) {
  return function(dispatch) {
    const newPuyo = _.cloneDeep(puyo);
    rotateAFunc(newPuyo);
    dispatch(ActionCenter(newPuyo));
  };
};

export function rotateB(puyo) {
  return function(dispatch) {
    const newPuyo = _.cloneDeep(puyo);
    rotateBFunc(newPuyo);
    dispatch(ActionCenter(newPuyo));
  };
};

export function dropMove(puyo) {
  return function(dispatch) {
    const newPuyo = _.cloneDeep(puyo);
    newPuyo.centerPuyo.row = puyo.centerPuyo.row + 1;
    newPuyo.rotatePuyo.row = puyo.rotatePuyo.row + 1;
    dispatch(ActionCenter(newPuyo));
  };
};

export default function(state = init, action) {
  switch (action.type) {
  case ACTION_CENTER:
    return action.puyo;
  case GET_PUYO:
    return _.cloneDeep(action.puyo);
  case CLEAR_PUYO:
    return {};
  case RESTART:
    return new DoublePuyo();
  default:
    return state;
  }
};
