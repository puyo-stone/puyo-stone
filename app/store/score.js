// score reducer
// score must be reset to zero at end of a game

/*
simple score formula
let puyoCount = p
let chainCount = c
let score = (10 * p) * c
*/

const initialState = 0;

const UPDATE_SCORE = 'UPDATE_SCORE';

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score: score
})

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_SCORE:
      state += action.score;
      return state;
    default:
      return state;
  }
}
