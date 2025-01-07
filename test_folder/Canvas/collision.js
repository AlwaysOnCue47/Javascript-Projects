// collision detection

// Variables

const canvas = document.getElementById('canvas3');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
let c = canvas.getContext('2d');

let mouse = {
  x: 200,
  y: 200

};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});



window.addEventListener('resize', () => {
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
  init();

});

// Objects

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = ()=> {
    this.draw();
  };

  this.draw = ()=> {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
};

let circle1;
let circle2;
function init() {
  c.clearRect(0,0,canvas.height, canvas.width);
  circle1 = new Circle(canvas.width / 2, canvas.height / 2, 35, 'darkgreen');
  circle2 = new Circle(undefined, undefined, 10, 'darkred');
  

};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

}
 console.log(mouse.x);
 console.log(mouse.y);
init();
animate();