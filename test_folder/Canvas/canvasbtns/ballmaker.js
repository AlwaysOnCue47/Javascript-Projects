// the canvas 
const canvas = document.getElementById('canvas');

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

const ctx = canvas.getContext('2d');

// variables

let points = 0;
let isAnimating = false;
let balls;
let cannonBall;
let cannonBase;
let fired;
let loaded = false;
let mouse = {x: 200, y: 200};
let misses = 0;
let missLine = canvas.height + 10;
let level = 1;

// event listeners 

canvas.addEventListener('click', (event) => {
  if (!loaded){
    mouse.x = event.x;
    mouse.y = event.y;

  }  
});

document.getElementById('popBtn').addEventListener('click', () => {
  if (!isAnimating){
    init();
    animate();
    isAnimating = true;
    console.log(isAnimating);
    console.log(balls);

  }
});

document.getElementById('clearScr').addEventListener('click', () => {
  if (isAnimating){
    window.cancelAnimationFrame(reAnim);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isAnimating = false;
    console.log(isAnimating);
    console.log(balls);

  }
});

document.getElementById('shoot').addEventListener('click', () => {
  if (!fired && loaded){ 
    fired = true;
    loaded = false;
  }
  
});

document.getElementById('reload').addEventListener('click', () => {
  fired = false;
  loaded = true;
  loadCannon();

});

// object constructor 

function Ball(x, y, radius, color, vx, vy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.radiusMorph = 1;
  this.color = color;
  this.velocity = {
    x: vx,
    y: vy
  };

  this.mass = 1;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

  };

  this.update = () => {
    if (this.x - this.radius <= 350 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    if (this.radius >= 30 || (this.radius <= 5 && this.radius >> 1)){
      this.radiusMorph = -this.radiusMorph;
    } 

    this.radius += this.radiusMorph;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();

  };
  
};

function Cannon(x, y, vx, vy) {
  this.x = x;
  this.y =  y;
  this.radius = 10;
  this.color = 'black';
  this.velocity = {x:vx, y:vy};
  this.gravity = 0.5;
  this.mass = 1;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

  };

  this.update = ()=> {
    this.velocity.y += this.gravity;
    if (this.x + this.radius >= canvas.width){
      this.velocity.x = -this.velocity.x;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    if (this.y >= missLine){
      misses += 1;
      fired = false;
      console.log(misses);
    }
    this.draw();

  }
};

// functions 

function drawField() {
  ctx.beginPath();
  ctx.fillStyle = 'lightgreen'
  ctx.fillRect(0, 0, 350, canvas.height)
  ctx.closePath();

};

function loadCannon() {
    cannonBase.color = 'darkred';
    cannonBall = new Cannon(cannonBase.x, cannonBase.y, 15, -15);
    cannonBall.draw();
    console.log(cannonBall);

};

function shootCannon() {
    cannonBase.color = 'black';
    cannonBall.update();
  
};

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

};

function init() {
  points = 0;
  balls = [];
  for (let i = 0; i < 10; i++) {
    let x = (Math.random()* (canvas.width - 450)) +380;
    let y = (Math.random()* (canvas.height - 60)) +30;
    balls.push(new Ball(x, y, 30, 'red', 1, 2));
    balls[i].draw();

  }
  cannonBase = new Cannon(mouse.x, mouse.y, 0, 0);
  cannonBase.draw();
};

function animate() {
  reAnim = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawField();
  if (!loaded) {
    cannonBase.x = mouse.x;
    cannonBase.y = mouse.y;
    if (cannonBase.x >= 350) {
      cannonBase.x = 340;
    }
  };
  cannonBase.draw();

  if (fired) {
    shootCannon();
    
  };

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].radius == 0) continue; 
    if (fired) {
      if (getDistance(cannonBall.x, cannonBall.y, balls[i].x, balls[i].y) - balls[i].radius * 2 < 0) {
        balls[i].radiusMorph = 0;
        balls[i].radius = 0;
        points += 10;
        fired = false;
        console.log(points);

      }};
      balls[i].update();

    };
    
  if (points == 100) {
    window.cancelAnimationFrame(reAnim);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isAnimating = false;

    };   
  };


// Run when parsed 
drawField();
