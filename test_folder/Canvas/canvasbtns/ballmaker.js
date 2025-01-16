
const canvas = document.getElementById('canvas');

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

const ctx = canvas.getContext('2d');

let isAnimating = false;

let mouse = {x:undefined, y: undefined};
document.addEventListener('mousemove', (event)=> {
  mouse.x = event.x;
  mouse.y = event.y;
});

document.getElementById('popBtn').addEventListener('click', () => {
  if (!isAnimating){
    init();
    animate();
    isAnimating = true;
    console.log(isAnimating);
    console.log(balls);
  }
  
} 
);

document.getElementById('clearScr').addEventListener('click', ()=> {
  if (isAnimating){
    window.cancelAnimationFrame(reAnim);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isAnimating = false;
    console.log(isAnimating);
    console.log(balls);
  }
}
);

document.getElementById('break').addEventListener('click', () => {
  balls.splice(0, 1);
  console.log(balls);
});

function getDistance(x1, y1, x2, y2){
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

};

function Ball(x, y, radius, color, vx, vy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {x:vx, y:vy};

  this.update = () => {
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

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

let blackBall = new Ball(200, 300, 30, 'black');
blackBall.draw();
let balls;


function init() {
  balls = [];
  for (let i = 0; i < 10; i++) {
    let x = (Math.random()* (canvas.width - 60)) +30;
    let y = (Math.random()* (canvas.height - 60)) +30;
    balls.push(new Ball(x, y, 30, 'red', 1, 2));
    balls[i].draw();
    
  }
  
};

function animate() {
    reAnim = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blackBall.x = mouse.x;
    blackBall.y = mouse.y;
    blackBall.draw()
    for (let i = 0; i < balls.length; i++) {
      if (getDistance(blackBall.x, blackBall.y, balls[i].x, balls[i].y) - blackBall.radius * 2 < 0) {
        balls[i].color = 'blue';
      }
      balls[i].update();
    };

  } ;
    
