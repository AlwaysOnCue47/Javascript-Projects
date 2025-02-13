// beta game 1 script

// the canvas

const canvas = document.getElementById('canvas');
canvas.height = 420;
canvas.width = 680;
canvas.style.width = 680;
canvas.style.height = 420;
canvas.style.backgroundColor = "rgb(3, 0, 30)";
const ctx = canvas.getContext('2d');

// event listeners
let gameRunning = false;
document.getElementById('newGameBtn').addEventListener('click', () => newGame());

document.addEventListener("keydown", (event)=> {
  switch (event.key){

    case "ArrowUp":
      let x = 0;
      let y = -8;
        if (playerSprite.x <= canvas.width && playerSprite.x >= canvas.width - 100){
          x = -8;
          y = -6;
        }
        if (playerSprite.x >= 0 && playerSprite.x <= 100){
          x = 8;
          y = -6;
        }
      initAmmo(playerSprite.x, playerSprite.y, x, y);
      break;

    case "ArrowLeft": 
        switch (playerSprite.velocity.x) {
          case -4: 
          playerSprite.velocity.x = -5;
          break;
          case -5: 
          playerSprite.velocity.x = -6;
          break;
          case -6: 
          break;
          default: playerSprite.velocity.x = -4;
        }
      break;

    case "ArrowRight": 
      switch (playerSprite.velocity.x) {
        case 4: 
        playerSprite.velocity.x = 5;
        break;
        case 5: 
        playerSprite.velocity.x = 6;
        break;
        case 6:
        break;
        default: 
        playerSprite.velocity.x = 4;
      }
    break;

    case "ArrowDown":
      playerSprite.velocity.x = 0; playerSprite.velocity.y = 0;
      break;
    
    case 'a':
      enemyShieldsStatus = !enemyShieldsStatus;      
  }
});

// images 

let alien1 = document.getElementById('alien1');
let alien2 = document.getElementById('alien2');
let playerShip = document.getElementById('playerShip');
let playerShipRight = document.getElementById('playerShipRightTurn');
let playerShipLeft = document.getElementById('playerShipLeftTurn');
let background = document.getElementById('backgroundShip');

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
    this.shields = {strength: 0, hit: false, upCount: 0};
    this.hitPoints = 3;

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

    if (this.x >= 0 && this.x <= 100) {
      this.velocity.y = this.velocity.x;
    }
    
    if (this.x <= canvas.width && this.x >= canvas.width - 100){
      this.velocity.y = -this.velocity.x;
    }

    if (this.x >= 101 && this.x <= canvas.width - 101){
      this.velocity.y = 0;
      this.y = canvas.height - 45;
    }
    if (this.y <= 270){
      this.y = 271;
    }
   
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }

  playerShieldsUpdate() {
    this.x = playerSprite.x;
    this.y = playerSprite.y;
    if (this.shields.hit){
      this.color = "rgba(0, 194, 0, 0.5)"
      this.shields.upCount -= 1;
      if (this.shields.strength <= 3){ this.color = "rgba(95, 16, 16, 0.73)"}
      if (this.shields.upCount <= 0){
        this.shields.hit = false;
      }
    } 
    else{
      this.color = "rgba(0,0,0,0)"
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  }

  ammoUpdate() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.y <= 0){
      playerAmmo.splice(this, 1);
    }
    this.draw();
    for (let i = 0; i < enemySprites.length; i++) {
      if (getDistance(this.x, this.y, enemySprites[i].x, enemySprites[i].y) - enemySprites[i].radius * 2 < 0){
        playerAmmo.splice(this, 1);
        if (enemyShieldsStatus){
          kaboom2(this.x, this.y);
          enemySprites[i].y += -10;
          enemySprites[i].location.x -= 10;
        }
        if (!enemyShieldsStatus){
          kaboom1(this.x, this.y);
        }
      }
    }

    for (let j = 0; j < enemyAmmo.length; j++) {
      if (getDistance(this.x, this.y, enemyAmmo[j].x, enemyAmmo[j].y) - enemyAmmo[j].radius * 2 < 0){
        kaboom1(this.x, this.y);
        enemyAmmo.splice(j, 1);
        playerAmmo.splice(this, 1);
      }
    }

    for (let k = 0; k < enemySprites2.length; k++ ){
      if (getDistance(this.x, this.y, enemySprites2[k].x, enemySprites2[k].y)- enemySprites2[k].radius * 2 < 0){
        kaboom1(this.x, this.y);
        enemySprites2[k].hitPoints += -1;
        if (enemySprites2[k].hitPoints == 0){
          enemySprites2.splice(k, 1);
        }
        playerAmmo.splice(this, 1);
      }
    }
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
    if (this.counter >= 350){
      initEnemyAmmo(this.x, this.y);
      this.counter = 0;
      console.log("Enemy fire!")
    };
  }

  enemyAmmoUpdate() {
    switch (this.counter){
      case 0, 1, 2, 3, 4, 5: 
        this.color = "red"
        break;
      
      case 6, 7, 8, 9, 10:
        this.color ="darkorange"
        break;
      
      case 11:
        this.counter = 0;
        break;
    }
    this.counter += 1;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  };

  enemyShieldsUpdate(){
    this.draw();
  }

  enemy2Update() {
    this.x += this.velocity.x;
    if (this.x > canvas.width + 14){
      this.x = -14;
    }
    this.draw();
  }

  kaboom1Update() {
    this.radius += 3;
    if (this.radius > 18) {
      this.color = "red";
    }
    this.draw();
  }

  smokePuffUpdate(){
    this.radius += 1;
    this.draw()
    if (this.radius = 15){
      smokePuff.splice(this, 1);
    }
  }

  starFieldUpdate() {
    this.y += this.velocity.y;
    if (this.y > canvas.height + 5){
      this.y = -5;
      this.x = Math.random()* canvas.width;
    }
    this.draw();
  }
};

