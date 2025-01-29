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
  switch (event.key) {
    case 'ArrowUp':
      sprite1.vy = -4;
      sprite1.vx = 0;
      break;
    case 'ArrowDown':
      sprite1.vy = 4;
      sprite1.vx = 0;
      break;
    case 'ArrowLeft':
      sprite1.vx = -4;
      sprite1.vy = 0;
      break;
    case 'ArrowRight':
      sprite1.vx = 4;
      sprite1.vy = 0;
      break;
    case ' ':
      sprite1.vx = 0;
      sprite1.vy = 0;
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
    this.vx = vx;
    this.vy = vy;

  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath(); 
  }

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
    this.x += this.vx;
    this.y += this.vy;
    this.draw();

  }
};

const sprite1 = new Sprite(60, 60, spriteRadius, 'black', 0, 0);
// functions

let pillArray = []

function initPills() {
  for (let i = 0; i < 8; i++) {
    let x = (Math.random()*canvas.width - 20) + 20;
    let y = (Math.random()*canvas.height - 20) + 20;
    let pillRadius = 6;
    pillArray.push(new Sprite(x, y, pillRadius, 'red', 0, 0));
    pillArray[i].draw();
    
  }
};

function animate(){
  runAnim = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sprite1.update();
  for (let i = 0; i < pillArray.length; i++) {
    pillArray[i].update();
    
  }
};

// run when parsed
sprite1.draw();
initPills();
 animate();
console.log(sprite1);
console.log(canvas.width);
console.log(canvas.height);
console.log(window.devicePixelRatio);
