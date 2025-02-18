// beta game 1 script

// the canvas

const canvas = document.getElementById('canvas');
canvas.height = 420;
canvas.width = 680;
canvas.style.width = 680;
canvas.style.height = 420;
canvas.style.backgroundColor = "rgb(3, 0, 30)";
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

// event listeners

canvas.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

document.getElementById('canvas').addEventListener('click', () => {
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
  initAmmo(playerSprite.x, playerSprite.y, x, y, 2);
});

document.getElementById('newGameBtn').addEventListener('click', () =>{
  newGame(1);
} );

document.addEventListener("keydown", (event)=> {
  switch (event.key){

    case 'a':
      kaboom2(200, 200);;  
      break;
    case 's':
      initExplosion(200, 200);
      break;
    case 'd':
      kaboom1(200, 200);
      break;
    case 'f':
      initSmallExplosion(200, 200);
      break;
    case 'p':
      gameRunning = !gameRunning
  }
});

// images 

let alien1 = document.getElementById('alien1');
let alien2 = document.getElementById('alien2');
let alien3 = document.getElementById('alien3');
let alien4 = document.getElementById('alien4');
let playerShip = document.getElementById('playerShip');
let playerShipRight = document.getElementById('playerShipRightTurn');
let playerShipLeft = document.getElementById('playerShipLeftTurn');
let background = document.getElementById('backgroundShip');

// other variables

let mouse = {x: 200, y: 200};

canvas.addEventListener('mousemove', (event)=> { // mouse position on the canvas 
mouse.x = event.clientX - rect.left;
mouse.y = event.clientY; - rect.top;
})

// class constructors

