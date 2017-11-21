import React, { Component } from 'react';
import { select } from 'd3-selection'

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
        console.log(this.node);
    }

    populate() {
        const node = this.node;
        let colors = ['#FFFF00', '#0000FF', '#9400D3', '#FF0000', '#00FF00']
        function randomColor(d,i,colors) {
          return colors[Math.floor(Math.random() * colors.length)]
        }

        let row = select(node)
            .selectAll(".row")
            .data(props.gamedata)
            .enter().append("g")
            .attr("class", "row");
            const div = this.div;
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
            .style("fill", function (d) { return colors[Math.floor(Math.random() * colors.length)] })
    }

    drawGrid() {
        const node = this.node;
        for (var i = 1; i < this.row; i++) {
            select(node)
                .append("line")
                .attr("x1", 0)
                .attr("y1", i * this.div)
                .attr("x2", this.w)
                .attr("y2", i * this.div)
                .attr("stroke", "lightgray")
                .attr("stroke-width", 0.5);
        }
        for (var j = 1; j < this.col; j++) {
            select(node)
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

export default Grid;
