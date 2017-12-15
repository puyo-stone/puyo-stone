import chai, {expect} from 'chai'
import pause from './pause.js'

/* global describe it beforeEach */

describe('Pause Reducer', () => {
  let initialState
  beforeEach(() => {
    initialState = false
  })

  it('Is paused', () => {
    const pauseAction = ({type: 'ACTIVE'})
    expect(pause(undefined, pauseAction)).to.be.equal(true)
  })

  it('Can unpause', () => {
    const pauseAction = ({type: 'ACTIVE'})
    const unpauseAction = ({type: 'INACTIVE'})
    const state = pause(undefined, pauseAction)

    expect(pause(state, unpauseAction)).to.be.equal(false)
  })
})
