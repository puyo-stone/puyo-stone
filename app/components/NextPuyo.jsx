import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { connect } from 'react-redux';

export default class NextPuyo extends Component {
  constructor(props) {
    super(props)
    this.drawPuyo = this.drawPuyo.bind(this);
  }

  componentDidMount() {
    this.drawPuyo();
  }

  componentDidUpdate() {
    if (Object.keys(this.props.puyo).length > 0) { this.drawPuyo(); }
  }

  drawPuyo() {
    const node = this.node;
    const selectedNode = select(node);
    const cellSize = this.props.cellSize;
    const data = [this.props.puyo.centerPuyo, this.props.puyo.rotatePuyo]
    selectAll('.nextpuyo').remove()

    const puyo = selectedNode
        .selectAll('.nextpuyo')
        .data(data)
        .enter().append('rect')
        .attr('class', 'nextpuyo')
        .attr('x', d => cellSize)
        .attr('y', d => ((d.row+1) * cellSize))
        .attr('width', cellSize)
        .attr('height', cellSize)
        .style('fill', d => d.color)
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 0.5)
  }

  render() {
    const cellSize = this.props.cellSize
    return <svg height={cellSize * 2} width={cellSize * 2}>
             <g ref={node => this.node = node} width={cellSize} height={cellSize}/>
           </svg>
  }
}
