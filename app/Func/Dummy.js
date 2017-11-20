import d3 from 'd3';


var colors = ['#FFFF00', '#0000FF', '#9400D3', '#FF0000', '#00FF00']
function randomColor(d, i, colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

    div = 33,
    rows = 12,
    cols = 6,
    w = cols * div,
    h = rows * div,
    svg,
    svgnext,
    scoreID;


function puyo() {
    svg = d3
        .select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
}

function drawGrid() {
    for (var i = 1; i < rows; i++) {
        svg
            .append("line")
            .attr("x1", 0)
            .attr("y1", i * div)
            .attr("x2", w)
            .attr("y2", i * div)
            .attr("stroke", "lightgray")
            .attr("stroke-width", 0.5);
    }
    for (var j = 1; j < cols; j++) {
        svg
            .append("line")
            .attr("x1", j * div)
            .attr("y1", 0)
            .attr("x2", j * div)
            .attr("y2", h)
            .attr("stroke", "lightgray")
            .attr("stroke-width", 0.5);
    }
}
puyo()
drawGrid();
var row = svg.selectAll(".row")
    .data(gamedata)
    .enter().append("g")
    .attr("class", "row");

var column = row.selectAll(".square")
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
    .on("click", function (d) { console.log(d.color) })