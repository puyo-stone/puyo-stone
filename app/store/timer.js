const DECREMENT='DECREMENT';
const RESET='RESET';

const decrement = () => ({
  type: DECREMENT
})

const reset = () => ({
  type: RESET
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

export default function(state = 120, action) {
  switch (action.type) {
  case DECREMENT:
    return state - 1;
  case RESET:
    return 120;
  default:
    return state;
  }
}
