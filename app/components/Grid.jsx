import React, { Component } from 'react';
import { select } from 'd3-selection';
import { connect } from 'react-redux';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.col = 6;
        this.row = 12;
        this.div = 33;
        this.w = this.col * this.div;
        this.h = this.row * this.div;
        this.drawGrid = this.drawGrid.bind(this);
        this.populate = this.populate.bind(this);
    }

    componentDidMount() {
        this.drawGrid();
        this.populate();
    }

    populate() {
        const node = this.node;
        const div = this.div;
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
                if (d) { return d.col * div }
                else { return 0 }
            })
            .attr("y", function (d) {
                if (d) { return d.row * div }
                else { return 0 }
            })
            .attr("width", function (d) {
                if (d) { return div }
                else { return 0 }
            })
            .attr("height", function (d) {
                if (d) { return div }
                else { return 0 }
            })
            .style("fill", function (d) { 
                if(d) return d.color 
            })
    }

    drawGrid() {
        const node = this.node;
        const selectNode = select(node);
        for (var i = 1; i < this.row; i++) {
            selectNode
                .append("line")
                .attr("x1", 0)
                .attr("y1", i * this.div)
                .attr("x2", this.w)
                .attr("y2", i * this.div)
                .attr("stroke", "lightgray")
                .attr("stroke-width", 0.5);
        }
        for (var j = 1; j < this.col; j++) {
            selectNode
                .append("line")
                .attr("x1", j * this.div)
                .attr("y1", 0)
                .attr("x2", j * this.div)
                .attr("y2", this.h)
                .attr("stroke", "lightgray")
                .attr("stroke-width", 0.5);
        }
    }
    render() {
        return (
            <svg ref={node => this.node = node} width={this.w} height={this.h}>
            </svg>
        )
    }
}

const mapStateToProps=state=>{
    return {
        board : state.board
    }
}

export default connect(mapStateToProps)(Grid);