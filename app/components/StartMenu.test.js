import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow, render} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import Sound from 'react-sound';

import {StartMenu} from './StartMenu'

/* global describe it beforeEach */

describe('<StartMenu/>', () => {
  let root
  beforeEach(() => {
    root = shallow(<StartMenu sound={{volume: 30}}/>)
  })

  it('has 4 panels with links', () => {
    expect(root.find('Link').length).to.be.equal(4)
  })

  it('it renders the <Sound/> component', () => {
    expect(root.find(Sound)).to.exist
  })

  it('Sound component is rendered with the appropriate volume', () => {
    const SoundComponent = root.find(Sound)
    expect(SoundComponent.props().volume).to.be.lessThan(35)
  })
})
