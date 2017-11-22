import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { connect } from 'react-redux';

export default class DroppingPuyo extends Component{

    constructor(props) {
        super(props)
        this.drawPuyo = this.drawPuyo.bind(this)
    }

    componentDidMount() {
        this.drawPuyo()
    }

    componentDidUpdate() {
            this.drawPuyo()

    }

    drawPuyo(){
        const node = this.node;
        const selectNode = select(node);
        const div = 33
        const data = [this.props.puyo.centerPuyo, this.props.puyo.rotatePuyo]

        selectAll(".puyo").remove()

        const puyo = selectNode
        .selectAll(".puyo")
        .data(data)
        .enter().append("rect")
        .attr("class", "puyo")
        .attr("x", d => d.col * div)
        .attr("y", d => d.row * div)
        .attr("width", div)
        .attr("height", div)
        .style("fill", d => {
            return d.color
        })
    }

    render(){
        return <g ref={node => this.node = node} width={99} height={99}>
           </g>
    }
}
