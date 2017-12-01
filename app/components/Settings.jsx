import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { palettes } from '../Func/SinglePuyo';
import SongSelector from './SongSelector';
import ColorSelector from './ColorSelector';
import TimerSelector from './TimerSelector';

class Settings extends Component {
  render() {
    return (
      <div id="tutorial">
        <h1>Settings</h1>
        <SongSelector />
        <ColorSelector />
        <TimerSelector />
        <Link to="/"><button type="button" className="btn btn-default">Back to Home Page</button></Link>
      </div>
    )
  }
}

export default Settings;
