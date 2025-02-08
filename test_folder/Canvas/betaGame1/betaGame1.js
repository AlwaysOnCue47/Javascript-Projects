// beta game 1 script

// the canvas

const canvas = document.getElementById('canvas');
canvas.height = 420;
canvas.width = 680;
canvas.style.width = 680;
canvas.style.height = 420;
canvas.style.backgroundColor = "black";
const ctx = canvas.getContext('2d');

// event listeners

document.addEventListener("keydown", (event)=> {
  switch (event.key){

    case " ": initAmmo(playerSprite.x, playerSprite.y, 0, -8);
    break;

    case "ArrowLeft": playerSprite.velocity.x = -3;
    break;

    case "ArrowRight": playerSprite.velocity.x = 3;
  }
});

// class constructors

class Sprite {
  constructor(x, y, radius, color, vx = 0, vy = 0, location = []) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {x: vx, y: vy};
    this.location = location;

  };

  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();

  };

  playerUpdate() {
    if (this.x >= canvas.width){
      this.x = 0;
    }
    if (this.x < 0 ){
      this.x = canvas.width - 1;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }

  ammoUpdate() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();

  }

  enemyUpdate() {
    if (this.location.x > this.x){
      this.velocity.x = 1;
    } else {this.velocity.x = -1};

    if (this.location.y > this.y) {
      this.velocity.y = 1;
    } else {this.velocity.y = -1};

    if (this.x == this.location.x) {
      this.velocity.x = 0;
      console.log("vx is 0");
    };
    if (this.y == this.location.y) {
      this.velocity.y = 0;
      console.log("vy is 0");
    };
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.draw();

    if (this.velocity.x == 0 && this.velocity.y == 0 ){
      this.location.x = Math.floor(Math.random()* canvas.width);
      this.location.y = Math.floor(Math.random()* canvas.height - 60)+30;
      console.log("yepp");
    };
  }
}

// functions
let playerSprite;
function initPlayer(){
  playerSprite = new Sprite(canvas.width/2, canvas.height-60, 10, "green", 1, 0);
  playerSprite.draw();

};

let playerAmmo = [];
function initAmmo(x, y, vx, vy){
  if (playerAmmo.length < 3){
    playerAmmo.push(new Sprite(x, y, 6, "white", vx, vy));
  };
};

let enemySprites = [];
function initEnemySprites() {
  for (let i = 0; i < 3; i++) {
    x1 = Math.floor(Math.random()*canvas.width);
    y1 = Math.floor(Math.random()*((canvas.height - 60)))
    x2 = Math.floor(Math.random()*canvas.width);
    y2 = Math.floor(Math.random()*((canvas.height - 60)))
    let location = {x: x2, y: y2};
    enemySprites.push(new Sprite(x1, y1, 25, "red", 0, 0, location));
    enemySprites[i].draw();
  }
}


// animation function
function animate(){
  animRe = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  playerSprite.playerUpdate();

  for (let i = 0; i < playerAmmo.length; i++) {
    playerAmmo[i].ammoUpdate();
    if (playerAmmo[i].y <= 0){
      playerAmmo.splice(i, 1);
    }
  }

  for (let j = 0; j < enemySprites.length; j++) {
    enemySprites[j].enemyUpdate();
    
  }
}

// run when parsed

initPlayer();
initEnemySprites()
animate();