import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import {dropAction, moveLeftAction, moveRightAction, rotateAction} from '../store/puyoAction';

class Game extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const arrowMotion = document.addEventListener('keydown', e => {
            if (e.which === 37) {
                this.props.moveLeft();
            }
            if(e.which === 39) {
                this.props.moveRight();
            }
            if(e.which === 40) {
                this.props.gravity();
            }
            if (e.which === 32) {
                clearInterval(dropInterval);
            }
            if(e.which === 38) {
              this.props.rotate();
            }
        })

        const dropInterval = setInterval(this.props.gravity, 1000);

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
    },
    rotate() {
      dispatch(rotateAction());
    },
    gravity() {
      dispatch(dropAction());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
