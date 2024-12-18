//animation
let id = null; 
let pos = 0; 
let direction = 1;
let X = 20;
let path = 3;
const elem = document.getElementById("animate");

function ballMove(FR) { 
    path = 3;
    clearInterval(id);
    id = setInterval(frame, FR);
    function frame() {
        if (pos == 350) {
            direction = -1; 
        } else if (pos == 0) {
            direction = 1; 
        }
        pos += direction; 
        elem.style.top = pos + "px";
        elem.style.left = pos + "px";
    }
}

function ballMoveY(FR) { 
  path = 1;
  clearInterval(id);
  id = setInterval(frame, FR);
  function frame() {
      if (pos == 350) {
          direction = -1; 
      } else if (pos == 0) {
          direction = 1; 
      }
      pos += direction; 
      elem.style.top = pos + "px";
  }
}

function ballMoveX(FR) { 
  path = 2;
  clearInterval(id);
  id = setInterval(frame, FR);
  function frame() {
      if (pos == 350) {
          direction = -1; 
      } else if (pos == 0) {
          direction = 1; 
      }
      pos += direction; 
      elem.style.left = pos + "px";
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
