// canvas
const canvas = document.getElementById('canvas');
canvas.height = 420;
canvas.width = 680;
canvas.style.width = 680;
canvas.style.height = 420;
const ctx = canvas.getContext('2d');


// variables


// event listeners
 addEventListener('keydown', (event)=> {
  if (event.key == ' ' && !ammo) {
    newAmmo();
  }
  if (event.key == 'a') {
    boomHit(100, 100);
    kaBoom = true;
  }
  switch (event.key) {
    case 'ArrowUp':
      sprite1.velocity.y = -4;
      sprite1.velocity.x = 0;
      shotDirectionY = -8;
      shotDirectionX = 0;
      break;
    case 'ArrowDown':
      sprite1.velocity.y = 4;
      sprite1.velocity.x = 0;
      shotDirectionY = 8;
      shotDirectionX = 0;
      break;
    case 'ArrowLeft':
      sprite1.velocity.x = -4;
      sprite1.velocity.y= 0;
      shotDirectionY = 0;
      shotDirectionX = -8;
      break;
    case 'ArrowRight':
      sprite1.velocity.x = 4;
      sprite1.velocity.y = 0;
      shotDirectionY = 0;
      shotDirectionX = 8;
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
    for (let j = 0; j < germsArray.length; j++) {
      if (getDistance(this.x, this.y, germsArray[j].x, germsArray[j].y) - germsArray[j].radius * 2 < 0){
        germsArray.splice(j, 1);
        boomHit(this.x, this.y);
        kaBoom = true;
        ammo = false;
        for (let k = 0; k < germsArray.length; k++){
          germsArray[k].velocity.x += Math.sign(germsArray[k].velocity.x)
        }        
      }
    }

    if (this.y <= 0 || this.y >= canvas.height || this.x <= 0 || this.x >= canvas.width){
      ammo = false;
    }
    this.y += this.velocity.y;
    this.x += this.velocity.x;
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

let count = 0;
let kaBoom = false;
let boom1 =[];

class Explosion {
  constructor(x, y, radius, radiusMorph, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radiusMorph = radiusMorph;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.radius <= 18 && this.radius >= 8) {
      this.color = 'red';
    }
    if (this.radius >= 18) {
      this.color = 'orange';
    }

    this.radius += this.radiusMorph;
    this.draw();
    
    if (this.radius >= 26){
      count += 1;
      this.radius = 0;
    }
    if (count == 4){
      kaBoom = false;
      count = 0;
      boom1 = [];
    }
  }
};

// functions

function boomHit(x, y) {
  for (let i = 0; i < 2; i++) {
    x += -5;
    boom1.push(new Explosion(x, y, 2, 2, 'white'))
    boom1[i].draw();
    x += 15;
  }
  x += -20;
  for (let j = 0; j < 2; j++) {
    y += -5;
    boom1.push(new Explosion(x, y, 2, 2, 'white'))
    boom1[j].draw();
    y += 15;
    
  };
  console.log(boom1);
};

const spriteRadius = 12;
const sprite1 = new Sprite(60, 60, spriteRadius, 'black', 0, 0);

let ammoSprite;
let ammo = false;
let shotDirectionY = -8;
let shotDirectionX = 0;
let ammoCount = 0;

function newAmmo(){
  ammo = true;
  ammoSprite = new Sprite(sprite1.x, sprite1.y, 6, "darkred", shotDirectionX, shotDirectionY);
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
let germXSpeed = 2;

function initGerms() {
  for (let i = 0; i < 10; i++) {
    let x = (Math.random()*(canvas.width - 40)) + 20;
    let y = (Math.random()*(canvas.height - 40)) + 20;
    let germRadius = 12;
    germsArray.push(new Sprite(x, y, germRadius, 'green', germXSpeed, 1));
    germsArray[i].draw();
  }
};

function animate(){
  runAnim = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sprite1.update();

  if (kaBoom){
    for (let i = 0; i < boom1.length; i++){
      boom1[i].update();
    }
  }
  
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
//initPills();
initGerms();
 animate();
console.log(sprite1);
console.log(canvas.width);
console.log(canvas.height);
console.log(window.devicePixelRatio);
