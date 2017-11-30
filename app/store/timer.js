const DECREMENT='DECREMENT';
const RESET='RESET';
const SET = 'SET';
const STOP='STOP';
const init = 200;

const decrement = () => ({
  type: DECREMENT
})

const reset = () => ({
  type: RESET
})

export const setTimer = duration => ({
  type: SET,
  duration
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

export default function(state = init, action) {
  switch (action.type) {
  case DECREMENT:
    return state - 1;
  case RESET:
    return init;
  case SET:
    return action.duration;
  default:
    return state;
  }
}

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

export default function(state = 99, action) {
	switch (action.type) {
		case DECREMENT:
			return state - 1;
		case RESET:
			return 99;
		default:
			return state;
	}
}