// script for basic "firework or explosion effect" using canvas and requestAnimationFrame function

// the Canvas variables and event listeners

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

let canvasDimensions = {
  x: window.innerWidth,
  y: window.innerHeight
};

function initCanvas() {
  canvas.width = canvasDimensions.x;
  canvas.height = canvasDimensions.y;
  canvas.style.backgroundColor = 'black'

}

addEventListener('resize', () => {
  canvasDimensions.x = window.innerWidth;
  canvasDimensions.y = window.innerHeight;
  initCanvas();
});

// the mouse variables and event listeners

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

window.addEventListener('mousemove', (event)=> {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})


// object constructors

class Particle {
  constructor({position, velocity, radius, color}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
  }

}

// program functions

let particles = [];
const particleCount = 350;

function initFirework(x, y) {
  const angleIncrement = (Math.PI * 2) / particleCount;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle({
    position:{
      x: x, 
      y: y 
    },
    velocity:{
      x: Math.cos(angleIncrement * i) * Math.random(), 
      y: Math.sin(angleIncrement * i) * Math.random()
    },
      radius: 4,
      color: 'blue'}
    ));
  }
  particles.forEach((particle)=>{
  particle.draw();
})

}

canvas.addEventListener('click', ()=>{
  initFirework(mouse.x, mouse.y)
})

function animate(){
  run = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle)=>{
    particle.update();
  })
}

initCanvas()
animate();



// initFirework()


// run when parsed
