// settings
// choose palette
// set bgm
// change controls

import React, { Component } from 'react';
import { connect } from 'react-redux';
import palettes from '../Func/SinglePuyo';

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
  console.log(palettes);
    return (
      <div id="tutorial">
        <h1>setting test</h1>

      </div>
    )
  }

}

export default connect(Settings)
