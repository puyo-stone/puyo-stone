// settings
// choose palette
// set bgm
// change controls; optional

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { palettes } from '../Func/SinglePuyo';

class Settings extends Component {
  componentDidMount() {
  }

  render() {
    console.log(palettes);
    return (
      <div id="tutorial">
        <h1>setting test</h1>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  puyo: state.puyo,
  board: state.board,
  score: state.score,
  nextPuyo: state.nextPuyo,
  puyoColors: state.puyoColors,
  timer: state.timer,
  pause: state.pause
})

export default connect(mapStateToProps)(Settings);
