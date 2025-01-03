// canvas javascript

// variables
const canvas = document.getElementById('canvas1'); // the canvas
canvas.height = document.documentElement.clientHeight; // canvas height
canvas.width = document.documentElement.clientWidth; // canvas width
let c = canvas.getContext('2d'); // canvas' "paint-brush"

/*
// Circle animation

X = Math.random() * canvas.width;
Y = Math.random() * canvas.height;
DX = 4;
DY = 4;
circleRadius = 40;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.arc(X, Y, circleRadius, Math.PI * 2, false);
  c.strokeStyle = 'rgb(0, 100, 255)';
  c.stroke();
  
  if (X + circleRadius >= innerWidth || X - circleRadius <=  0) {
    DX = -DX;
  }
  
  if (Y + circleRadius >= innerHeight || Y - circleRadius <= 0) {
    DY = -DY;
  }
  X += DX;
  Y += DY;
 
};
*/

// circle object constructure

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
  }

  this.update = function() {
    if (this.x + this.radius >= canvas.width || this.x - this.radius <=  0) {
      this.dx = -this.dx;
    }
    
    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();

  }
};

var circle1 = new Circle(200, 200, 4, 4, 40);

let circleArray = [];

for (let  i = 0;  i < 50; i++) {
  circleRadius = 40;
  X = Math.floor(Math.random() * (canvas.width - circleRadius * 2) + circleRadius + 1);
  Y = Math.floor(Math.random() * (canvas.height - circleRadius * 2) + circleRadius + 1);
  DX = Math.random() * 6;
  DY = Math.random() * 6;
  
  circleArray.push(new Circle(X, Y, DX, DY, circleRadius));
  
}

console.log(circleArray);

function animate2() {
  requestAnimationFrame(animate2);
  c.clearRect(0, 0, canvas.width, canvas.height); 
  
  for (let i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
};

animate2();



/* Random circle generator

for (i = 0; i < 50; i++) {
Y = Math.random()* window.innerHeight;
X = Math.random()* window.innerWidth;
randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
console.log(randomColor);
c.beginPath();
c.arc(X, Y, 30, Math.PI * 2, false);
c.strokeStyle = randomColor;
c.stroke();
};*/

/* Rectangle drawer

c.fillStyle = 'rgba(255, 255, 255, 0.5)';
c.fillRect(100, 100, 100, 100);

c.fillStyle = 'rgba(160, 200, 150, 0.8)';
c.fillRect(300, 50, 100, 100);

c.beginPath();
c.moveTo(50, 400);
c.lineTo(100, 500);
c.lineTo(160, 300);
c.strokeStyle = "rgb(29, 26, 196)";
c.stroke();*/

// event listeners