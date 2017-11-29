import songs from '../../public/songMenu.js';

const initState = {
  currentSong: songs[3],
  volume: 50,
  loop: true,
  songs: songs
};

const SELECT_SONG = 'SELECT_SONG';
const CHANGE_VOLUME = 'CHANGE_VOLUME';

export const selectSong = songId => ({ type: SELECT_SONG, songId });
export const changeVolume = volume => ({ type: CHANGE_VOLUME, volume });

export default function(state = initState, action) {
  switch (action.type) {
  case SELECT_SONG:
    const song = state.songs[action.songId];
    return Object.assign({}, state, {currentSong: song});

  case CHANGE_VOLUME:
    return Object.assign({}, state, {volume: action.volume});

  default:
    return state;
  }
}
