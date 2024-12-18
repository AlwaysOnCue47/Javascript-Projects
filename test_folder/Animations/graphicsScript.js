//animation
let id = null; 
let posY = 0;
let posX = 0; 
let direction = 1;
let X = 20;
let path = 3;
const elem = document.getElementById("animate");

function ballMove(FR) { 
    path = 3;
    clearInterval(id);
    id = setInterval(frame, FR);
    function frame() {
        if ((posY == 350) || (posX == 350)){
            direction = -1; 
        } else if ((posY == 0) || (posX == 0)){
            direction = 1; 
        }
        posY += direction; 
        posX += direction;
        elem.style.top = posY + "px";
        elem.style.left = posX + "px";
    }
}

function ballMoveY(FR) { 
  path = 1;
  clearInterval(id);
  id = setInterval(frame, FR);
  function frame() {
      if (posY == 350) {
          direction = -1; 
      } else if (posY == 0) {
          direction = 1; 
      }
      posY += direction; 
      elem.style.top = posY + "px";
  }
}

function ballMoveX(FR) { 
  path = 2;
  clearInterval(id);
  id = setInterval(frame, FR);
  function frame() {
      if (posX == 350) {
          direction = -1; 
      } else if (posX == 0) {
          direction = 1; 
      }
      posX += direction; 
      elem.style.left = posX + "px";
  }
}

document.getElementById("stopBtn").addEventListener("click", () => { 
    if (id !== null) { 
        clearInterval(id);
        id = null; 
    }
});

document.getElementById("fast").addEventListener("click", () => {
    if (X >= 10) {
      clearInterval(id);
      id = null;
      X = X - 5;
      if (path == 3) {
        ballMove(X); 
      }
      if (path == 2) {
        ballMoveX(X);
      }
      else if (path == 1) {
        ballMoveY(X);
      }
    }
    else if (X == 5) {
      clearInterval(id);
      id = null;
      X = 1;
      if (path == 3) {
        ballMove(X); 
      }
      if (path == 2) {
        ballMoveX(X);
      }
      else if (path == 1) {
        ballMoveY(X);
      }
    }
});

document.getElementById("slow").addEventListener("click", () => {
  if (X == 0) {
    clearInterval(id);
    id = null;
  }
  else if (X == 1){
    clearInterval(id);
    id = null;
    X = 5;
    if (path == 3) {
      ballMove(X); 
    }
    if (path == 2) {
      ballMoveX(X);
    }
    else if (path == 1) {
      ballMoveY(X);
    }
  }
  else if (X >= 5) {
    clearInterval(id);
    id = null;
    X = X + 5;
    if (path == 3) {
      ballMove(X); 
    }
    if (path == 2) {
      ballMoveX(X);
    }
    else if (path == 1) {
      ballMoveY(X);
    }
  }
});

document.getElementById("switch").addEventListener("click", () => {
  direction = (direction * (-1));
});