class Sprite {
  constructor(x, y, radius, color, vx = 0, vy = 0, location = [], counter = 0) {
    this.x = x;
    this.y = y;
    this.startingX = x;
    this.startingY = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {x: vx, y: vy};
    this.location = location;
    this.counter = counter;
    this.shields = {strength: 0, hit: false, upCount: 0};
    this.hitPoints = 10;
    this.radians = 0
    this.id = "object type";
  };

  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  };

  playerUpdate() {

    if (this.x >= 0 && this.x <= 100) {
      this.y = this.x + 270;
    }

    if (this.x >= 580 && this.x <= canvas.width) {
      this.y = -(this.x - 580) + 370;
    }

    if (this.x <= 1){this.x == 1};
    if (this.x >= canvas.width){this.x = canvas.width -1};
    if (this.x >= 101 && this.x <= 579) {this.y == canvas.height - 50;}
    
    this.startingX += (mouse.x - this.startingX) *0.10;
    this.x = this.startingX;

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

   this.draw();
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
          enemySprites[i].x += Math.floor((Math.random()*10));
        }
        if (!enemyShieldsStatus){
          kaboom1(this.x, this.y);
          enemySprites[i].hitPoints += -1
          if (enemySprites[i].hitPoints <= 0){
            initExplosion(enemySprites[i].x, enemySprites[i].y);
            enemySprites.splice(i, 1);
          }
        }
      }
    }

    for (let m = 0; m < enemySprites4.length; m++) {
      if (getDistance(this.x, this.y, enemySprites4[m].x, enemySprites4[m].y) - enemySprites4[m].radius * 2 < 0){
        playerAmmo.splice(this, 1);
        if (enemyShieldsStatus2){
          kaboom2(this.x, this.y);
          enemySprites4[m].y += -10;
          enemySprites4[m].x += Math.floor((Math.random()*10));
        }
        if (!enemyShieldsStatus2){
          kaboom1(this.x, this.y);
          enemySprites4[m].hitPoints += -1
          if (enemySprites4[m].hitPoints <= 0){
            initExplosion(enemySprites4[m].x, enemySprites4[m].y);
            enemySprites4.splice(m, 1);
          }
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
        if (enemySprites2[k].hitPoints <= 0){
          initSmallExplosion(enemySprites2[k].x, enemySprites2[k].y);
          enemySprites2.splice(k, 1);
        }
        playerAmmo.splice(this, 1);
      }
    }

    for (let l = 0; l < enemySprites3.length; l++) {
      if (getDistance(this.x, this.y, enemySprites3[l].x, enemySprites3[l].y)- enemySprites3[l].radius * 2 < 0){
        kaboom1(this.x, this.y);
        enemySprites3[l].hitPoints += -1;
        if (enemySprites3[l].hitPoints <= 0){
          initSmallExplosion(enemySprites3[l].x, enemySprites3[l].y);
          enemySprites3.splice(l, 1);
        }
        playerAmmo.splice(this, 1);
      }
    }

    for (let m = 0; m < enemySprites4.length; m++) {
      if (getDistance(this.x, this.y, enemySprites4[m].x, enemySprites4[m].y)- enemySprites4[m].radius * 2 < 0){
        kaboom1(this.x, this.y);
        enemySprites4[m].hitPoints += -1;
        if (enemySprites4[m].hitPoints <= 0){
          initSmallExplosion(enemySprites4[m].x, enemySprites4[m].y);
          enemySprites4.splice(m, 1);
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
    };
    this.counter += 1;
    if (this.counter >= 350){
      switch (this.id){
        case "redAlien":
          initEnemyAmmo(this.x, this.y, 3);
          this.counter = Math.floor(Math.random()*50);
          break;
        case "greenAlien":
          initEnemyAmmo(this.x, this.y, 2);
          this.counter = Math.floor(Math.random()*50);
      };
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
  }

  enemyShieldsUpdate(){
    this.draw();
  }

  enemy2Update() {
    this.x += this.velocity.x;
    if (this.x <= -14){
      this.x = canvas.width + 14;
    }
    this.draw();
  }

  enemy3Update() {
    switch (this.counter){
      case 0, 1, 2, 3, 4, 5: 
        this.color = "green"
        break;
      
      case 6, 7, 8, 9, 10:
        this.color ="orange"
        break;
      
      case 11:
        this.counter = 0;
        break;
    }
    this.counter += 1;
    this.radians += this.velocity.y;
    this.y = this.startingY + Math.cos(this.radians)*50;
    this.x = this.startingX + Math.sin(this.radians)*50;
    this.draw(); 
    this.startingX += 1;
    if (this.startingX > canvas.width + 100){
      this.startingX = -20;
    }
  }

  kaboom1Update() {
    this.radius += 3;
    if (this.radius > 18) {
      this.color = "red";
    }
    this.draw();
  }

  explosionUpdate(){
    this.radius += 1;
    if (this.radius > 10) {
      this.color = "rgba(179, 153, 9, 0.6)"
    }
    if (this.radius > 22) {
      this.color = "rgba(185, 15, 15, 0.6)";
    }
    this.draw();
    
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

let shipHitPoints;
let playerSprite;
function initPlayer(){
  playerSprite = new Sprite(canvas.width/2, canvas.height-50, 15, "rgba(0, 0, 0, 0)");
  shipHitPoints = 8;
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
let enemyShields2 =[];
let enemyShieldsStatus = false;
let enemyShieldsStatus2 = false;
function initEnemyShields(){
  if (enemySprites.length > 0){
    enemyShieldsStatus = true;
  for (let i = 0; i < enemySprites.length; i++) {
    enemyShields.push(new Sprite(enemySprites[i].x, enemySprites[i].y, 28, "rgba(109, 17, 133, 0.5)"));
    }
  }
  
  if (enemySprites4.length > 0) {
    enemyShieldsStatus2 = true;
    for (let j = 0; j < enemySprites4.length; j++) {
      enemyShields2.push(new Sprite(enemySprites4[j].x, enemySprites4[j].y, 28, "rgba(20, 145, 15, 0.5)"));
    }
  }
};

let playerAmmo = [];
function initAmmo(x, y, vx, vy, type = 1){
  switch (type){
    case 1:
      y += -15;
      if (playerAmmo.length < 3){
        playerAmmo.push(new Sprite(x, y, 3, "rgb(8, 253, 0)", vx, vy));
      }
      break;
    case 2:
      y += -15;
      if (playerAmmo.length < 6 ){
        x += -15
        playerAmmo.push(new Sprite(x, y, 3, "rgb(200, 255, 252)", vx, vy));
        x += 30
        playerAmmo.push(new Sprite(x, y, 3, "rgb(200, 255, 252)", vx, vy));
      }
      break;
  }
};

let enemyAmmo = [];
function initEnemyAmmo(x, y, vy){
  enemyAmmo.push(new Sprite(x, y, 8, "darkorange", 0, vy,[], 1));
};

let enemySprites = [];
function initEnemySprites(howMany, hitPoints, shotTimer) {
  enemySprites = [];
  for (let i = 0; i < howMany; i++) {
    x1 = Math.floor(Math.random()*canvas.width);
    y1 = -15;
    x2 = Math.floor(Math.random()*canvas.width);
    y2 = Math.floor(Math.random()*((canvas.height - 60)))
    let location = {x: x2, y: y2};
    let timer = Math.floor(Math.random()*shotTimer);
    enemySprites.push(new Sprite(x1, y1, 16, "rgba(0,0,0,0)", 0, 0, location, timer));
    enemySprites[i].draw();
    enemySprites[i].hitPoints = hitPoints;
    enemySprites[i].id ="greenAlien";
    ctx.drawImage(alien1, enemySprites[i].x - 22, enemySprites[i].y -22, 45, 45);
  }
  initEnemyShields();
};

let enemySprites2 = [];
function initEnemySprites2(howMany, hitPoints) {
  enemySprites2 = [];
    x = canvas.width + 300;
    y = 20;
  for (let i = 0; i < howMany; i++) {
    enemySprites2.push(new Sprite(x, y, 12, "orange", -2, 0));
    x += -60;
    y += 20;
    enemySprites2[i].draw();
    enemySprites2[i].hitPoints = hitPoints;
  }
};

let enemySprites3 = []
function initEnemySprites3(howMany, hitPoints){
  x = -30;
  y = 100;
  for (let i = 0; i < howMany; i++) {
    enemySprites3.push(new Sprite(x, y, 12, "rgba(0,0,0,0)", 2, .05));
    enemySprites3[i].hitPoints = hitPoints;
    enemySprites3[i].draw();
    x += -130;
  }
};

let enemySprites4 = []
function initEnemySprites4(howMany, hitPoints, shotTimer){

  enemySprites4 = [];
  for (let i = 0; i < howMany; i++) {
    x1 = Math.floor(Math.random()*canvas.width);
    y1 = -15;
    x2 = Math.floor(Math.random()*canvas.width);
    y2 = Math.floor(Math.random()*((canvas.height - 60)))
    let location = {x: x2, y: y2};
    let timer = Math.floor(Math.random()*shotTimer);
    enemySprites4.push(new Sprite(x1, y1, 16, "red", 0, 0, location, timer));
    enemySprites4[i].draw();
    enemySprites4[i].hitPoints = hitPoints;
    enemySprites4[i].id = "redAlien";
    ctx.drawImage(alien4, enemySprites4[i].x - 22, enemySprites4[i].y -22, 45, 45);
  }
  initEnemyShields();
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

let smallBoomSprite = []
function kaboom2(x, y) {
  smallBoomSprite.push(new Sprite(x, y, 5, "lightblue"));
  console.log("small boom");
};

let explosionSprite = [];
function initExplosion(x, y) {
  let startingX = x;
  let startingY = y;

  let explosionRadius = 12;
  for (let i = 0; i < 6; i++) {
    x += 10;
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(185, 15, 15, 0.6)"))
    explosionRadius += -2;
  }
  explosionRadius = 12;
  x = startingX;
  for (let j = 0; j < 6; j++) {
    x += -10;
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(185, 15, 15, 0.6)"))
    explosionRadius += -2;
  }
  explosionRadius = 12;
  x = startingX;
  for (let k = 0; k < 6; k++) {
    y += 10;
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(185, 15, 15, 0.6)"))
    explosionRadius += -2;
  }
  y = startingY;
  explosionRadius = 12;
  for (let l = 0; l < 6; l++) {
    y += -10;
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(185, 15, 15, 0.6)"))
    explosionRadius += -2;
  }
  initSmallExplosion(startingX, startingY);
};

function initSmallExplosion(x, y){
  let startingX = x;
  let startingY = y;
  explosionRadius = 16;
  for (let m = 0; m < 3; m++) {
    y += 10
    x += 10
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(45, 2, 58, 0.8)"));
    explosionRadius += -4;
  }
  explosionRadius = 16;
  y = startingY;
  x = startingX;
  for (let n = 0; n < 3; n++) {
    y += 10
    x += -10
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(45, 2, 58, 0.8)"));
    explosionRadius += -4;
  }
  explosionRadius = 16;
  y = startingY;
  x = startingX;
  for (let p = 0; p < 3; p++) {
    y += -10
    x += 10
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(45, 2, 58, 0.8)"));
    explosionRadius += -4;
  }
  explosionRadius = 16;
  y = startingY;
  x = startingX;
  for (let q = 0; q < 3; q++) {
    y += -10
    x += -10
    explosionSprite.push(new Sprite(x, y, explosionRadius, "rgba(45, 2, 58, 0.8)"));
    explosionRadius += -4;
  }
};

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
    playerShields.playerShieldsUpdate();
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

// animation functions

function animateEnemies(){
  
  if (enemySprites2.length > 0){
    for (let l = 0; l < enemySprites2.length; l++) {
      enemySprites2[l].enemy2Update();
      ctx.drawImage(alien2, enemySprites2[l].x - 25, enemySprites2[l].y -25, 50, 50);
    }
  }

  if (enemySprites.length > 0){
    for (let j = 0; j < enemySprites.length; j++) {
      enemySprites[j].enemyUpdate();
      ctx.drawImage(alien1, enemySprites[j].x - 23, enemySprites[j].y -23, 45, 45);
    }
  }

  if (enemySprites3.length > 0){
    for (let e3 = 0; e3 < enemySprites3.length; e3++) {
      enemySprites3[e3].enemy3Update();
      ctx.drawImage(alien3, enemySprites3[e3].x - 35, enemySprites3[e3].y -32, 68, 68);
    }
  }

  if (enemySprites4.length > 0){
    for (let k = 0; k < enemySprites4.length; k++) {
      enemySprites4[k].enemyUpdate();
      ctx.drawImage(alien4, enemySprites4[k].x - 23, enemySprites4[k].y -23, 45, 45);
    }
  }
  animateEnemyAmmo();
};

function animateExplosions(){
  if (boomSprite.length > 0 ){
    for (let m = 0; m < boomSprite.length; m++) {
      boomSprite[m].kaboom1Update();
      if (boomSprite[m].radius >= 26) {
        boomSprite.splice(m, 1);
      }
    }
  }
  
  if (smallBoomSprite.length > 0){
    for (let sb = 0; sb < smallBoomSprite.length; sb++) {
      smallBoomSprite[sb].kaboom1Update();
      if (smallBoomSprite[sb].radius >= 20) {
        smallBoomSprite.splice(sb, 1);
      }
    }
  }
  
  if (explosionSprite.length > 0 ){
    for (let exp = 0; exp < explosionSprite.length; exp++){
      explosionSprite[exp].explosionUpdate();
      if (explosionSprite[exp].radius >= 24){
        explosionSprite.splice(exp, 1);
      }
    }
  }
};


let shipExplosionTimer = 0; 
function animateEnemyAmmo() {
  for (let k = 0; k < enemyAmmo.length; k++) {
    spliceThis = false;
    enemyAmmo[k].enemyAmmoUpdate();
    if ((getDistance(enemyAmmo[k].x, enemyAmmo[k].y, playerShields.x, playerShields.y) - playerShields.radius *2 < 0) && (playerShields.shields.strength > 0)){
      shieldHit();
      kaboom2(enemyAmmo[k].x, enemyAmmo[k].y);
      spliceThis = true;
    }

    if ((getDistance(enemyAmmo[k].x, enemyAmmo[k].y, playerSprite.x, playerSprite.y)- playerSprite.radius*2 < 0)){
      kaboom2(enemyAmmo[k].x, enemyAmmo[k].y);
      spliceThis = true;
      playerSprite.hitPoints += -1;
      if (playerSprite.hitPoints == 0){ playerDead();};
    }

    if (enemyAmmo[k].y >= canvas.height){
      console.log("boom!")
      kaboom1(enemyAmmo[k].x, enemyAmmo[k].y);
      spliceThis = true;
      shipHitPoints += -1;
      if (shipHitPoints <= 0 ){
        playerDead();
      }
    };

    if (spliceThis){
      enemyAmmo.splice(k, 1);
    }
  }
};

function animate(){
  animRe = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(3,0,30,0.8)";
  ctx.fillRect(0, 0,canvas.width, canvas.height)

  for (let n = 0; n < starField.length; n++) {
    starField[n].starFieldUpdate();
  }
  ctx.drawImage(background, -10, canvas.height - 80, canvas.width+20, 200);

  if (gameRunning){
  
    if (playerSprite.hitPoints >= 1){
      animatePlayer();
      for (let i = 0; i < playerAmmo.length; i++) {
      playerAmmo[i].ammoUpdate();
    }}  

    if (enemySprites2.length <= 0 ) {
      enemyShieldsStatus = false;
    }

    if (enemySprites3.length <= 0) {
      enemyShieldsStatus2 = false;
    }

    if (enemyShieldsStatus){
      for (let es = 0; es < enemySprites.length; es++) {
        enemyShields[es].x = enemySprites[es].x;
        enemyShields[es].y = enemySprites[es].y;
        enemyShields[es].enemyShieldsUpdate();
      }
    }
    if (enemyShieldsStatus2){
      for (let es2 = 0; es2 < enemySprites4.length; es2++) {
        enemyShields2[es2].x = enemySprites4[es2].x;
        enemyShields2[es2].y = enemySprites4[es2].y;
        enemyShields2[es2].enemyShieldsUpdate();
      }
    }

    switch (gameLevel){
      case 1:
        animateEnemies();
        if (isLevelCompleted()){
          nextLevel(2);
        }
      break;

      case 2: 
        animateEnemies();
        if (isLevelCompleted()){
          nextLevel(3);
        }
      break;

      case 3:
        animateEnemies();
        if (isLevelCompleted()){
          nextLevel(4);
        }
      break;
      
      case 4:
        animateEnemies();
        if (isLevelCompleted()){
          nextLevel(1);
        }
      break;

      case 0:
        nextLevel(0);
      }

      animateExplosions();
    }
};

// initiate new game and next level functions

let gameLevel = 1;
levelTimer = 0;
function nextLevel(L){
  ctx.beginPath();
  ctx.fillStyle = 'rgba(42, 177, 30, 0.5)';
  ctx.fillRect(200, 100, 300, 200);
  ctx.closePath();
  levelTimer += 1;
  if (levelTimer >= 300){
    newGame(L);
    gameLevel = L;
    levelTimer = 0
    console.log(gameLevel);
  }
};

let gameRunning = false;
function newGame(level = 1){
  gameRunning = true;
  switch (level){
    case 1:
      clearAllEnemyArrays();
      gameLevel = 1;
      initPlayer();
      initEnemySprites(2, 8, 200);
      initEnemySprites2(6, 4);
      break;
    
    case 2:
      initPlayer();
      initEnemySprites4(2, 10, 200);
      initEnemySprites3(6, 4);
      break
    
    case 3:
      initPlayer();
      initEnemySprites(2, 8, 180);
      initEnemySprites4(2, 10, 200);
      initEnemySprites2(4, 4);
      initEnemySprites3(4, 4);
      break;
    
    case 4: 
      initPlayer()
      initEnemySprites(3, 10, 160);
      initEnemySprites2(4, 6);
      initEnemySprites3(4, 6,);
      initEnemySprites4(3, 10, 160)
      break;
    
    case 0:
      clearAllEnemyArrays();
    break;
  }
};

function isLevelCompleted(){
  if (enemySprites.length == 0 && enemySprites2.length == 0 && enemySprites3.length == 0 && enemySprites4.length == 0){
    return true;
  }
};

function playerDead(){
  console.log('player dead 1');
  initExplosion(playerSprite.x, playerSprite.y);
  x = 10;
  y = canvas.height - 25;
  for (let i = 0; i < 10; i++) {
    initSmallExplosion(x, y);
    explosionSprite[i].explosionUpdate();
    x += 80;
  }
  playerSprite.hitPoints = 0;
  gameLevel = 0;
};

function clearAllEnemyArrays(){
  enemySprites = [];
  enemySprites2 = [];
  enemySprites3 = [];
  enemySprites4 = [];
  enemyAmmo = [];

};

// run when parsed
initStarField();
animate();
