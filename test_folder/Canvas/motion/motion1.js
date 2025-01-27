// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// variables

// event listeners
 addEventListener('keydown', (event)=> {
  switch (event.key) {
    case 'ArrowUp':
      sprite1.vy = 1;
      break;
    case 'ArrowDown':
      sprite1.vy = -1;
      break;
    case 'ArrowLeft':
      sprite1.vx = -1;
      break;
    case 'ArrowRight':
      sprite1.vx = 1;

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
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath(); 
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.draw();

  }
};

const sprite1 = new Sprite(60, 60, 8, 'black', 0, 0);
// functions

function animate(){
  runAnim = requestAnimationFrame(animate);
  sprite1.update();
}

// run when parsed
sprite1.draw();
animate();
console.log(sprite1);

