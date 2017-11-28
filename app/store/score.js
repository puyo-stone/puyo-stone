const initialState = 0;

const UPDATE_SCORE = 'UPDATE_SCORE';
const RESET_SCORE = 'RESET_SCORE';

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score: score
});

export const resetScore = () => ({
  type: RESET_SCORE
})

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_SCORE:
      return state + action.score;
    case RESET_SCORE:
      return 0;
    default:
      return state;
  }
};
