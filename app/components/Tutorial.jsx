// tutorial component

import React from 'react';

export default function Tutorial(props) {
  return (
    <div id="tutorial">
      <h1>Welcome to Puyo-stone!</h1>
        <h3>How to play</h3>
          <p>Puyos will drop from the top of the grid; you can move them left, right, and even rotate them.</p>

          <p>Groups of four or more landed puyos will form a chain. Chains are removed from the grid and will cause other puyos on top to fall down.</p>

          <p>Chains of puyos can cause other chains to form. Linking chain removals will net more points than normal single chains.</p>

        <h3>Controls</h3>
          <p>Move puyo right: right arrow</p>
          <p>Move puyo left: left arrow</p>
          <p>Fast drop puyo: down arrow</p>
          <p>Rotate clockwise: S</p>
          <p>Rotate counter-clockwise: A</p>
          <p>Pause: P</p>

        <h4>Alternative controls:</h4>
          <p>Move puyo right: E</p>
          <p>Move puyo left: Q</p>
          <p>Fast drop puyo: W</p>
          <p>Rotate clockwise: U</p>
          <p>Rotate counter-clockwise: I</p>
          <p>Pause: Y</p>

        <h3>Online mode</h3>
          <p>Compete for the highest score against your opponent within a 99 second time limit.</p>
    </div>
  )
}
