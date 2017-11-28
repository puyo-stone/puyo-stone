import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DroppingPuyo from './DroppingPuyo';
import NextPuyo from './NextPuyo'
import { rightMove, leftMove, rotateA, rotateB, dropMove, clearPuyoAction, insertPuyo, reArrangeBoard, removePuyoFromBoard, createPuyoAction, getPuyo, updateScore, resetScore, newBoardAction, pauseOn, pauseOff } from '../store/';
import { leftCheck, rightCheck, rotateACheck, rotateBCheck, bottomCheck } from '../Func/checkCollision.js';
import { split, explosion } from '../Func/game';

class Game extends Component {
  constructor(props) {
    super(props)
    this.gridDimensions = {
      col: 6,
      row: 12,
      cellSize: window.innerHeight / 12,
    }
    this.gridDimensions.height = this.gridDimensions.row * this.gridDimensions.cellSize;
    this.gridDimensions.width = this.gridDimensions.col * this.gridDimensions.cellSize;
  }

  componentDidMount() {
    const arrowMotion = document.addEventListener('keydown', e => {

      // 32 = space
      // 89 = y
      // 80 is p
      if (e.which === 89 || e.which === 80) {
        if (!this.props.pause) {
          this.props.turnPauseOn();
          intervalManager(false);
          return;
        }
        if (this.props.pause) {
          this.props.turnPauseOff();
          intervalManager(true);
        }
      }

      if (!this.props.pause) {
        if (e.which === 81 || e.which === 37) {
          if (leftCheck(this.props.board, this.props.puyo)) {
            this.props.left(this.props.puyo);
          }
        }
        if (e.which === 69 || e.which === 39) {
          if (rightCheck(this.props.board, this.props.puyo)) {
            this.props.right(this.props.puyo);
          }
        }
        if (e.which === 87 || e.which === 40) {
          if (bottomCheck(this.props.board, this.props.puyo)) {
            this.props.gravity(this.props.puyo);
          }
        }
        if (e.which === 85 || e.which === 83) {
          if (rotateACheck(this.props.board, this.props.puyo)) {
            this.props.rotatePuyoA(this.props.puyo);
          }
        }
        if (e.which === 73 || e.which === 65) {
          if (rotateBCheck(this.props.board, this.props.puyo)) {
            this.props.rotatePuyoB(this.props.puyo);
          }
        }
      }
    })

    let intervalStatus = null;

    const intervalManager = (flag) => {
      if (flag) {
        intervalStatus = setInterval(() => {
          if (Object.keys(this.props.puyo).length > 0) {
            if (bottomCheck(this.props.board, this.props.puyo)) {
              this.props.gravity(this.props.puyo)
            } else {
              const puyo = this.props.puyo;
              this.props.clearCurrent();
              const { board, rotate, center } = split(this.props.board, puyo, this.props.updateBoard);
              explosion(board, center, rotate, this.props.updateBoard, this.props.addToScore, this.props.reArrange, this.props.removePuyo);
              this.props.getNextPuyo(this.props.nextPuyo);
              this.props.create();
            }
          }
        }, 500)
      }
      else {
        clearInterval(intervalStatus);
      }
    }
    intervalManager(true);
  }

  onClickHandler() {
    this.props.scoreReset();
    this.props.turnPauseOff();
    this.props.newBoard();
  }

  render() {
    const pauseStatus = this.props.pause;
    return (
      <div>
        {
          pauseStatus &&
          <div id="pause">
            <div>
              <h2>Paused</h2>
              <Link to="/game" onClick={this.onClickHandler} >Reset___</Link>
              <Link to="/" onClick={this.onClickHandler} >___Return to main menu</Link>
            </div>
          </div>
        }

        <div id="game">

            <svg id="middlegrid" height={this.gridDimensions.height} width={this.gridDimensions.width}>
                <Grid gridDimensions={this.gridDimensions} boardData={this.props.board} />
                <DroppingPuyo puyo={this.props.puyo} cellSize={this.gridDimensions.cellSize} />
                </svg>

            <div id="topright">
                <div id="nextpuyo">
                <h2>Next Puyo</h2>
                <NextPuyo puyo={this.props.nextPuyo} cellSize ={this.gridDimensions.cellSize} />
                </div>
            </div>

            <div id="score">
                <h2>Score</h2>
                    {
                    this.props.score
                    }
            </div>

            <div id="timer">
                <h2>Timer</h2>
            </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  puyo: state.puyo,
  board: state.board,
  score: state.score,
  nextPuyo: state.nextPuyo,
  pause: state.pause
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
    dispatch(updateScore(score));
  },
  reArrange(board) {
    dispatch(reArrangeBoard(board));
  },
  removePuyo(board) {
    dispatch(removePuyoFromBoard(board));
  },
  getNextPuyo(puyo) {
    dispatch(getPuyo(puyo));
  },
  newBoard() {
    dispatch(newBoardAction());
  },
  scoreReset() {
    dispatch(resetScore());
  },
  turnPauseOn() {
    dispatch(pauseOn());
  },
  turnPauseOff() {
    dispatch(pauseOff());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
