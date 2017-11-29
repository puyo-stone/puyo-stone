import React, { Component } from 'react';
import Modal from 'react-modal';
import Grid from './Grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DroppingPuyo from './DroppingPuyo';
import NextPuyo from './NextPuyo'
import { rightMove, leftMove, rotateA, rotateB, dropMove, clearPuyoAction, insertPuyo, reArrangeBoard, removePuyoFromBoard, createPuyoAction, getPuyo, updateScore, resetScore, newBoardAction, pauseOn, pauseOff, start, stop, resetTimer, restartPuyo } from '../store/';
import { leftCheck, rightCheck, rotateACheck, rotateBCheck, bottomCheck } from '../Func/checkCollision.js';
import { split, explosion, gameOver } from '../Func/game';
import Sound from './Sound';

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
      done: false,
      restarted: false
    }
    this.gridDimensions.height = this.gridDimensions.row * this.gridDimensions.cellSize;
    this.gridDimensions.width = this.gridDimensions.col * this.gridDimensions.cellSize;
    this.gameStart = this.gameStart.bind(this);
    this.gameStop = this.gameStop.bind(this);
    this.handleSet = this.handleSet.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleSet() {
    this.setState({
      done: true
    })
  }

  gameStop() {
    if (this.state.gameOver) {
      this.handleSet();
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
      if (!this.state.restarted) {
        arrowMotion = document.addEventListener('keydown', e => {

          // 80 is p
          if (e.which === 80) {
            if (!this.state.done) {
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
      }

      const intervalManager = (flag) => {
        if (flag) {
          intervalStatus = setInterval(() => {
            if (gameOver(this.props.board, this.props.puyo)) {
              this.setState({gameOver: true});
              clearInterval(intervalStatus);
            } else {
              if (Object.keys(this.props.puyo).length > 0) {
                if (bottomCheck(this.props.board, this.props.puyo)) {
                  this.props.gravity(this.props.puyo)
                  if (gameOver(this.props.board, this.props.puyo)) {
                    this.setState({gameOver: true})
                    clearInterval(intervalStatus);
                  }
                } else {
                  const puyo = this.props.puyo;
                  this.props.clearCurrent();
                  const { board, rotate, center } = split(this.props.board, puyo, this.props.updateBoard);
                  const newBoard = explosion(board, center, rotate, this.props.updateBoard, this.props.addToScore, this.props.reArrange, this.props.removePuyo);
                  this.props.getNextPuyo(this.props.nextPuyo);
                  this.props.create();
                }
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
    if (!this.state.gameOver) {
      if (nextProps.timer===0) {
        this.setState({
          gameOver: true
        })
      }
    }
  }

  componentWillUnmount() {
    this.props.scoreReset();
    this.props.turnPauseOff();
    this.props.timerReset();
    this.props.clearCurrent();
    this.props.create();
    this.props.newBoard();
    this.setState({gameOver: false});
    this.setState({done: false});
  }

  reset() {
    this.setState({gameOver: false});
    this.setState({done: false});
    this.setState({restarted: true});
    this.props.scoreReset();
    this.props.turnPauseOff();
    this.props.timerReset();
    this.props.timerStop();
    this.props.clearCurrent();
    this.props.puyoRestart();
    this.props.create();
    this.props.newBoard();
    this.props.timerStart();
  }

  render() {
    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        backgroundColor: 'rgb(135,206,235)',
        borderRadius: '4px',
        backgroundRepeat: 'no-repeat',
        outline: 'none',
        height: '300px',
        width: '300px',
        padding: '20px',
        margin: 'auto',
      }
    }

    const pauseStatus = this.props.pause;
    const finished = this.state.done;
    return (
      <div>

        <div id="game">
            <svg id="middlegrid" height={this.gridDimensions.height} width={this.gridDimensions.width}>
                <Grid gridDimensions={this.gridDimensions} boardData={this.props.board} colors={this.props.puyoColors.currentPalette}/>
                <DroppingPuyo puyo={this.props.puyo} cellSize={this.gridDimensions.cellSize} colors={this.props.puyoColors.currentPalette}/>
                </svg>

            <div id="topright">
                <div id="nextpuyo">
                <h2>Next Puyo</h2>
                <NextPuyo puyo={this.props.nextPuyo} cellSize ={this.gridDimensions.cellSize} colors={this.props.puyoColors.currentPalette}/>
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

          <div id="middleright">
          <div id="gameStart">
            <button type="button" className="btn btn-default" onClick={this.gameStart} disabled={ this.state.press }>Start Game!</button>
          </div>

          <div id="gameMusic">
            <Sound songUrl={this.props.sound.currentSong.url} />
          </div>
          </div>

          <Modal isOpen={pauseStatus} style={modalStyle}>
            <div id="pause">
              <div>
                <h1>Paused</h1>
              </div>
            </div>
          </Modal>

          <Modal isOpen={this.state.done} style={modalStyle}>
            <div id="gameover">
              <div>
                <h1>GAME OVER!</h1>
                <h3>Thank You For Playing!</h3>
                <h3>Your Score is {this.props.score} </h3>
                <Link to='/game'>
                  <h3 onClick={this.reset}> Reset! </h3>
                </Link>
              </div>
            </div>
          </Modal>

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
  pause: state.pause,
  sound: state.sound
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
  },
  puyoRestart() {
    dispatch(restartPuyo());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
