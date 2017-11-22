import React, { Component } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';
import DroppingPuyo from './DroppingPuyo';
import { rightMove, leftMove, rotateClockwise, dropMove} from '../store/puyoAction';

class Game extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const arrowMotion = document.addEventListener('keydown', e => {
            if (e.which === 37) {
                this.props.left(this.props.puyo);
            }
            if(e.which === 39) {
                this.props.right(this.props.puyo);
             }
            if(e.which === 40) {
                this.props.gravity(this.props.puyo);
            }
            if (e.which === 32) {
                clearInterval(dropInterval);
            }
            if(e.which === 38) {
              this.props.rotate(this.props.puyo);
            }
        })
        const dropInterval = setInterval(() => this.props.gravity(this.props.puyo), 500);
    }


    render() {
        return (
            <svg height={500} width={500}>
                    <Grid />
                    <DroppingPuyo puyo={this.props.puyo}/>
            </svg>
        )
    }
}

const mapStateToProps = state => ({
    puyo: state.puyo
})

const mapDispatchToProps = dispatch => ({
    right(puyo) {
        dispatch(rightMove(puyo));
    },
    rotate(puyo) {
      dispatch(rotateClockwise(puyo));
    },
    gravity(puyo) {
      dispatch(dropMove(puyo));
    },
    left(puyo){
        dispatch(leftMove(puyo));
    }
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
