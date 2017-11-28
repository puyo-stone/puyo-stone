const initialState = false;

const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';

export const pauseOn = () => ({
  type: ACTIVE
})

export const pauseOff = () => ({
  type: INACTIVE
})

export default function(state = initialState, action) {
  switch (action.type) {
  case ACTIVE:
    state = true;
    return state;
  case INACTIVE:
    state = false;
    return state;
  default:
    return state;
  }
}
