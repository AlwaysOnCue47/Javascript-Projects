// gravity script

// variables 
const canvas = document.getElementById('canvas2');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
let c = canvas.getContext('2d');
let ballArray = [];

let gravity = .8;
let friction = 0.94;

let colorArray = [
  '#ffaa34',
  '#aff893',
  '#00bbff',
  '#4411aa',
  '#ff1100',
  '#e3fa2',
  '#0abbc3',
];

window.addEventListener('resize', (event) => {
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
  init();
});

// Objects

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = ()=> {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * friction;
    }else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw();
  }

  this.draw = ()=> {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
};

function init() {
  ballArray = [];
  for (let i = 0; i < 50; i++) {
    x = 30 + (Math.random() * (canvas.width - 60));
    y = 30 + (Math.random() * (canvas.height - 100 ));
    color = colorArray[Math.floor(Math.random()*colorArray.length)];
    ballArray.push(new Ball(x, y, 1, 1, 30, color));
    
  }
};

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  for (i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
    
  }
};

init();
console.log(ballArray);
animate();


