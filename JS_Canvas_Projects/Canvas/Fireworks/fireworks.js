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

// the mouse variables and event listener

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
    this.alpha = 1;
  }

  draw(){
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update(){
    this.velocity.y += gravity;
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
    this.alpha -= 0.005;
  }
}

// program functions and variables

let particles = [];
const particleCount = 330;
const particleCount2 = 120;
const gravity = 0.01;
const friction = 0.99;

function initFirework(x, y, count, power) {
  const angleIncrement = (Math.PI * 2) / count;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle({
    position:{
      x: x, 
      y: y 
    },
    velocity:{
      x: Math.cos(angleIncrement * i) * Math.random() * power, 
      y: Math.sin(angleIncrement * i) * Math.random() * power
    },
      radius: 3,
      color: `hsl(${Math.random() * 360}, 50%, 50%)`}
    ));
  }
  particles.forEach((particle)=>{
    particle.draw();
  })
}

function initFirework2(x, y) {
  const angleIncrement = (Math.PI * 2) / particleCount2;
  let thisColor = Math.floor(Math.random()*340)
  for (let i = 0; i < particleCount2; i++) {
    
    particles.push(new Particle({
    position:{
      x: x, 
      y: y 
    },
    velocity:{
      x: Math.cos(angleIncrement * i) * Math.random() * 8, 
      y: Math.sin(angleIncrement * i) * Math.random() * 8
    },
      radius: 3,
      color: `hsl(${Math.random() * 20 + thisColor}, 80%, 50%)`}
    ));
  }
  particles.forEach((particle)=>{
    particle.draw();
  })
}

canvas.addEventListener('click', ()=>{
  randomFirework = Math.floor(Math.random()*2)
  
  switch (randomFirework) {
    case 0:
      initFirework(mouse.x, mouse.y, particleCount,  4)
      break
    case 1:
      initFirework2(mouse.x, mouse.y)
      break
  }
  
  console.log(particles); 
})

function animate(){
  run = requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i)=>{
    if (particle.alpha > 0) {
      particle.update();
    } else {
      particles.splice(i, 1);
    }
  })
}

// run when parsed

initCanvas()
animate();