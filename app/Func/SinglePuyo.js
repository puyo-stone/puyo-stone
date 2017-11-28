export const palettes = [
  ['#ffe3e3', '#fffdda', '#e0ffdc', '#ccfff6', '#deddff'],
  ['#deddff', '#fffdda', '#e0ffdc', '#ccfff6', '#ffe3e3']
];

const colors = ['#ffe3e3', '#fffdda', '#e0ffdc', '#ccfff6', '#deddff'];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

class SinglePuyo {
  constructor(col = 3, row = 0) {
    this.color = Math.floor(Math.random()*5)
    this.col = col;
    this.row = row;
  }
}

export default SinglePuyo;
