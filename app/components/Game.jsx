import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DroppingPuyo from './DroppingPuyo';
import NextPuyo from './NextPuyo'
import { rightMove, leftMove, rotateA, rotateB, dropMove, clearPuyoAction, insertPuyo, reArrangeBoard, removePuyoFromBoard, createPuyoAction, getPuyo, updateScore, resetScore, newBoardAction, pauseOn, pauseOff, start, stop, resetTimer } from '../store/';
import { leftCheck, rightCheck, rotateACheck, rotateBCheck, bottomCheck } from '../Func/checkCollision.js';
import { split, explosion, gameOver } from '../Func/game';

class Game extends Component {
  constructor(props) {
    super(props)
    this.gridDimensions = {
      col: 6,
      row: 12,
      cellSize: window.innerHeight / 12,
    }
    this.state = {
      press: false,
      gameOver: false,
      done: false
    }
    this.gridDimensions.height = this.gridDimensions.row * this.gridDimensions.cellSize;
    this.gridDimensions.width = this.gridDimensions.col * this.gridDimensions.cellSize;
    this.gameStart = this.gameStart.bind(this);
    this.gameStop = this.gameStop.bind(this);
  }

  gameStop() {
    if (this.state.gameOver) {
      this.setState({gameOver: false});
      this.setState({done: true})
      this.props.timerStop();
      this.props.clearCurrent();
      this.gameStart();
    }
  }

  componentWillUpdate() {
    if (this.state.gameOver&&!this.state.done) {
      this.gameStop();
    }
  }

  gameStart() {
    let intervalStatus = null;
    let arrowMotion;
    if (!this.state.gameOver) {
      this.setState({ press: true })
      this.props.timerStart();
      arrowMotion = document.addEventListener('keydown', e => {
        // 32 = space
        // 89 = y
        // 80 is p
        if (e.which === 80) {
          if (!this.props.pause) {
            this.props.turnPauseOn();
            this.props.timerStop();
            intervalManager(false);
          } else {
            this.props.turnPauseOff();
            if (!this.state.done) {
              this.props.timerStart();
            }
            intervalManager(true);
          }
        }
        if (!this.state.done) {
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
            if (e.which === 73 || e.which === 88) {
              if (rotateACheck(this.props.board, this.props.puyo)) {
                this.props.rotatePuyoA(this.props.puyo);
              }
            }
            if (e.which === 85 || e.which === 90) {
              if (rotateBCheck(this.props.board, this.props.puyo)) {
                this.props.rotatePuyoB(this.props.puyo);
              }
            }
          }
        }
      })

      const intervalManager = (flag) => {
        if (flag) {
          intervalStatus = setInterval(() => {
            if (Object.keys(this.props.puyo).length > 0) {
              if (bottomCheck(this.props.board, this.props.puyo)) {
                this.props.gravity(this.props.puyo)
              } else {
                if (gameOver(this.props.board, this.props.puyo)) {
                  this.setState({gameOver: true});
                  clearInterval(intervalStatus);
                }
                const puyo = this.props.puyo;
                this.props.clearCurrent();
                const { board, rotate, center } = split(this.props.board, puyo, this.props.updateBoard);
                explosion(board, center, rotate, this.props.updateBoard, this.props.addToScore, this.props.reArrange, this.props.removePuyo);
                this.props.getNextPuyo(this.props.nextPuyo);
                this.props.create();
              }
            }
          }, 500)
        } else {
          clearInterval(intervalStatus);
        }
      }
      intervalManager(true);
    } else {
      clearInterval(intervalStatus);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((gameOver(this.props.board, this.props.puyo)===false && gameOver(nextProps.board, nextProps.puyo)) || nextProps.timer===0) {
      this.setState({
        gameOver: true
      })
    }
  }

  componentWillUnmount() {
    this.props.scoreReset();
    this.props.turnPauseOff();
    this.props.timerReset();
    this.props.clearCurrent();
    this.props.newBoard();

    this.setState({gameOver: false});
    this.setState({done: false});
  }

  onClickHandlerMainMenu() {
    this.setState({
      gameOver: true
    })
  }

  render() {
    const pauseStatus = this.props.pause;
    const finished = this.state.done;
    return (
      <div>
        {
          finished &&
          <div id="finished">
            <button>Reset</button>
            <Link to="/">
              <button >Return to main menu</button>
            </Link>
          </div>
        }

        {
          pauseStatus &&
          <div id="pause">
            <div>
              <h2>Paused</h2>
              <button>Reset</button>
              <Link to="/">
                <button >Return to main menu</button>
              </Link>
            </div>
          </div>
        }

        <div id="game">

            <svg id="middlegrid" height={this.gridDimensions.height} width={this.gridDimensions.width}>
                <Grid gridDimensions={this.gridDimensions} boardData={this.props.board} colors={this.props.puyoColors}/>
                <DroppingPuyo puyo={this.props.puyo} cellSize={this.gridDimensions.cellSize} colors={this.props.puyoColors}/>
                </svg>

            <div id="topright">
                <div id="nextpuyo">
                <h2>Next Puyo</h2>
                <NextPuyo puyo={this.props.nextPuyo} cellSize ={this.gridDimensions.cellSize} colors={this.props.puyoColors}/>
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
            {
              this.props.timer
            }
          </div>

          <div id="start">
            <button onClick={this.gameStart} disabled={this.state.press}>Start Game!</button>
          </div>

          <div id="control1" className="controlOne"></div>
          <div id="control2" className="controlTwo"></div>

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
  puyoColors: state.puyoColors,
  timer: state.timer,
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
  timerStart() {
    dispatch(start());
  },
  timerStop() {
    stop();
  },
  timerReset() {
    dispatch(resetTimer());
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