// functions with related variables

function shieldHit() {
  playerShields.shields.hit = true;
  playerShields.shields.upCount = 60;
  playerShields.shields.strength -= 1;
  if (playerShields.shields.strength <= 3) {
    playerShields.shields.upCount = 20;
  }
  console.log(playerShields.shields.strength);
};

let playerSprite;
function initPlayer(){
  playerSprite = new Sprite(canvas.width/2, canvas.height-45, 15, "rgba(0, 0, 0, 0)");
  playerSprite.draw();
  initPlayerShields();
};

let playerShields;
function initPlayerShields(){
  playerShields = new Sprite(canvas.width/2, canvas.height-45, 28, "rgba(0, 0, 0, 0)", 0, 0, [], 10);
  playerShields.shields.strength = 10;
  console.log(playerShields);
};

let enemyShields = []
let enemyShieldsStatus = false;
function initEnemyShields(){
  enemyShieldsStatus = true;
  for (let i = 0; i < enemySprites.length; i++) {
    enemyShields.push(new Sprite(enemySprites[i].x, enemySprites[i].y, 28, "rgba(109, 17, 133, 0.5)"))
    
  }
}

let playerAmmo = [];
function initAmmo(x, y, vx, vy){
  y += -15;
  if (playerAmmo.length < 3){
    playerAmmo.push(new Sprite(x, y, 3, "white", vx, vy));
  };
};

let enemyAmmo = [];
function initEnemyAmmo(x, y){
  enemyAmmo.push(new Sprite(x, y, 8, "darkorange", 0, 1,[], 1));
};

let enemySprites = [];
function initEnemySprites() {
  enemySprites = [];
  for (let i = 0; i < 3; i++) {
    x1 = Math.floor(Math.random()*canvas.width);
    y1 = Math.floor(Math.random()*((canvas.height - 60)))
    x2 = Math.floor(Math.random()*canvas.width);
    y2 = Math.floor(Math.random()*((canvas.height - 60)))
    let location = {x: x2, y: y2};
    let timer = Math.floor(Math.random()*200);
    enemySprites.push(new Sprite(x1, y1, 16, "red", 0, 0, location, timer));
    enemySprites[i].draw();
    ctx.drawImage(alien1, enemySprites[i].x - 22, enemySprites[i].y -22, 45, 45);
  }
  initEnemyShields();
};

let enemySprites2 = [];
function initEnemySprites2() {
  enemySprites2 = [];
    x = 20;
    y = 20;
  for (let i = 0; i < 6; i++) {
    enemySprites2.push(new Sprite(x, y, 12, "orange", 2, 0));
    x += 60;
    y += 20;
    enemySprites2[i].draw();
  }
};

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

let smallBoomSprite = []
function kaboom2(x, y) {
  smallBoomSprite.push(new Sprite(x, y, 5, "lightblue"));
  console.log("small boom");
}

