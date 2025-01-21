// the canvas 
const canvas = document.getElementById('canvas');

canvas.height = 680;
canvas.width = 1400;

const ctx = canvas.getContext('2d');

// variables

const levelBox = document.getElementById('level');
const scoreBox = document.getElementById('score');
const missBox = document.getElementById('misses');

let points = 0;
let pointsTotal = 0;
let playerScore = 0;
let isAnimating = false;
let balls = [];
let cannonBall;
let cannonBase;
let fired;
let loaded = false;
let mouse = {x: 200, y: 200};
let misses = 0;
let missLine = canvas.height + 10;
let level = 1;
let type;

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
  this.maxRadius = radius;
  this.radiusMorph = radiusMorph;
  this.color = color;
  this.mass = 1;
  this.velocity = {
    x: vx,
    y: vy
  };

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

    if (this.radius >= this.maxRadius || (this.radius <= 5 && this.radius >> 1)){
      this.radiusMorph = -this.radiusMorph;
    } 

    this.radius += this.radiusMorph;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();

  };

  this.update2 = (balls) => {
    for (let i = 0; i < balls.length; i++) {
      if (this === balls[i]) continue;
      if (balls[i].radius <= 0) continue;
      if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - radius * 2 < 0) {
        resolveCollision(this, balls[i]);
       
    }};

    if (this.x - this.radius <= 350 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    if (this.radius >= this.maxRadius || (this.radius <= 5 && this.radius >> 1)){
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

  this.update = () => {
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

function rotate(velocity, angle) {
  const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
};

function resolveCollision(ball, otherBall) {
  const xVelocityDiff = ball.velocity.x - otherBall.velocity.x;
  const yVelocityDiff = ball.velocity.y - otherBall.velocity.y;

  const xDist = otherBall.x - ball.x;
  const yDist = otherBall.y - ball.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

      // Get angle between the two colliding objects
      const angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x);

      const m1 = ball.mass;
      const m2 = otherBall.mass;

      // Velocity before equation
      const u1 = rotate(ball.velocity, angle);
      const u2 = rotate(otherBall.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap object velocities for realistic bounce effect
      ball.velocity.x = vFinal1.x;
      ball.velocity.y = vFinal1.y;

      otherBall.velocity.x = vFinal2.x;
      otherBall.velocity.y = vFinal2.y;
  }
};

function respawnBalls(radius, color, vx, vy, morph) {
  balls = [];
  for (let i = 0; i < 5; i++) {
    let x = (Math.random()* (canvas.width - 450)) +380;
    let y = (Math.random()* (canvas.height - 60)) +30;
    if (i != 0) {
      for (let j = 0; j < balls.length; j++) {
        if (getDistance(x, y, balls[j].x, balls[j].y) - balls[j].radius * 2 < 0) {
          x = (Math.random()* (canvas.width - 450) +380);
          y = (Math.random()* (canvas.height - 60) +30);
          j = -1;
        };
        
      }
    }
    balls.push(new Ball(x, y, radius, color, vx, vy, morph));
    balls[i].draw();
    
  };
};

function nextLevel(L) {
  points = 0;
  window.cancelAnimationFrame(reAnim);
  isAnimating = false;
  level = L;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
  animate();
  isAnimating = true;

};

function init() {
  levelBox.innerHTML = level;
  scoreBox.innerHTML = playerScore;
  missBox.innerHTML = misses;
  switch (level) {
    case 1:
      respawnBalls(30, 'red', 1, -2, 0);
      cannonBase = new Cannon(mouse.x, mouse.y, 0, 0);
      cannonBase.draw();
      type = 2;
      animate();
      isAnimating = true;
      break;

    case 2: 
      type = 2;
      respawnBalls(25, 'green', 2, 4, 0);
      break;

    case 3:
      type = 1;
      respawnBalls(30, 'blue', -1, 2, 1);
      break;

    case 4:
      type = 1;
      respawnBalls(25, 'orange', 2, 4, 1);
      break;

    case 5:
      type = 2;
      respawnBalls(20, 'purple', 3, -6, 0);
      break;

    case 6:
      type = 1;
      respawnBalls(15, 'darkblue', -4, -8, 1);
      break;
    
    case 7:
      type = 2;
      balls = [];
      balls.push(new Ball(450, 200, 15, 'red', 3, -4, 0));
      balls.push(new Ball(450, 400, 15, 'orange', -3, 4, 1));
      balls.push(new Ball(450, 420, 10, 'purple', 6, -8, 0));
      balls.push(new Ball(500, 445, 10, 'green', -4, 6, 1));
      balls.push(new Ball(550, 100, 5, 'darkblue', 8, -4, 0));

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

      }};
      
      if (type == 2) {
        balls[i].update2(balls);
      }

      if (type == 1) {
      balls[i].update();
      }
    
    };
  
  if (pointsTotal == 300 && points == 50) {
    nextLevel(7);
  };

  if (pointsTotal == 250 && points == 50) {
    nextLevel(6);
    };
  
  if (pointsTotal == 200 && points == 50) {
    nextLevel(5);
    };
    
  if (pointsTotal == 150 && points == 50) {
    nextLevel(4);
    };

  if (pointsTotal == 100 && points == 50) {
    nextLevel(3);
    };
    
  if (pointsTotal == 50 && points == 50) {
    nextLevel(2);
    };
  
  if (pointsTotal >= 350) { // when game ends
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
  
  // init();
  // isAnimating = true;
  // nextLevel(7);
