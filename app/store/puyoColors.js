// const init = ['rgba(255,227,227,1)', 'rgba(255,253,218,1)', 'rgba(224,255,220,1)', 'rgba(204,255,246,1)', 'rgba(222,221,255,1)'];
const init = ['rgba(255,0,0,1)', 'rgba(255, 255, 0,1)', 'rgba(0, 255, 0,1)', 'rgba(0, 0, 255,1)', 'rgba(148, 0, 211,1)']
const SET_COLORS = 'SET_COLORS';

export const setColorS = (colors) => ({
  type: SET_COLORS,
  colors
})

export default function(state = init, action) {
  switch (action.type) {
  case SET_COLORS:
    return action.colors
  default:
    return state
  }
}
