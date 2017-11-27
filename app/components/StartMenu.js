import React, { Component } from 'react';
import { Link } from 'react-router'

class StartMenu extends Component {

    render() {
        return (
            <div className="start container">
                <Link to="/game" className="start overlay singleplayer">
                    <h1>SinglePlayer!</h1>
                </Link>
                <Link className="start overlay multiplayer">
                    <h1>MultiPlayer!</h1>
                    <h2>(Coming Soon!)</h2>
                </Link>
                <Link className="start overlay settings">
                    <h1>Settings!</h1>
                    <h2>(Coming Soon!)</h2>
                </Link>
                <Link to="/tutorial" className="start overlay tutorial">
                    <h1>Tutorial!</h1>
                </Link>
            </div>
        )
    }
}

export default StartMenu
