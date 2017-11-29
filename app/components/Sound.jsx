import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';

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
                    <button type="button" className="btn btn-default" onClick={this.handlePause}>
                        <span className="glyphicon glyphicon-music" aria-hidden="true"></span>
                    </button>
                : <button type="button" className="btn btn-default" onClick={this.handleResume}>
                        <span className="glyphicon glyphicon-volume-off" aria-hidden="true"></span>
                    </button>
            }
            {
                this.props.sound.currentSong && <Sound
                                                    url={this.props.songUrl}
                                                    volume={this.props.sound.volume}
                                                    playStatus={this.state.status}
                                                    loop={this.props.sound.loop}
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
