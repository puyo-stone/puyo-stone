// codeship build dummy test

const { expect } = require('chai')
const { test } = require('./dummy-test')

describe('test function', () => {
    let test1 = true
    let test2 = false
    it('returns true if input is truthy', () => {
    	console.log(test)
      expect(test(test1)).to.equal('input is true')
    })

    it('returns false if input is falsy', () => {
      expect(test(test2)).to.equal('input is false')
    })
})
