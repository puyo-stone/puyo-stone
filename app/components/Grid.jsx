import React, { Component } from 'react';
import { select } from 'd3-selection';
import { connect } from 'react-redux';

class Grid extends Component {
    constructor(props) {
        super(props);
        // this.col = 6;
        // this.row = 12;
        // this.cellSize = 33;
        // this.w = this.col * this.cellSize;
        // this.h = this.row * this.cellSize;
        this.drawGrid = this.drawGrid.bind(this);
        this.populate = this.populate.bind(this);
    }

    componentDidMount() {
        this.drawGrid();
        this.populate();
    }

    populate() {
        const node = this.node;
        const cellSize = this.props.gridDimensions.cellSize;

        let row = select(node)
            .selectAll(".row")
            .data(this.props.board)
            .enter().append("g")
            .attr("class", "row");
        row
            .selectAll(".square")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("class", "square")
            .attr("x", function (d) {
                if (d) { return d.col * cellSize }
                else { return 0 }
            })
            .attr("y", function (d) {
                if (d) { return d.row * cellSize }
                else { return 0 }
            })
            .attr("width", function (d) {
                if (d) { return cellSize }
                else { return 0 }
            })
            .attr("height", function (d) {
                if (d) { return cellSize }
                else { return 0 }
            })
            .style("fill", function (d) { 
                if(d) return d.color 
            })
    }

    drawGrid() {
        const node = this.node;
        const selectNode = select(node);
        const cellSize = this.props.gridDimensions.cellSize;
        const col = this.props.gridDimensions.col;
        const row = this.props.gridDimensions.row;
        const w = this.props.gridDimensions.width;
        const h = this.props.gridDimensions.height;        
        
        for (var i = 1; i < row; i++) {
            selectNode
                .append("line")
                .attr("x1", 0)
                .attr("y1", i * cellSize)
                .attr("x2", w)
                .attr("y2", i * cellSize)
                .attr("stroke", "lightgray")
                .attr("stroke-width", 0.5);
        }

        for (var j = 1; j < col; j++) {
            selectNode
                .append("line")
                .attr("x1", j * cellSize)
                .attr("y1", 0)
                .attr("x2", j * cellSize)
                .attr("y2", h)
                .attr("stroke", "lightgray")
                .attr("stroke-width", 0.5);
        }
    }

    render() {
        const w = this.props.gridDimensions.width;
        const h = this.props.gridDimensions.height;   
        return (
            <g ref={node => this.node = node} width={w} height={h}>
            </g>
        )
    }
}

const mapStateToProps=state=>{
    return {
        board : state.board
    }
}

export default connect(mapStateToProps)(Grid);