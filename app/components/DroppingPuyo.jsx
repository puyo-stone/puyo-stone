import React, { Component } from 'react';
import { select } from 'd3-selection';
import { connect } from 'react-redux';

class DroppingPuyo extends Component{

    constructor() {
        super()
        this.drawPuyo = this.drawPuyo.bind(this)
    }

    componentDidMount(){
        this.drawPuyo()
    }

    drawPuyo(){
        const node = this.node;
        const selectNode = select(node);
        const div = 33

        selectNode
        .selectAll(".puyo")        
        .data([this.props.centerPuyo,this.props.rotatePuyo])
        .enter().append("rect")
        .attr("class", "puyo")
        .attr("x", d => d.col * div)
        .attr("y", d => d.row * div)
        .attr("width", div)
        .attr("height", div)
        .style("fill", d => {
            console.log(d);
            return d.color
        })
    }
    

    render(){
        return <g ref={node => this.node = node} width={99} height={99}>
        </g>
    }
}

const mapStateToProps = state => ({
    centerPuyo : state.puyo.centerPuyo,
    rotatePuyo : state.puyo.rotatePuyo
})

export default connect(mapStateToProps)(DroppingPuyo)