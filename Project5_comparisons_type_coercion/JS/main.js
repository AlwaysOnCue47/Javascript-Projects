function whatsIt() {
  result = typeof "word";
  document.getElementById("answer").innerHTML = result;
}

function coerc() {
  result = "ten" + 5;
  document.getElementById("Coerc").innerHTML = result;
}

function isNaN1() {
  result = isNaN("Tnetennba");
  document.getElementById("IsNaN1").innerHTML = result;
}

function isNaN2() {
  result = isNaN("1701");
  document.getElementById("IsNaN2").innerHTML = result;
}

function infinity1() {
  result = (3E310);
  console.log(result) // typed results in console
}

function infinity2() {
  result = (-3E310);
  console.log(result) // typed results in console log
}

function bool1() {
  result = 10 < 1;
  document.getElementById("Bool1").innerHTML = result;
}

function bool2() {
  result = 10 > 5;
  document.getElementById("Bool2").innerHTML = result;
  console.log(result);
}

function conLog() { //boolean expression written to console concatenated with string
  console.log("Is 10 equal to 4: " + (10 == 4));
  console.log("Is 100 equal to 100: " + (100 == 100));

}

function conLog2() {
  console.log("Compare value and type. 100 and hundred: " + (100 === 'hundred'));
  console.log("Compare value and type. 100 and 100: " + (100 === 100));
  console.log("Compare value and type. 101 and 100: " + (101 === 100));
  console.log("Compare value and type. 101 and hundred: " + (101 === 'hundred'));
}

function conLog3() {
  console.log("Is 10 greater than 5 AND 5 greater than 2: " + (10 > 5 && 5 > 2));
  console.log("Is 10 greater than 20 OR 10 greater than 5: " + (10 > 20 || 10 > 5));
}