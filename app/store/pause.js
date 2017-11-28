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
    return true;
  case INACTIVE:
    return false;
  default:
    return state;
  }
}
