// Script for Pacman Clone Game

// The Canvas

const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'black';


// Event Listeners

window.addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
});

window.addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
});

// Constructors/Classes 

class Boundary {
  static width = 40;
  static height = 40;
  constructor({position, image}) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
};

class Player {
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Ghost {
  static speed = 5
  constructor({position, velocity, color = 'red'}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.color = color;
    this.speed = 5;
    this.prevCollisionsj = [];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Pellet {
  constructor({position}) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.closePath();
  }
}

const pellets = [];

// Functions

function circleCollidesWithRectangle({
  circle,
  rectangle
}) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
  )
};

//  MAIN ANIMATION FUNCTION                ----------------------------------------------------------

function animate() {
  run = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

// player action-controls inside animation loop
  if (keys.w.pressed && lastKey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (circleCollidesWithRectangle({
        circle: {
          ...player, 
          velocity: {
            x: 0,
            y: -5
          }
        },
        rectangle: boundary
      })
    ) {
      player.velocity.y = 0
      break
    } else {
      player.velocity.y = -5
    }
  };
    
  } else if (keys.a.pressed && lastKey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (circleCollidesWithRectangle({
        circle: {
          ...player, 
          velocity: {
            x: -5,
            y: 0
          }
        },
        rectangle: boundary
      })
    ) {
      player.velocity.x = 0
      break
    } else {
      player.velocity.x = -5
    }
  };

  } else if (keys.s.pressed && lastKey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (circleCollidesWithRectangle({
        circle: {
          ...player, 
          velocity: {
            x: 0,
            y: 5
          }
        },
        rectangle: boundary
      })
    ) {
      player.velocity.y = 0
      break
    } else {
      player.velocity.y = 5
    }
  };
    
  } else if (keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (circleCollidesWithRectangle({
        circle: {
          ...player, 
          velocity: {
            x: 5,
            y: 0
          }
        },
        rectangle: boundary
      })
    ) {
      player.velocity.x = 0
      break
    } else {
      player.velocity.x = 5
      }
    };
  };

// each boundary checks for collision with player when redrawn
  boundaries.forEach((boundary) => {
    boundary.draw()
    if (circleCollidesWithRectangle({circle: player, rectangle: boundary})) {
      console.log('collision');
      player.velocity.y = 0
      player.velocity.x = 0
    }
  });

// draw pellets and check for collision with player
  for (let i = pellets.length - 1; 0 < i; i--) {
    const pellet = pellets[i]
    pellet.draw()
     if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
       pellets.splice(i, 1)
     }
  }
  
  player.update();

  ghosts.forEach((ghost) => {
    ghost.update()
    const collisions = []
    boundaries.forEach((boundary) => {
      if (circleCollidesWithRectangle({
        circle: {
          ...ghost, 
          velocity: {
            x: Ghost.speed,
            y: 0
          }
        },
        rectangle: boundary
      })
    ) {
      collisions.push('right')
    }

    if (circleCollidesWithRectangle({
        circle: {
          ...ghost, 
          velocity: {
            x: -Ghost.speed,
            y: 0
          }
        },
        rectangle: boundary
      })
    ) {
      collisions.push('left')
    }

    if (circleCollidesWithRectangle({
        circle: {
          ...ghost, 
          velocity: {
            x: 0,
            y: Ghost.speed
          }
        },
        rectangle: boundary
      })
    ) {
      collisions.push('down')
    }

    if (circleCollidesWithRectangle({
        circle: {
          ...ghost, 
          velocity: {
            x: 0,
            y: -Ghost.speed
          }
        },
        rectangle: boundary
      })
    ) {
      collisions.push('up')
    }
    })
    console.log(collisions)
  } )

};

// variables

const player = new Player({
  position:{
  x: Boundary.width + Boundary.width / 2,
  y: Boundary.height + Boundary.height / 2
},
velocity: {
  x: 0,
  y: 0
} 
});

const ghosts = [];
ghosts.push(new Ghost({
  position: {
    x: Boundary.width * 6 + Boundary.height / 2,
    y: Boundary.width + Boundary.height / 2
  }, 
  velocity: {
    x: Ghost.speed,
    y: 0
  }
}))

let lastKey = '';

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
};

const boundaries = [];
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
];

function createImage(src) {
  const image = new Image()
  image.src = src
  return image;

}

map.forEach((row, i) =>{
  row.forEach((symbol, j) => {
    switch (symbol){
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeHorizontal.png')
          })
        )
        break;
      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeVertical.png')
          })
        )
        break
      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner1.png')
          })
        )
        break
      case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner2.png')
          })
        )
        break
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner3.png')
          })
        )
        break
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner4.png')
          })
        )
        break
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/block.png')
          })
        )
        break
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capLeft.png')
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capRight.png')
          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capBottom.png')
          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capTop.png')
          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/pipeCross.png')
          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./images/pipeConnectorTop.png')
          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./images/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./images/pipeConnectorBottom.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/pipeConnectorLeft.png')
          })
        )
        break
      case '.':
        pellets.push(
          new Pellet({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2
            }
          })
        )
        break;
      
    }
  })
})

// Run when parsed 

animate();