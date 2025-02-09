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

    case "ArrowLeft": 
    playerSprite.velocity.x = -4;
    break;

    case "ArrowRight": 
    playerSprite.velocity.x = 4;
    break;

    case "ArrowDown": playerSprite.velocity.x = 0; playerSprite.velocity.y = 0;
    break;
  }
});

// class constructors

class Sprite {
  constructor(x, y, radius, color, vx = 0, vy = 0, location = [], counter = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {x: vx, y: vy};
    this.location = location;
    this.counter = counter;

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

    if (this.x >= 0 && this.x <= 180 && this.velocity.x == -4){
      this.velocity.y = -4;
    }

    if (this.x >= 0 && this.x <= 180 && this.velocity.x == 4){
      this.velocity.y = 4;
    }
    
    if (this.x <= canvas.width && this.x >= canvas.width - 180 && this.velocity.x == 4){
      this.velocity.y = -4;
    }

    if (this.x <= canvas.width && this.x >= canvas.width - 180 && this.velocity.x == -4){
      this.velocity.y = 4;
    }
    if (this.x >= 181 && this.x <= canvas.width - 181){
      this.velocity.y = 0;
      this.y = canvas.height - 15;
    }
   
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }

  ammoUpdate() {
    if (this.x <= canvas.width && this.x >= canvas.width - 180){
      this.velocity.x = -6;
    }
    if (this.x >= 0 && this.x <= 180){
      this.velocity.x = 6;
    }

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
    };
    if (this.y == this.location.y) {
      this.velocity.y = 0;
    };
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.draw();

    if (this.velocity.x == 0 && this.velocity.y == 0 ){
      this.location.x = Math.floor(Math.random()* (canvas.width-160) +30);
      this.location.y = Math.floor(Math.random()* (canvas.height-160) +30);
      console.log("change direction");
    };
    this.counter += 1;
    if (this.counter >= 400){
      initEnemyAmmo(this.x, this.y);
      this.counter = 0;
      console.log("Enemy fire!")
    };
  }

  enemyAmmoUpdate() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  };

  enemy2Update() {
    this.x += this.velocity.x;
    if (this.x > canvas.width){
      this.x = 0;
    }
    this.draw();
  }

  kaboom1Update() {
    this.radius += 3;
    if (this.radius > 16) {
      this.color = "red";
    }
    this.draw();
  }
};

// functions
let playerSprite;
function initPlayer(){
  playerSprite = new Sprite(canvas.width/2, canvas.height-15, 10, "green");
  playerSprite.draw();

};

let playerAmmo = [];
function initAmmo(x, y, vx, vy){
  if (playerAmmo.length < 3){
    playerAmmo.push(new Sprite(x, y, 4, "white", vx, vy));
  };
};

let enemyAmmo = [];
function initEnemyAmmo(x, y){
  enemyAmmo.push(new Sprite(x, y, 8, "darkorange", 0, 1));

}

let enemySprites = [];
function initEnemySprites() {
  for (let i = 0; i < 3; i++) {
    x1 = Math.floor(Math.random()*canvas.width);
    y1 = Math.floor(Math.random()*((canvas.height - 60)))
    x2 = Math.floor(Math.random()*canvas.width);
    y2 = Math.floor(Math.random()*((canvas.height - 60)))
    let location = {x: x2, y: y2};
    let timer = Math.floor(Math.random()*300);
    enemySprites.push(new Sprite(x1, y1, 16, "red", 0, 0, location, timer));
    enemySprites[i].draw();
  }
}

let enemySprites2 = [];
function initEnemySprites2() {
    x = 20;
    y = 20;
  for (let i = 0; i < 6; i++) {
    enemySprites2.push(new Sprite(x, y, 12, "purple", 2, 0));
    x += 60;
    y += 20;
    enemySprites2[i].draw();
    
  }
} 

let boomSprite = [];
function kaboom1(x, y) {
  x += -5;
  boomSprite.push(new Sprite(x, y, 5, "orange"));
  x += 10;
  boomSprite.push(new Sprite(x, y, 5, "orange"));
  x += -5;
  y += 5;
  boomSprite.push(new Sprite(x, y, 5, "orange"));
  for (let i = 0; i < boomSprite.length; i++) {
    boomSprite[i].draw();
    
  };

};


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

  for (let k = 0; k < enemyAmmo.length; k++) {
    enemyAmmo[k].enemyAmmoUpdate();
    if (enemyAmmo[k].y <= 0){
      enemyAmmo.splice(k, 1);
    }
  }

  for (let l = 0; l < enemySprites2.length; l++) {
    enemySprites2[l].enemy2Update();
    
  }

  for (let m = 0; m < boomSprite.length; m++) {
    boomSprite[m].kaboom1Update();
    if (boomSprite[m].radius >= 26) {
      boomSprite.splice(m, 1);
    }
  }
};

// run when parsed

initPlayer();
initEnemySprites()
initEnemySprites2();
kaboom1(100, 100);
 animate();