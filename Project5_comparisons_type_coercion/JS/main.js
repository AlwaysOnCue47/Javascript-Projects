function whatsIt() {
  result = typeof "word";
  document.getElementById("answer").innerHTML = result;
}

function coerc() {
  result = "ten" + 5;
  document.getElementById("Coerc").innerHTML = result;
}

function isNaN1() {
  result = isNaN("Tennetenba");
  document.getElementById("IsNaN1").innerHTML = result;
}

function isNaN2() {
  result = isNaN("1701");
  document.getElementById("IsNaN2").innerHTML = result;
}

function infinity1() {
  result = (3E310);
  console.log(result)
}

function infinity2() {
  result = (-3E310);
  console.log(result)
}