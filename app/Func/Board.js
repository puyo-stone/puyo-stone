import d3 from "d3";

class Board {
    constructor(node,grid) {
      this.col = 6;
      this.row = 12;
      this.grid = grid ? grid : this.createNewGrid(this.col, this.row);
      this.puyos = [];
      this.score = 0;
      this.div = 33;
      this.w = this.col * this.div;
      this.h = this.row * this.div;
      this.node = node;
    }
    createNewGrid(col, row) {
      const defaultGrid = [];
      for (let i = 0; i < row; i++) {
        defaultGrid.push(new Array(col).fill(null));
      }
      return defaultGrid;
    }

    createNewBoard() {
    svg = d3
      .select(this.node)
      .append("svg")
      .attr("width", this.w)
      .attr("height", this.h)
  }

    drawGrid() {
    for (var i = 1; i < this.row; i++) {
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", i * this.div)
        .attr("x2", this.w)
        .attr("y2", i * this.div)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 0.5);
    }
    for (var j = 1; j < this.col; j++) {
      svg
        .append("line")
        .attr("x1", j * this.div)
        .attr("y1", 0)
        .attr("x2", j * this.div)
        .attr("y2", this.h)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 0.5);
    }
  }

    populateGrid(puyo) {
      this.grid[puyo.row][puyo.col] = puyo;
    }

}

export default Board;
