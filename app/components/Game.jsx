import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import {dropAction, moveLeftAction, moveRightAction, rotateActionA, rotateActionB} from '../store/puyoAction';

class Game extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const arrowMotion = document.addEventListener('keydown', e => {
            if (e.which === 81) {
                this.props.moveLeft();
            }
            if(e.which === 69) {
                this.props.moveRight();
            }
            if(e.which === 87) {
                this.props.gravity();
            }
            if (e.which === 32) {
                clearInterval(dropInterval);
            }
            if(e.which === 85) {
              this.props.rotateA();
            }
            if(e.which === 73) {
              this.props.rotateB();
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
    rotateA() {
      dispatch(rotateActionA());
    },
    rotateB() {
      dispatch(rotateActionB());
    },
    gravity() {
      dispatch(dropAction());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
