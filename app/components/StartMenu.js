import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Sound from 'react-sound';

class StartMenu extends Component {
  render() {
    return (
      <div className="start menu">
        <Link to="/game" className="start overlay singleplayer">
          <h1>SinglePlayer!</h1>
        </Link>
        <Link className="start overlay multiplayer">
          <h1>MultiPlayer!</h1>
          <h2>(Coming Soon!)</h2>
        </Link>
        <Link to="/settings" className="start overlay settings">
          <h1>Settings!</h1>
        </Link>
        <Link to="/tutorial" className="start overlay tutorial">
          <h1>Tutorial!</h1>
        </Link>
        <Sound url="/songs/Spirited Away.mp3" volume={this.props.sound.volume} loop={true} playStatus={Sound.status.PLAYING}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sound: state.sound
})

export default connect(mapStateToProps)(StartMenu);
