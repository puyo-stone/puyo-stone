import chai, {expect} from 'chai'
import puyoAction, { leftMove, dropMove, rotateA } from './puyoAction.js'
import DoublePuyo from '../Func/DoublePuyo';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
/* global describe it beforeEach afterEach */

describe('Puyo Actions', () => {
  let init, store
  beforeEach(() => {
    init = new DoublePuyo();
    store = mockStore(init);
    store.replaceReducer(puyoAction);
  })

  afterEach(() => {
    store.clearActions()
  })

  it('Can get a clone of the next puyo', () => {
    const testPuyo = new DoublePuyo();
    const state = puyoAction(undefined, {type: 'GET_PUYO', puyo: testPuyo})
    expect(state).to.not.equal(testPuyo)
  })

  it('Can move the puyos left', () => {
    const testPuyo = new DoublePuyo();
    store.dispatch(leftMove(testPuyo));
    const action = store.getActions()
    expect(action[0].puyo.centerPuyo.col).to.equal(testPuyo.centerPuyo.col-1)
  })

  it('Can drop the puyos', () => {
    const testPuyo = new DoublePuyo();
    store.dispatch(dropMove(testPuyo));
    const action = store.getActions()
    expect(action[0].puyo.centerPuyo.row).to.equal(testPuyo.centerPuyo.row+1)
  })

  it('Can rotate the puyos clockwise', () => {
    const testPuyo = new DoublePuyo();
    testPuyo.centerPuyo.row += 4;
    testPuyo.rotatePuyo.row += 4;
    store.dispatch(rotateA(testPuyo));
    const action = store.getActions()
    expect(action[0].puyo.rotatePuyo.row).to.equal(testPuyo.centerPuyo.row)
    expect(action[0].puyo.rotatePuyo.col).to.equal(testPuyo.centerPuyo.col+1)
    expect(action[0].puyo.centerPuyo.row).to.equal(testPuyo.centerPuyo.row)
    expect(action[0].puyo.centerPuyo.col).to.equal(testPuyo.centerPuyo.col)
  })
})
