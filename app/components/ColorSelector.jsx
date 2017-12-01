import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setColors } from '../store/';

class ColorSelector extends Component {
  constructor() {
    super();
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  render() {
    const squreSize = 50;
    const barH = squreSize;
    const barW = squreSize*5;
    return (
      <div>
      <label>
        Game Color Scheme:{' '}
        <select onChange={this.handleColorChange}>
            <option />
            {
                this.props.colors.palettes.map((palette, id) => (
                    <option key={id} value={id}>
                        {palette.title}
                    </option>
                ))
            }
        </select>
      </label>
      <svg height={`${barH}`} width={`${barW}`}>
            {
              this.props.colors.currentPalette.map((c, i) => (
                <rect key={i} height={squreSize} width={squreSize} x={i*squreSize} y={0} fill={c} />
              ))
            }
      </svg>
      </div>
    );
  }

  handleColorChange(ev) {
    ev.preventDefault();
    this.props.changeColor(ev.target.value);
  }
}

const mapStateToProps = state => ({
  colors: state.puyoColors
});

const mapDispatchToProps = (dispatch) => ({
  changeColor(colorId) {
    dispatch(setColors(colorId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorSelector);
