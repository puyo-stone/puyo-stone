const init = {
  currentPalette: ['rgba(255,227,227,1)', 'rgba(255,253,218,1)', 'rgba(224,255,220,1)', 'rgba(204,255,246,1)', 'rgba(222,221,255,1)'],
  palettes: [
    {title: 'Pale Skies', palette: ['rgba(255,227,227,1)', 'rgba(255,253,218,1)', 'rgba(224,255,220,1)', 'rgba(204,255,246,1)', 'rgba(222,221,255,1)']},
    {title: 'High Saturation', palette: ['rgba(255,0,0,1)', 'rgba(255, 255, 0,1)', 'rgba(0, 255, 0,1)', 'rgba(0, 0, 255,1)', 'rgba(148, 0, 211,1)']},
    {title: 'Sound of July', palette: ['rgba(255,251,210,1)', 'rgba(210,255,245,1)', 'rgba(255,188,180,1)', 'rgba(253,210,210,1)', 'rgba(246,225,213,1)']},
    {title: 'Lolli', palette: ['rgba(255,0,147,1)', 'rgba(255,121,198,1)', 'rgba(254,201,231,1)', 'rgba(130,140,255,1)', 'rgba(0,22,255,1)']},
    {title: 'Thunder and Rain', palette: ['rgba(111,105,105,1)', 'rgba(146,140,140,1)', 'rgba(186,177,177,1)', 'rgba(193,215,216,1)', 'rgba(180,236,220,1)']},
  ]
}
const SET_COLORS = 'SET_COLORS';

export const setColors = (paletteId) => ({
  type: SET_COLORS,
  paletteId
})

export default function(state = init, action) {
  switch (action.type) {
  case SET_COLORS:
    const palette = state.palettes[action.paletteId].palette;
    return Object.assign({}, state, {currentPalette: palette});
  default:
    return state
  }
}
