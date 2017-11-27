import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import { rightMove, leftMove, rotateA, rotateB, dropMove, clearPuyoAction, createPuyoAction } from '../store/puyoAction';
import { insertPuyo } from '../store/board';
import { leftCheck, rightCheck, rotateACheck, rotateBCheck, bottomCheck } from '../Func/checkCollision.js';
import { split, explosion } from '../Func/game';
import { updateScore } from '../store/score';

class Game extends Component {
  constructor(props) {
    super(props)
    this.gridDimensions = {
      col: 6,
      row: 12,
      cellSize: window.innerHeight/12,
    }
    this.gridDimensions.height = this.gridDimensions.row * this.gridDimensions.cellSize;
    this.gridDimensions.width = this.gridDimensions.col * this.gridDimensions.cellSize;
  }

  componentDidMount() {
    const arrowMotion = document.addEventListener('keydown', e => {
      if (e.which === 81) {
        if (leftCheck(this.props.board, this.props.puyo)) {
          this.props.left(this.props.puyo);
        }
      }
      if (e.which === 69) {
        if (rightCheck(this.props.board, this.props.puyo)) {
          this.props.right(this.props.puyo);
        }
      }
      if (e.which === 87) {
        if (bottomCheck(this.props.board, this.props.puyo)) {
          this.props.gravity(this.props.puyo);
        }
      }
      if (e.which === 32) {
        clearInterval(dropInterval);
      }
      if (e.which === 85) {
        if (rotateACheck(this.props.board, this.props.puyo)) {
          this.props.rotatePuyoA(this.props.puyo);
        }
      }
      if (e.which === 73) {
        if (rotateBCheck(this.props.board, this.props.puyo)) {
          this.props.rotatePuyoB(this.props.puyo);
        }
      }
    })
    const dropInterval = setInterval(() => {
      if (Object.keys(this.props.puyo).length > 0) {
        if (bottomCheck(this.props.board, this.props.puyo)) {
          this.props.gravity(this.props.puyo)
        } else {
          const puyo = this.props.puyo;
          this.props.clearCurrent();
          const { board, rotate, center } = split(this.props.board, puyo, this.props.updateBoard);
          explosion(board, center, rotate, this.props.updateBoard, this.props.addToScore);
          console.log(this.props.score)
          this.props.create();
        }
      }
    }, 500);
  }

  render() {
    return (
        <div id="game">
            <svg id="grid" height={this.gridDimensions.height} width={this.gridDimensions.width}>
                <Grid gridDimensions={this.gridDimensions} boardData={this.props.board} />
                <DroppingPuyo puyo={this.props.puyo} cellSize={this.gridDimensions.cellSize} />
            </svg>
            {
              this.props.score
            }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  puyo: state.puyo,
  board: state.board,
  score: state.score
})

const mapDispatchToProps = dispatch => ({
  right(puyo) {
    dispatch(rightMove(puyo));
  },
  left(puyo) {
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
  updateBoard(board) {
    dispatch(insertPuyo(board))
  },
  clearCurrent() {
    dispatch(clearPuyoAction());
  },
  create() {
    dispatch(createPuyoAction());
  },
  addToScore(score) {
    dispatch(updateScore(score))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
