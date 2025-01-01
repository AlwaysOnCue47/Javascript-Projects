// canvas javascript

// variables
const canvas = document.getElementById('canvas1');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
let c = canvas.getContext('2d');

// logic


/*c.fillStyle = 'rgba(255, 255, 255, 0.5)';
c.fillRect(100, 100, 100, 100);

c.fillStyle = 'rgba(160, 200, 150, 0.8)';
c.fillRect(300, 50, 100, 100);

c.beginPath();
c.moveTo(50, 400);
c.lineTo(100, 500);
c.lineTo(160, 300);
c.strokeStyle = "rgb(29, 26, 196)";
c.stroke();*/


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

animate();
  
/*for (i = 0; i < 50; i++) {
Y = Math.random()* window.innerHeight;
X = Math.random()* window.innerWidth;
randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
console.log(randomColor);
c.beginPath();
c.arc(X, Y, 30, Math.PI * 2, false);
c.strokeStyle = randomColor;
c.stroke();
};*/

// event listeners