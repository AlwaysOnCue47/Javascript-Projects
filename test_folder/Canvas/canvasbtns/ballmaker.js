// the canvas 
const canvas = document.getElementById('canvas');

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

const ctx = canvas.getContext('2d');

// variables

const levelBox = document.getElementById('level');
const scoreBox = document.getElementById('score');
const missBox = document.getElementById('misses');

let points = 0;
let pointsTotal = 0;
let playerScore = 0;
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

  }
});

document.getElementById('clearScr').addEventListener('click', () => {
  if (isAnimating){
    window.cancelAnimationFrame(reAnim);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isAnimating = false;

  }
});

document.getElementById('shoot').addEventListener('click', () => {
  if (!fired && loaded){ 
    fired = true;
    loaded = false;
  }
});

document.getElementById('reload').addEventListener('click', () => {
  if ((!fired) && (isAnimating)){
    loaded = true;
    loadCannon();

  }
});

// object constructor 

function Ball(x, y, radius, color, vx, vy, radiusMorph) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.radiusMorph = radiusMorph;
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
      playerScore += -1;
      missBox.innerHTML = misses;
      scoreBox.innerHTML = playerScore;
      fired = false;
      console.log(playerScore);
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
  levelBox.innerHTML = level;
  scoreBox.innerHTML = playerScore;
  missBox.innerHTML = misses;
  switch (level) {
    case 1:
      points = 0;
      balls = [];
      for (let i = 0; i < 5; i++) {
      let x = (Math.random()* (canvas.width - 450)) +380;
      let y = (Math.random()* (canvas.height - 60)) +30;
      balls.push(new Ball(x, y, 30, 'red', 1, 2, 0));
      balls[i].draw();
      cannonBase = new Cannon(mouse.x, mouse.y, 0, 0);
      cannonBase.draw();
      console.log(balls);
      }
      break;

    case 2: 
      balls = [];
      for (let i = 0; i < 5; i++) {
      let x = (Math.random()* (canvas.width - 450)) +380;
      let y = (Math.random()* (canvas.height - 60)) +30;
      balls.push(new Ball(x, y, 30, 'green', 2, 4, 0));
      balls[i].draw();
      console.log(balls);
      }
      break;

    case 3:
      balls = [];
      for (let i = 0; i < 5; i++) {
      let x = (Math.random()* (canvas.width - 450)) +380;
      let y = (Math.random()* (canvas.height - 60)) +30;
      balls.push(new Ball(x, y, 30, 'blue', 1, 2, 1));
      balls[i].draw();
      console.log(balls);
      }
      break;

    case 4:
      balls = [];
      for (let i = 0; i < 5; i++) {
      let x = (Math.random()* (canvas.width - 450)) +380;
      let y = (Math.random()* (canvas.height - 60)) +30;
      balls.push(new Ball(x, y, 30, 'orange', 2, 4, 1));
      balls[i].draw();
      console.log(balls);
      }
      break;

    case 5:
      balls = [];
      for (let i = 0; i < 5; i++) {
      let x = (Math.random()* (canvas.width - 450)) +380;
      let y = (Math.random()* (canvas.height - 60)) +30;
      balls.push(new Ball(x, y, 20, 'purple', 3, 6, 0));
      balls[i].draw();
      console.log(balls);
      }
      break;
};
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
        pointsTotal += 10;
        playerScore += 10;
        fired = false;
        scoreBox.innerHTML = playerScore;
        missBox.innerHTML = misses;
        console.log(points);
        console.log(pointsTotal);
        console.log(misses);
        console.log(playerScore);

      }};
      balls[i].update();

    };
  
  if (pointsTotal == 200 && points == 50) {
    points = 0;
    window.cancelAnimationFrame(reAnim);
    isAnimating = false;
    level = 5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    animate();
    isAnimating = true;

    };

  if (pointsTotal == 150 && points == 50) {
    points = 0;
    window.cancelAnimationFrame(reAnim);
    isAnimating = false;
    level = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    animate();
    isAnimating = true;

    };

  if (pointsTotal == 100 && points == 50) {
    points = 0;
    window.cancelAnimationFrame(reAnim);
    isAnimating = false;
    level = 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    animate();
    isAnimating = true;

    };
    
  if (pointsTotal == 50 && points == 50) {
    points = 0;
    window.cancelAnimationFrame(reAnim);
    isAnimating = false;
    level = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    init();
    animate();
    isAnimating = true;

    };
  
  if (pointsTotal >= 250) { // when game ends
    window.cancelAnimationFrame(reAnim);
    isAnimating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    console.log("Total misses: " + misses);
    console.log("Player total score: " + playerScore);
    console.log("Click 'Start' to play again!");
    points = 0;
    pointsTotal = 0; 
    playerScore = 0; 
    misses = 0;
    level = 1;
    };
  };


// Run when parsed 
drawField();
