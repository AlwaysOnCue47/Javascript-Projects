// Animation 2 script

const ball = document.getElementById("ball");
let isAnimating = false;
let directionX = 1;
let directionY = 1;
let posX = 1;
let posY = 1;
let X = 25; // time interval

const animate = () => {
  if (!isAnimating) return;

  posX += directionX;
  posY += directionY;

  ball.style.top = posY +"px";
  ball.style.left = posX +"px";

  if ((posY >= 350) || (posY <= 0)) {
    directionY = directionY * -1;
  }

  if ((posX >= 550) || (posX <= 0)){
    directionX = directionX * -1;
  }

  setTimeout(animate, X);
};

animate();

document.getElementById("start").addEventListener('click', () => {
  if (!isAnimating) {
  isAnimating = true;
  animate();
  }
});

document.getElementById("stop").addEventListener('click', () => {
  isAnimating = false;
});

document.getElementById("switch").addEventListener('click', () => {
  directionX = directionX * -1;
  directionY = directionY * -1;
});

document.getElementById("faster").addEventListener('click', () => {
  if (X == 5) return;
  if (X >= 10) {
    X = X -5;
  }
});

document.getElementById("slower").addEventListener('click', () => {
  if (X >= 35) return;
  X = X + 5;
});

document.getElementById("leftNudge").addEventListener('click', () => {
  if (posX >= 530) {
    return;
  }
  else {
    posX = posX + 20;
  }  
});

document.getElementById("rightNudge").addEventListener('click', () => {
  if (posX <= 20) {
    return;
  }
  else {
    posX = posX - 20;
  }  
});
  
  