import React from 'react';

const ScoreForm = (props) => (
    props.submitted ? <h3>Submitted!</h3> : <form onSubmit={props.handleSubmit}>
        <h3>Submit Your Score</h3>
        <input type="text" name="username" placeholder="Enter your name" style={{ color: 'black' }}></input>
        <button style={{ color: 'black' }}>Submit</button>
    </form>
)

export default ScoreForm
