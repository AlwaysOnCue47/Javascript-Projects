// canvas
const canvas = document.getElementById('canvas');
canvas.height = 420;
canvas.width = 680;
canvas.style.width = 680;
canvas.style.height = 420;
const ctx = canvas.getContext('2d');


// variables
const spriteRadius = 12;

// event listeners
 addEventListener('keydown', (event)=> {
  if (event.key == ' ' && !ammo) {
    newAmmo();
  }
  switch (event.key) {
    case 'ArrowUp':
      sprite1.velocity.y = -4;
      sprite1.velocity.x = 0;
      break;
    case 'ArrowDown':
      sprite1.velocity.y = 4;
      sprite1.velocity.x = 0;
      break;
    case 'ArrowLeft':
      sprite1.velocity.x = -4;
      sprite1.velocity.y= 0;
      break;
    case 'ArrowRight':
      sprite1.velocity.x = 4;
      sprite1.velocity.y = 0;
      break;
    case 'v':
      sprite1.velocity.x = 0;
      sprite1.velocity.y = 0;
      break;

  };
     
 });

// Constructors

class Sprite {
  constructor(x, y, radius, color, vx, vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {x: vx, y: vy};
    this.mass = 1;
  };

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath(); 
  };

  germUpdate() {
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.velocity.y = - this.velocity.y;
    }

    for (let i = 0; i < germsArray.length; i++) {
      if (this === germsArray[i]) continue;
      if (getDistance(this.x, this.y, germsArray[i].x, germsArray[i].y) - this.radius * 2 < 0){
        resolveCollision(this, germsArray[i])
      }
      
    };
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  };

  ammoUpdate() {
    if (this.y <= 0){
      ammo = false;
    }
    this.y += this.velocity.y;
    this.draw();
  };

  update() {
    if (this.x - spriteRadius <= 0) {
      this.x = spriteRadius;
      
    }
    if (this.x + spriteRadius >= canvas.width) {
      this.x = canvas.width - spriteRadius;
    }
    if (this.y - spriteRadius <= 0) {
      this.y = spriteRadius;
    }
    if (this.y + spriteRadius >= canvas.height){
      this.y = canvas.height - spriteRadius;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();

  };
};

const sprite1 = new Sprite(60, 60, spriteRadius, 'black', 0, 0);

// functions

let ammoSprite;
let ammo = false;

function newAmmo(){
  ammo = true;
  ammoSprite = new Sprite(sprite1.x, sprite1.y, 6, "darkred", 0, -8);
};

let pillArray = [];

function initPills() {
  for (let i = 0; i < 8; i++) {
    let x = (Math.random()*(canvas.width - 40)) + 20;
    let y = (Math.random()*(canvas.height - 40)) + 20;
    let pillRadius = 6;
    pillArray.push(new Sprite(x, y, pillRadius, 'red', 0, 0));
    pillArray[i].draw();
    
  }
};

let germsArray = [];

function initGerms() {
  for (let i = 0; i < 10; i++) {
    let x = (Math.random()*(canvas.width - 40)) + 20;
    let y = (Math.random()*(canvas.height - 40)) + 20;
    let germRadius = 12;
    germsArray.push(new Sprite(x, y, germRadius, 'green', 2, 1));
    germsArray[i].draw();
  }
};

function animate(){
  runAnim = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sprite1.update();

  for (let i = 0; i < pillArray.length; i++) {
    pillArray[i].update();
    
  };

  for (let j = 0; j < germsArray.length; j++) {
    germsArray[j].germUpdate();
    
  };

  if (ammo){
    ammoSprite.ammoUpdate();
  };

};

// Collision detection and collision resolution functions

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

// run when parsed
sprite1.draw();
initPills();
initGerms();
 // newAmmo();
  animate();
console.log(sprite1);
console.log(canvas.width);
console.log(canvas.height);
console.log(window.devicePixelRatio);
