import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import { rightMove, leftMove, rotateA, rotateB, dropMove} from '../store/puyoAction';

class Game extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const arrowMotion = document.addEventListener('keydown', e => {
            if (e.which === 81) {
                this.props.left(this.props.puyo);
            }
            if(e.which === 69) {
                this.props.right(this.props.puyo);
            }
            if(e.which === 87) {
                this.props.gravity(this.props.puyo);
            }
            if (e.which === 32) {
                clearInterval(dropInterval);
            }
            if (e.which === 85) {
              this.props.rotatePuyoA(this.props.puyo);
            }
            if (e.which === 73) {
              this.props.rotatePuyoB(this.props.puyo);
            }
        })
        const dropInterval = setInterval(() => this.props.gravity(this.props.puyo), 500);
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
    right(puyo) {
        dispatch(rightMove(puyo));
    },
    left(puyo){
        dispatch(leftMove(puyo));
    },
    rotatePuyoA(puyo) {
      dispatch(rotateA(puyo));
    },
    rotatePuyoB(puyo) {
      dispatch(rotateB(puyo));
    },
    gravity(puyo) {
      dispatch(dropMove(puyo));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
