import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Sound from 'react-sound';
require('bootstrap');

class BGM extends Component {
  constructor() {
    super();
    this.state = {
      play: true,
      status: Sound.status.PLAYING
    }
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  handlePause(e) {
    e.preventDefault();
    this.setState({
      play: false,
      status: Sound.status.PAUSED
    });
  }

  handleResume(e) {
    e.preventDefault();
    this.setState({
      play: true,
      status: Sound.status.PLAYING
    });
  }

  render() {
    const play = this.state.play;
    return (
        <div>
            {
                play ?
                    <button type="button" class="btn btn-default" onClick={this.handlePause}>
                        <span class="glyphicon glyphicon-music" aria-hidden="true"></span>
                    </button>
                : <button type="button" class="btn btn-default" onClick={this.handleResume}>
                        <span class="glyphicon glyphicon-volume-off" aria-hidden="true"></span>
                    </button>
            }
            {
                this.props.sound.currentSong && <Sound
                                                    url={this.props.sound.currentSong.url}
                                                    volume={this.props.sound.volume}
                                                    playStatus={this.state.status}
                                                    />
            }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  sound: state.sound
})

export default connect(mapStateToProps)(BGM);
