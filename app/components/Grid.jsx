import React, { Component } from 'react';
import Board from '../Func/Board';
import { select } from 'd3-selection'

class Grid extends Component {
    constructor() {
        super();
        this.col = 6;
        this.row = 12;
        this.div = 33;
        this.w = this.col * this.div;
        this.h = this.row * this.div;
        //this.createGrid=this.createGrid.bind(this);
        this.drawGrid = this.drawGrid.bind(this);
        this.populate = this.populate.bind(this);
    }

    componentDidMount() {
        //this.createGrid();
        this.drawGrid();
        this.populate();
        console.log(this.node);
    }

    populate() {
        const node = this.node;
        var row = select(node)
            .selectAll(".row")
            .data(gamedata)
            .enter().append("g")
            .attr("class", "row");

        var column = select('.row')
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

    // createGrid() {
    //     const node = this.node;
    //     select(node)
    //         .append("svg")
    //         .attr("width", 198)
    //         .attr("height", 396)
    // }

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
            <svg ref={node => this.node = node} width={200} height={400}>
            </svg>
        )
    }
}

export default Grid;