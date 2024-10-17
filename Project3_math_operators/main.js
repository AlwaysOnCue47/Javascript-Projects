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

function Math(x, y, z, a) {
  result = (x - y)*(z + a);
  document.getElementById("math").innerHTML = "Answer is: " + result;
}

function Modulus(x, y) {
  result = x % y;
  document.getElementById("modulus").innerHTML = "Answer is: " + result;
}

function Negation(x) {
  result = -x ;
  document.getElementById("negation").innerHTML = "Answer is: " + result;
}