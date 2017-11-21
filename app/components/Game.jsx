import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';

class Game extends Component {
    render() {
        return (
            <svg height={500} width={500}>
                    <Grid />
                    <DroppingPuyo />
            </svg>
        )
    }
}

const mapStateToProps = state => ({
    centerPuyo: state.puyo.centerPuyo,
    rotatePuyo: state.puyo.rotatePuyo
})

export default connect(mapStateToProps)(Game);