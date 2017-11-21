import React, { Component } from 'react';
import Grid from './Grid';

export default class Game extends Component{
    render(){
        let gamedata = [ 
            [ null, null, null, null, null, null ], 
            [ null, null, null, null, null, null ], 
            [ null, null, null, null, null, null ], 
            [ null, null, null, null, null, null ], 
            [ null, null, null, null, null, null ], 
            [ null, null, null, null, null, null ], 
            [  { color: '#FF0000', col: 0, row: 6, stop: false },  { color: '#00FF00', col: 1, row: 6, stop: false },  { color: '#FF0000', col: 2, row: 6, stop: false },  { color: '#0000FF', col: 3, row: 6, stop: false },  { color: '#00FF00', col: 4, row: 6, stop: false },  { color: '#FFFF00', col: 5, row: 6, stop: false } ], [  { color: '#0000FF', col: 0, row: 7, stop: false },  { color: '#9400D3', col: 1, row: 7, stop: false },  { color: '#FFFF00', col: 2, row: 7, stop: false },  { color: '#00FF00', col: 3, row: 7, stop: false },  { color: '#0000FF', col: 4, row: 7, stop: false },  { color: '#FF0000', col: 5, row: 7, stop: false } ], [  { color: '#FF0000', col: 0, row: 8, stop: false },  { color: '#FFFF00', col: 1, row: 8, stop: false },  { color: '#FF0000', col: 2, row: 8, stop: false },  { color: '#00FF00', col: 3, row: 8, stop: false },  { color: '#0000FF', col: 4, row: 8, stop: false },  { color: '#00FF00', col: 5, row: 8, stop: false } ], [  { color: '#9400D3', col: 0, row: 9, stop: false },  { color: '#00FF00', col: 1, row: 9, stop: false },  { color: '#0000FF', col: 2, row: 9, stop: false },  { color: '#FF0000', col: 3, row: 9, stop: false },  { color: '#9400D3', col: 4, row: 9, stop: false },  { color: '#FF0000', col: 5, row: 9, stop: false } ], [  { color: '#0000FF', col: 0, row: 10, stop: false },  { color: '#FFFF00', col: 1, row: 10, stop: false },  { color: '#0000FF', col: 2, row: 10, stop: false },  { color: '#9400D3', col: 3, row: 10, stop: false },  { color: '#FFFF00', col: 4, row: 10, stop: false },  { color: '#FF0000', col: 5, row: 10, stop: false } ], [  { color: '#0000FF', col: 0, row: 11, stop: false },  { color: '#9400D3', col: 1, row: 11, stop: false },  { color: '#00FF00', col: 2, row: 11, stop: false },  { color: '#9400D3', col: 3, row: 11, stop: false },  { color: '#9400D3', col: 4, row: 11, stop: false },  { color: '#9400D3', col: 5, row: 11, stop: false } ] ] 
            console.log(gamedata);
            return (
            <div>
                <Grid gamedata={gamedata} />
            </div>
        )
    }
}