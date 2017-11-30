// tutorial component

import React from 'react';
import { Link } from 'react-router';

export default function Tutorial(props) {
  return (
    <div id="tutorial">
    <Link to="/" >Return to main menu</Link>
      <h1>Welcome to Puyo-stone!</h1>
        <h3>How to play</h3>
          <p>Puyos will drop from the top of the grid; you can move them left, right, and even rotate them.</p>

          <p>Groups of four or more same color landed puyos will form a chain. Chains are removed from the grid and will cause other puyos on top to fall down.</p>

          <p>Removed chains of puyos can cause other chains to form from the falling puyos. Linking chain removals will net more points than normal single chains.</p>

        <h3>Controls</h3>
          <p>Move puyo right: right arrow</p>
          <p>Move puyo left: left arrow</p>
          <p>Fast drop puyo: down arrow</p>
          <p>Rotate clockwise: X</p>
          <p>Rotate counter-clockwise: Z</p>
          <p>Pause: P</p>

        <h4>Alternative controls:</h4>
          <p>Move puyo right: E</p>
          <p>Move puyo left: Q</p>
          <p>Fast drop puyo: W</p>
          <p>Rotate clockwise: I</p>
          <p>Rotate counter-clockwise: U</p>
          <p>Pause: P</p>

        <h3>Modes</h3>
          <p>Time attack: Try to get the highest score in the time limit. Time limit can be changed in settings.</p>
          <p>Time endurance: Survive as long as possible while achieving a high score. Puyo chain removals will also regain lost time.</p>
    </div>
  )
}
