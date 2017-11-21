class SinglePuyo {
    constructor(col = 3, row = -1) {
      const colors = ["yellow", "blue", "purple", "red", "green"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.col = col;
      this.row = row;
      this.stop = false;
    }
}  

export default SinglePuyo