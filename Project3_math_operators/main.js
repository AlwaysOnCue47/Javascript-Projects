
function Multiply(x, y) {
  result =  x * y;
  document.getElementById("multiply").innerHTML = "Answer is: " + result;
}

function Subtract(x, y) {
  result =  x - y;
  document.getElementById("subtract").innerHTML = "Answer is: " + result;
}

function Addition(x, y) {
  result =  x + y;
  document.getElementById("addition").innerHTML = "Answer is: " + result;
}

function Division(x, y) {
  result =  x / y;
  result = result.toFixed(2); // rounds result to max 2 decimal places
  document.getElementById("division").innerHTML = "Answer is: " + result;
}

function Poly(x, y, z, a) { //poly short for polynomial - avoid using words like math and calc to assign to variables or objects
  result = (x - y)*(z + a);
  document.getElementById("poly").innerHTML = "Answer is: " + result;
}

function Modulus(x, y) {
  result = x % y;
  document.getElementById("modulus").innerHTML = "Answer is: " + result;
}

function Negation(x) {
  result = -x ;
  document.getElementById("negation").innerHTML = "Answer is: " + result;
}

function Increment(x) {
  result = x ;
  result++;
  document.getElementById("increment").innerHTML = "Answer is: " + result;
}

function Decrement(x) {
  result = x ;
  result--;
  document.getElementById("decrement").innerHTML = "Answer is: " + result;
}

function getRand() { // avoid using the word random as function or variable names
  result = Math.random()*10
  result = result.toFixed(2);
  document.getElementById("Ran").innerHTML = result;

}

function PiRatio() { //avoid using the word pi as a function name
  result = Math.PI;
  result = result.toFixed(2);
  document.getElementById("piRatio").innerHTML = result;
}