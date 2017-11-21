let colors = ['#FFFF00', '#0000FF', '#9400D3', '#FF0000', '#00FF00']
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

class SinglePuyo {
    constructor(col = 3, row = 1) {
      this.color = randomColor();
      this.col = col;
      this.row = row;
    }
}  

export default SinglePuyo