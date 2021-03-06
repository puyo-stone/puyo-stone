const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const SET = 'SET';
const STOP = 'STOP';
const init = 200;
const GAIN = 'GAIN';

const decrement = () => ({
  type: DECREMENT
});

const reset = () => ({
  type: RESET
});

export const setTimer = duration => ({
  type: SET,
  duration
});

const stopTime =() => ({
  type: STOP
});

export const timeGain = (time) => ({
  type: GAIN,
  time
});

let timer = null;

export const start = () => (dispatch) => {
  timer= setInterval(() => dispatch(decrement()), 1000);
};

export const stop =() => {
  clearInterval(timer);
};

export const resetTimer=() => (dispatch) => {
  dispatch(reset());
};

export default function(state = init, action) {
  switch (action.type) {
  case DECREMENT:
    return state - 1;
  case RESET:
    return init;
  case SET:
    return action.duration;
  case GAIN:
    return state + action.time;
  default:
    return state;
  }
};
