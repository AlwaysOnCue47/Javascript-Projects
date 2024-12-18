//animation
let id = null; 
let pos = 0; 
let direction = 1;
let X = 20;

function ballMove(FR) { 
    const elem = document.getElementById("animate");
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
      ballMove(X);
    }
    else if (X == 5) {
      clearInterval(id);
      id = null;
      X = 1;
      ballMove(X);
    }
    console.log(X);
    return false;
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
    ballMove(X)
  }
  else if (X >= 5) {
    clearInterval(id);
    id = null;
    X = X + 5;
    ballMove(X);
  }
  console.log(X);
});
