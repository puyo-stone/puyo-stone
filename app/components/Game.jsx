import React, { Component } from 'react';
import Grid from './Grid';
import {connect} from 'react-redux';

class Game extends Component{
    render(){
            return (
            <div>
                <Grid />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    puyo : state.puyo
}
)

 export default connect(mapStateToProps)(Game);