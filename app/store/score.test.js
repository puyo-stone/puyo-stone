import chai, {expect} from 'chai'
import score from './score.js'

/* global describe it beforeEach */
describe('Score Reducer', () => {
  let initialState

  beforeEach(() => {
    initialState = 0;
  })

  it('updates the score', () => {
    const scoreAction = ({type: 'UPDATE_SCORE', score: 100})
    expect(score(undefined, scoreAction)).to.be.equal(100)
  })

  it('resets the score', () => {
    const updateScoreAction = ({type: 'UPDATE_SCORE', score: 100})
    const resetScoreAction = ({type: 'RESET_SCORE'})
    const newScore = score(undefined, updateScoreAction)

    expect(score(newScore, resetScoreAction)).to.be.equal(0)
    expect(score(newScore, resetScoreAction)).to.not.be.equal(100)
  })
})
