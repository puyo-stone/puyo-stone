// codeship build dummy test

const { expect } = require('chai')
import { testFunc } from './dummy-test'

describe('test function', () => {
    let test1 = true
    let test2 = false
    it('returns true if input is truthy', () => {
      expect(testFunc(test1)).to.be(true)
    })

    it('returns false if input is falsy', () => {
      expect(testFunc(test2)).to.be(false)
    })
})
