import songs from '../../public/songs.js';

const initState = {
  currentSong: songs[0],
  volume: 50,
  loop: true
};

const SELECT_SONG = 'SELECT_SONG';
const CHANGE_VOLUME = 'CHANGE_VOLUME';

export const selectSong = song => ({ type: SELECT_SONG, song });
export const changeVolume = volume => ({ type: CHANGE_VOLUME, volume });

export const chooseSong = song => dispatch => {
  dispatch(selectSong(song));
}

export default function(state = initState, action) {
  switch (action.type) {
  case SELECT_SONG:
    return Object.assign({}, state, {currentSong: action.song});

  case CHANGE_VOLUME:
    return Object.assign({}, state, {volume: action.volume});

  default:
    return state;
  }
}
