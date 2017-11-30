const DECREMENT='DECREMENT';
const RESET='RESET';
const STOP='STOP';

const decrement = () => ({
  type: DECREMENT
})

const reset = () => ({
  type: RESET
})

const stopTime =() => ({
  type: STOP
})

let timer = null;

export const start = () => (dispatch) => {
  timer= setInterval(() => dispatch(decrement()), 1000);
}

export const stop =() => {
  clearInterval(timer);
}

export const resetTimer=() => (dispatch) => {
  dispatch(reset());
}

export default function(state = 200, action) {
  switch (action.type) {
  case DECREMENT:
    return state - 1;
  case RESET:
    return 200;
  default:
    return state;
  }
}
