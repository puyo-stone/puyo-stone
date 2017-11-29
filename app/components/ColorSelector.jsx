import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setColors } from '../store/';

class ColorSelector extends Component {
  constructor() {
    super();
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  render() {
    return (
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
