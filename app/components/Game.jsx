import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import { rightMove, leftMove, rotateA, rotateB, dropMove} from '../store/puyoAction';
import { insertPuyo } from '../store/board'

class Game extends Component {

    constructor(props){
        super(props)
        this.gridDimensions = {
            col: 6,
            row: 12,
            cellSize: 33,
        }
        this.gridDimensions.height = this.gridDimensions.row * this.gridDimensions.cellSize;
        this.gridDimensions.width = this.gridDimensions.col * this.gridDimensions.cellSize;
    }

    componentDidMount(){
        const arrowMotion = document.addEventListener('keydown', e => {
            if (e.which === 81) {
                if (this.props.puyo.centerPuyo.col >= 0) {
                    this.props.left(this.props.puyo);
                }
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
            <svg height={this.gridDimensions.height} width={this.gridDimensions.width}>
                    <Grid gridDimensions={this.gridDimensions} boardData={this.props.board}/>
                    <DroppingPuyo puyo={this.props.puyo} cellSize={this.gridDimensions.cellSize}/>
            </svg>
        )
    }
}

const mapStateToProps = state => ({
    puyo: state.puyo,
    board: state.board
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
    },
    insertPuyo(puyo, board) {
        dispatch(insertPuyo(puyo, board))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
