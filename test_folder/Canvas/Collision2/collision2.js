// collision detection project 2

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

window.addEventListener('resize', () => {
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
  init();

});

let mouse = {
 x: undefined,
 y: undefined

};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;

});

let circleArray = [];
let radius = 20;

const colorArray = [
    'blue',
    'red',
    'green',
    'purple'
];


function getDistance(x1, y1, x2, y2){
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
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

      // Grab angle between the two colliding particles
      const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

      // Store mass in var for better readability in collision equation
      const m1 = particle.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(particle.velocity, angle);
      const u2 = rotate(otherParticle.velocity, angle);

      // Velocity after 1d collision equation
      const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1, -angle);
      const vFinal2 = rotate(v2, -angle);

      // Swap particle velocities for realistic bounce effect
      particle.velocity.x = vFinal1.x;
      particle.velocity.y = vFinal1.y;

      otherParticle.velocity.x = vFinal2.x;
      otherParticle.velocity.y = vFinal2.y;
  }
};

function CircleMaker(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: Math.random(),
    y: Math.random() 
  };
  this.mass = 1;
  this.opacity = 0;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();

  };

  this.update = (circleArray) => {
   
    for (let i = 0; i < circleArray.length; i++) {
      if (this === circleArray[i]) continue;
      if (getDistance(this.x, this.y, circleArray[i].x, circleArray[i].y) - radius * 2 < 0) {
        console.log('HIT');
        if (this.opacity == 0) {
          this.opacity = 0.2
        } else this.opacity = 0;
        if (circleArray[i].opacity == 0) {
          circleArray[i].opacity = 0.2;
        } else circleArray[i].opacity = 0;
        
        resolveCollision(this, circleArray[i]);
       
    }};

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
      this.velocity.x = -this.velocity.x
    };

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.velocity.y = -this.velocity.y
    };

   /* if (getDistance(this.x, this.y, mouse.x, mouse.y ) < 100 ) {
      this.opacity = 0.2;

    }else this.opacity = 0;*/

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
    
    };
  };

function init() {
    circleArray = [];
  for (let i = 0; i < 100; i++) {
    let x = (Math.random()* (canvas.width - 40)+20);
    let y = (Math.random()* (canvas.height - 40)+20);

    if (i != 0) {
      for (let j = 0; j < circleArray.length; j++) {
        if (getDistance(x, y, circleArray[j].x, circleArray[j].y) - radius * 2 < 0) {
          x = (Math.random()* (canvas.width - 40)+20);
          y = (Math.random()* (canvas.height - 40)+20);
          j = -1;
        };
        
      }
    }
    let color = colorArray[Math.floor(Math.random()*4)];
    circleArray.push(new CircleMaker(x, y, radius, color));
    circleArray[i].draw(); 
    
  }
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update(circleArray);
    
  }
};

init();
animate();