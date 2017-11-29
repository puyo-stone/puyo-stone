import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { connect } from 'react-redux';

export default class DroppingPuyo extends Component {
  constructor(props) {
    super(props)
    this.drawPuyo = this.drawPuyo.bind(this);
  }

  componentDidMount() {
    this.drawPuyo();
  }

  componentDidUpdate() {
    if (Object.keys(this.props.puyo).length>0) { this.drawPuyo(); }
  }

  drawPuyo() {
    const node = this.node;
    const selectNode = select(node);
    const cellSize = this.props.cellSize;
    const centerPuyo = this.props.puyo.centerPuyo;
    const rotatePuyo = this.props.puyo.rotatePuyo;
    const poly = [{'x': 130, 'y': 20}, {'x': 180, 'y': 110}, {'x': 120, 'y': 170}, {'x': 80, 'y': 180}, {'x': 20, 'y': 120}, {'x': 30, 'y': 50}];
    centerPuyo.poly = poly;
    rotatePuyo.poly = poly;
    const data = [centerPuyo, rotatePuyo]
    const colors = this.props.colors;

    selectAll('.puyo').remove()
    const puyo = selectNode
    .selectAll('.puyo')
    .data(data)
    .enter().append('polygon')
    .attr('class', 'puyo')
    .attr('points', d => d.poly.map(e => [((e.x) / 200 + d.col) * cellSize, ((e.y) / 200 + d.row)* cellSize].join(',')).join(' '))
    .attr('transform', d => `rotate(${Math.random()*90} ${(d.col + 0.5) * cellSize} ${(d.row + 0.5) * cellSize})`)
    .style('fill', d => colors[d.color])
    .attr('stroke', d => colors[d.color].slice(0, -2) + '0.5)')
    .attr('stroke-width', 20)
  }

  render() {
    const cellSize = this.props.cellSize
    return <g ref={node => this.node = node} width={cellSize} height={cellSize}>
           </g>
  }
}
