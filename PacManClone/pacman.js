// Script for Pacman Clone Game

// The Canvas

const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'black';

// constructors 

class Boundary {
  static width = 40;
  static height = 40;
  constructor({position}) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
};



// variables

const map = [
  ['-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-']
];

const bounderies = [];

map.forEach((row, i) =>{
  row.forEach((symbol, j) => {
    switch (symbol){
      case '-':
        bounderies.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            }
          })
        )
        break;
      case ' ':
        break;
      
    }
  })

})


// const boundary = new Boundary({
//   position:{
//     x:0, 
//     y:0
//   }
// });

// boundary.draw();

bounderies.forEach((boundary) => {
  boundary.draw()
});