function animatePlayer() {
  playerSprite.playerUpdate();
    if (playerSprite.x <= canvas.width && playerSprite.x >= canvas.width - 100){
      ctx.drawImage(playerShipLeft, playerSprite.x-24, playerSprite.y-24, 50, 50)
    }
    if (playerSprite.x >= 0 && playerSprite.x <= 100){
      ctx.drawImage(playerShipRight, playerSprite.x-24, playerSprite.y-24, 50, 50)
    }
    if (playerSprite.x > 100 && playerSprite.x < canvas.width -100){
      ctx.drawImage(playerShip, playerSprite.x-24, playerSprite.y-24, 50, 50);
    }
};

let starField = [];
function initStarField() {
  let x;
  let y;
  let vy;
  let radius;
  let color = ["rgba(119, 128, 0, 0.7)", "rgba(119, 128, 0, 0.5)", "rgba(119, 128, 0, 0.25)"];
  let thisColor;
  for (let i = 0; i < 75; i++) {
    x = Math.random()* canvas.width;
    y = Math.random()* canvas.height;
    vy = Math.random()* 1.4;
    radius = Math.random()*3;
    thisColor = color[Math.floor(Math.random()*3)];
    starField.push(new Sprite(x, y, radius, thisColor, 0, vy ));
    starField[i].draw();
  }
};

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

// animation function

function animate(){
  animRe = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(3,0,30,0.8)";
  ctx.fillRect(0, 0,canvas.width, canvas.height)

  for (let n = 0; n < starField.length; n++) {
    starField[n].starFieldUpdate();
  }

  if (gameRunning){
    ctx.drawImage(background, -10, canvas.height - 80, canvas.width+20, 200);
  
  animatePlayer();
  playerShields.playerShieldsUpdate();

  for (let i = 0; i < playerAmmo.length; i++) {
    playerAmmo[i].ammoUpdate();
    
  }

  for (let l = 0; l < enemySprites2.length; l++) {
    enemySprites2[l].enemy2Update();
    ctx.drawImage(alien2, enemySprites2[l].x - 25, enemySprites2[l].y -25, 50, 50);
  }

  if (enemyShieldsStatus){
    for (let es = 0; es < enemySprites.length; es++) {
      enemyShields[es].x = enemySprites[es].x;
      enemyShields[es].y = enemySprites[es].y;
      enemyShields[es].enemyShieldsUpdate();
    }
  }

  for (let j = 0; j < enemySprites.length; j++) {
    enemySprites[j].enemyUpdate();
    ctx.drawImage(alien1, enemySprites[j].x - 23, enemySprites[j].y -23, 45, 45);
  }

  for (let k = 0; k < enemyAmmo.length; k++) {
    spliceThis = false;
    enemyAmmo[k].enemyAmmoUpdate();
    if ((getDistance(enemyAmmo[k].x, enemyAmmo[k].y, playerShields.x, playerShields.y) - playerShields.radius *2 < 0) && (playerShields.shields.strength > 0)){
      shieldHit();
      kaboom2(enemyAmmo[k].x, enemyAmmo[k].y);
      spliceThis = true;
    }
    if (enemyAmmo[k].y >= canvas.height){
      console.log("boom!")
      kaboom1(enemyAmmo[k].x, enemyAmmo[k].y);
      spliceThis = true;
    };

    if ((getDistance(enemyAmmo[k].x, enemyAmmo[k].y, playerSprite.x, playerSprite.y)- playerSprite.radius*2 < 0)){
      kaboom2(enemyAmmo[k].x, enemyAmmo[k].y);
      spliceThis = true;
    }
    if (spliceThis){
      enemyAmmo.splice(k, 1);
    }
  }

  for (let m = 0; m < boomSprite.length; m++) {
    boomSprite[m].kaboom1Update();
    if (boomSprite[m].radius >= 26) {
      boomSprite.splice(m, 1);
    }
  }

  for (let sb = 0; sb < smallBoomSprite.length; sb++) {
    smallBoomSprite[sb].kaboom1Update();
    if (smallBoomSprite[sb].radius >= 20) {
      smallBoomSprite.splice(sb, 1);
    }
  }
  }
};


function newGame(){
  cancelAnimationFrame(animRe);
  gameRunning = true;
  initPlayer();
  initEnemySprites()
  initEnemySprites2();
  animate()

}

// run when parsed
initStarField();
animate();
