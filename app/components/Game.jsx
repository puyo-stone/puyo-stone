import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import {moveLeftAction, moveRightAction} from '../store/puyoAction'

class Game extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const arrowMotion = document.onkeydown = e => {
            if (e.key === "ArrowLeft") {
                this.props.moveLeft();
            }
            if(e.key === "ArrowRight") {
                this.props.moveRight();
            }
        }
    }

    render() {
        return (
            <svg height={500} width={500}>
                    <Grid />
                    <DroppingPuyo puyo={this.props.puyo}/>
            </svg>
        )
    }
}

const mapStateToProps = state => ({
    puyo: state.puyo
})

const mapDispatchToProps = dispatch => ({
    moveLeft() {
        dispatch(moveLeftAction());
    },
    moveRight() {
        dispatch(moveRightAction());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);