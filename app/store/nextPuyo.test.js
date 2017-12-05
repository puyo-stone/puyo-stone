import chai, {expect} from 'chai'
import nextPuyo from './nextPuyo.js'
import DoublePuyo from '../Func/DoublePuyo'

/* global describe it beforeEach */
describe('NextPuyo Reducer', () => {
  const init = new DoublePuyo()

  it('Creates a new puyo', () => {
    const newPuyoAction = {type: 'CREATE_PUYO'}
    const currentNextPuyo = nextPuyo(undefined, {type: 'test'})
    const newNextPuyo = nextPuyo(currentNextPuyo, newPuyoAction)

    expect(newNextPuyo).to.not.equal(currentNextPuyo)
  })
})
