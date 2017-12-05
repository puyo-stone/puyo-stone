import chai, {expect} from 'chai'
import board, {insertPuyo, removePuyoFromBoard, reArrangeBoard} from './board.js'
import {createNewGrid} from '../Func/game'

/* global describe it beforeEach */
describe('Board Reducer', () => {
  describe('Creating the board', () => {
    it('The initial board has the right dimensions', () => {
      const iniState = createNewGrid();
      expect(board(undefined, {type: 'test'}).length).to.be.equal(12);
      expect(board(undefined, {type: 'test'})[0].length).to.be.equal(6);
    })
  })
})
