import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTimer } from '../store/';

class TimerSelector extends Component {
  constructor() {
    super();
    this.handleTimerChange = this.handleTimerChange.bind(this);
  }

  render() {
    const timerChoices = [99, 199, 299];
    return (
      <div>
      <label>
        Game Duration:{' '}
        <select onChange={this.handleTimerChange}>
            <option />
            {
                timerChoices.map((dur, id) => (
                    <option key={id} value={dur}>
                        {`${dur+1}s`}
                    </option>
                ))
            }
        </select>
      </label>
      </div>
    );
  }

  handleTimerChange(ev) {
    ev.preventDefault();
    this.props.changeTimer(ev.target.value);
  }
}

const mapStateToProps = state => ({
  timer: state.timer,
});

const mapDispatchToProps = (dispatch) => ({
  changeTimer(duration) {
    dispatch(setTimer(duration));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerSelector);
