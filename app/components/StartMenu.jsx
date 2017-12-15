import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Sound from 'react-sound';

export class StartMenu extends Component {
  render() {
    return (
			<div className="start menu">
				<Link to="/timeattack" className="start overlay timeattack">
					<h1>Time Attack Mode</h1>
				</Link>
				<Link to="/timeendurance" className="start overlay endurancemode">
					<h1>Endurance Mode</h1>
				</Link>
				<Link to="/settings" className="start overlay settings">
					<h1>Settings!</h1>
				</Link>
				<Link to="/tutorial" className="start overlay tutorial">
					<h1>Tutorial!</h1>
				</Link>
				<Sound url="/songs/Spirited Away.mp3" volume={this.props.sound.volume} loop={true} playStatus={Sound.status.PLAYING}/>
			</div>
    )
  }
}

const mapStateToProps = state => ({
  sound: state.sound
})

export default connect(mapStateToProps)(StartMenu);
