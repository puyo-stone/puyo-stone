let colors = ['#ffe3e3', '#fffdda', '#e0ffdc', '#ccfff6', '#deddff']
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

class SinglePuyo {
    constructor(col = 3, row = 0) {
      this.color = randomColor();
      this.col = col;
      this.row = row;
    }
}  

export default SinglePuyo