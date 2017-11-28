class SinglePuyo {
  constructor(col = 3, row = 0) {
    this.color = Math.floor(Math.random()*5)
    this.col = col;
    this.row = row;
  }
}

export default SinglePuyo;
