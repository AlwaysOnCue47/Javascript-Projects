// collision detection project 2

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

window.addEventListener('resize', () => {
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
  init();

});

let mouse = {
 x: undefined,
 y: undefined

};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;

});

let circleArray = [];
let dx = 1;
let dy = 1;
let radius = 20;
let color = 'blue'

function getDistance(x1, y1, x2, y2){
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

};

function CircleMaker(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = 2;
  this.dy = 2;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();

  };

  this.update = (circleArray) => {
   
    for (let i = 0; i < circleArray.length; i++) {
      if (this === circleArray[i]) continue;
      if (getDistance(this.x, this.y, circleArray[i].x, circleArray[i].y) - radius * 2 < 0) {
        console.log('collisions detected');
      
    }}

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
      this.dx = -this.dx
    };

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    };

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
    
  };
  };


function init() {
    circleArray = [];
  for (let i = 0; i < 10; i++) {
    let x = (Math.random()* (canvas.width - 40)+20);
    let y = (Math.random()* (canvas.height - 40)+20);

    if (i != 0) {
      for (let j = 0; j < circleArray.length; j++) {
        if (getDistance(x, y, circleArray[j].x, circleArray[j].y) - radius * 2 < 0) {
          x = (Math.random()* (canvas.width - 40)+20);
          y = (Math.random()* (canvas.height - 40)+20);
          j = -1;
        };
        
      }
    }


    circleArray.push(new CircleMaker(x, y, dx, dy, radius, color));
    circleArray[i].draw(); 
    
  }
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update(circleArray);
    
  }
};

init();
animate();


