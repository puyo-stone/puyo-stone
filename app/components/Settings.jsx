// settings
// change controls; optional

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { palettes } from '../Func/SinglePuyo';
import SongSelector from './SongSelector';
import ColorSelector from './ColorSelector';

class Settings extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div id="tutorial">
        <h1>Settings</h1>
        <SongSelector />
        <ColorSelector />
        <Link to="/game"><button type="button" className="btn btn-default">Back to SingleGame</button></Link>
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
