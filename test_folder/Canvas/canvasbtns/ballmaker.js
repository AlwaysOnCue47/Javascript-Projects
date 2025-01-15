
const canvas = document.getElementById('canvas');

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

const ctx = canvas.getContext('2d');

document.getElementById('popBtn').addEventListener('click', () => {
  init();
  animate();
} 
);

document.getElementById('clearScr').addEventListener('click', ()=> {
  window.cancelAnimationFrame(reAnim);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
);


function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {x:1, y:2};

  this.update = () => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();

  };

  this.draw = ()=>{
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

  };
};
let ball1;


function init() {
  ball1 = new Ball(100, 100, 30, 'red');
  ball1.draw();
}

function animate() {
  reAnim = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball1.update();
};
