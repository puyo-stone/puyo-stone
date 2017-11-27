import React, { Component } from 'react';
import { connect } from 'react-redux';
import { displayScore } from '../Store/score';

class Score extends Component {

  componentDidMount() {
    this.props.showScore();
  }

  render() {
    const displayScore = this.props.score;
    return (
      <div>
      {
        displayScore
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  score: state.finalScore
})

const mapDispatchToProps = dispatch => ({
  showScore() {
    dispatch(displayScore());
  }
})

export default connect(mapStateToProps)(Score)
