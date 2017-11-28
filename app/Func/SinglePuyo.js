const colors = ['rgba(255,227,227,1)', 'rgba(255,253,218,1)', 'rgba(224,255,220,1)', 'rgba(204,255,246,1)', 'rgba(222,221,255,1)'];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

class SinglePuyo {
  constructor(col = 3, row = -1) {
    this.color = Math.floor(Math.random()*5)
    this.col = col;
    this.row = row;
  }
}

export default SinglePuyo;
