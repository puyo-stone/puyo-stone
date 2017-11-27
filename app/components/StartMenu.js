import React, { Component } from 'react';
import {Link} from 'react-router'

class StartMenu extends Component {

    render() {
        return (
            <div className="start container">
                <Link to="/game" className="start overlay single">
                <h1>SinglePlayer!</h1>
                </Link>
                <div className="start overlay multiplayer">
                <h1>MultiPlayer!</h1>
                </div>
                <div className="start overlay tutorial">
                <h1>HighScore!</h1>
                </div>
                <div className="start overlay highscore">
                <h1>Tutorial!</h1>
                </div>
            </div>
        )
    }
}

export default StartMenu