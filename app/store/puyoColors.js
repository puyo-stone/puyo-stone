const init = {
  currentPalette: ['rgba(255,179,186,1)', 'rgba(187,191,247,1)', 'rgba(255,248,179,1)', 'rgba(186,255,179,1)', 'rgba(186,225,255,1)'],
  palettes: [
    {title: 'Pale Skies', palette: ['rgba(255,227,227,1)', 'rgba(255,253,218,1)', 'rgba(224,255,220,1)', 'rgba(204,255,246,1)', 'rgba(222,221,255,1)']},
    {title: 'High Saturation', palette: ['rgba(255,47,47,1)', 'rgba(255,162,47,1)', 'rgba(255,225,47,1)', 'rgba(106,255,47,1)', 'rgba(47,255,218,1)']},
    {title: 'Sound of July', palette: ['rgba(255,251,210,1)', 'rgba(210,255,245,1)', 'rgba(255,188,180,1)', 'rgba(253,210,210,1)', 'rgba(246,225,213,1)']},
    {title: 'Lolli', palette: ['rgba(255,0,147,1)', 'rgba(255,121,198,1)', 'rgba(254,201,231,1)', 'rgba(130,140,255,1)', 'rgba(0,22,255,1)']},
    {title: 'Rainbow Pastel', palette: ['rgba(255,179,186,1)', 'rgba(187,191,247,1)', 'rgba(255,248,179,1)', 'rgba(186,255,179,1)', 'rgba(186,225,255,1)']},
    {title: 'Summer Ice Cream', palette: ['rgba(154,255,247,1)', 'rgba(162,255,89,1)', 'rgba(253,255,70,1)', 'rgba(255,159,159,1)', 'rgba(161,105,58,1)']},
    {title: 'Yellow into the Blues', palette: ['rgba(214,132,110,1)', 'rgba(255,238,176,1)', 'rgba(150,207,185,1)', 'rgba(110,192,214,1)', 'rgba(83,127,187,1)']},
  ]
};

const SET_COLORS = 'SET_COLORS';

export const setColors = (paletteId) => ({
  type: SET_COLORS,
  paletteId
});

export default function(state = init, action) {
  switch (action.type) {
  case SET_COLORS:
    const palette = state.palettes[action.paletteId].palette;
    return Object.assign({}, state, {currentPalette: palette});
  default:
    return state;
  }
};
