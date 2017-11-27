<<<<<<< HEAD
const colors = ['#f4eee1', '#ebcfc4', '#e8e6d9', '#999999', '#e9ccb1']
=======
let colors = ['#ffe3e3', '#fffdda', '#e0ffdc', '#ccfff6', '#deddff']
>>>>>>> bdfa434b80fe7077196cd26711fb3b7e74ab43fd
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
