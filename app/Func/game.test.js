import { puyoRepeatRemoval, SearchBoard, removePuyo, reArrange, deepCopy } from './game';
import { expect } from 'chai';
import { describe, before, it, beforeEach } from 'mocha';
import _ from 'lodash';
import SinglePuyo from './SinglePuyo';

function clonePuyo(puyo, x, y, color) {
  const newPuyo = _.cloneDeep(puyo);
  newPuyo.col = y;
  newPuyo.row = x;
  newPuyo.color = color;
  return newPuyo;
}

describe('game.js file', () => {
  let board;
  let firstPuyo;
  let secondPuyo;
  let emptyFunc;
  let remainPuyo;
  beforeEach(() => {
    firstPuyo= new SinglePuyo();
    secondPuyo=new SinglePuyo();
    while (firstPuyo.color===secondPuyo.color) {
      secondPuyo = new SinglePuyo();
    }
    emptyFunc=() => {};
    remainPuyo=[];
    board = [
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, clonePuyo(secondPuyo, 8, 2, secondPuyo.color), clonePuyo(firstPuyo, 8, 3, firstPuyo.color), null, null],
            [null, null, clonePuyo(secondPuyo, 9, 2, secondPuyo.color), clonePuyo(secondPuyo, 9, 3, secondPuyo.color), null, null],
            [null, null, clonePuyo(firstPuyo, 10, 2, firstPuyo.color), clonePuyo(secondPuyo, 10, 3, secondPuyo.color), null, null],
            [null, null, clonePuyo(firstPuyo, 11, 2, firstPuyo.color), clonePuyo(firstPuyo, 11, 3, firstPuyo.color), null, null]]
  })

  describe('SearchBoard function', () => {
    it('return the array of 4 or more puyo with the same color', () => {
      const arrayOfPuyo = SearchBoard(board);
      expect(arrayOfPuyo.length).to.equal(4);
    })
  })

  describe('removePuyo function', () => {
    let firstRemoveBoard;
    it('return the board with 4 a set of 4 puyo', () => {
      const arrayOfPuyo=SearchBoard(board);
      firstRemoveBoard=removePuyo(board, arrayOfPuyo);
      for (let i=0; i<firstRemoveBoard.length; i++) {
        for (let j=0; j<firstRemoveBoard[i].length; j++) {
          if (firstRemoveBoard[i][j]) {
            remainPuyo.push(firstRemoveBoard[i][j]);
          }
        }
      }
      expect(remainPuyo.length).to.equal(4);
      expect(firstRemoveBoard[9][2]).to.not.exist;
      expect(firstRemoveBoard[8][3]).to.deep.equal(board[8][3])
    })
  })

  describe('puyoRepeatRemoval function', () => {
    it('repeat remove the puyo and rearrange the board until no more chain find', () => {
      const afterPuyoRemoveBoard=puyoRepeatRemoval(board, emptyFunc, emptyFunc, emptyFunc, emptyFunc);
      for (let i=0; i<afterPuyoRemoveBoard.length; i++) {
        for (let j=0; j<afterPuyoRemoveBoard[i].length; j++) {
          if (afterPuyoRemoveBoard[i][j]) {
            remainPuyo.push(afterPuyoRemoveBoard[i][j]);
          }
        }
      }
      expect(remainPuyo.length).to.equal(0);
    })
  })

  describe('rearrange function', () => {
    let arrayOfPuyo;
    let firstRemoveBoard;
    beforeEach(() => {
      arrayOfPuyo=SearchBoard(board);
      firstRemoveBoard=removePuyo(board, arrayOfPuyo);
    })

    it('rearrange the board with the remaining puyo', () => {
      const rearrangeBoard = reArrange(firstRemoveBoard);
      expect(rearrangeBoard[10][3].color).to.equal(firstPuyo.color);
    })
  })

  describe('deepCopy function', () => {
    it('return false checking equal or not', () => {
      const copyBoard = deepCopy(board);
      expect(copyBoard).to.not.equal(board);
      expect(copyBoard[11][3]).to.not.equal(board[11][3]);
    })

    it('return true to checking deep equal', () => {
      const copyBoard= deepCopy(board);
      expect(copyBoard).to.deep.equal(board);
      expect(copyBoard[11][3]).to.deep.equal(board[11][3]);
      expect(copyBoard[11][3]).to.not.equal(board[11][3]);
    })
  })
})
