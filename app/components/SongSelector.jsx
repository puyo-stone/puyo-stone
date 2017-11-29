import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../store/';

class SongSelector extends Component {
  constructor() {
    super();
    this.handleSongChange = this.handleSongChange.bind(this);
  }

  render() {
    return (
      <label>
        Game Background Music:{' '}
        <select onChange={this.handleSongChange}>
          <option />
          {
						this.props.sound.songs.map((song, id) => (
							<option key={id} value={id}>
								{song.title}
							</option>
						))
					}
        </select>
      </label>
    );
  }

  handleSongChange(ev) {
    ev.preventDefault();
    console.log('handling')
    this.props.changeSong(ev.target.value);
  }
}

const mapStateToProps = state => ({
  sound: state.sound
});

const mapDispatchToProps = (dispatch) => ({
  changeSong(songId) {
    console.log('dispatching, songId', songId)
    dispatch(selectSong(songId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
