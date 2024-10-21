function whatsIt() {
  result = typeof "word"; // typeof operator determins the data type
  document.getElementById("answer").innerHTML = result;
}

function coerc() {
  result = "ten" + 5; // this function will concatenate the 2 values instead of trying to change data type to complete a math operation
  document.getElementById("Coerc").innerHTML = result;
}

function isNaN1() {
  result = isNaN("Tnetennba"); // NaN stand for Not A Number - asking if the variable is NOT a number - returns true or false
  document.getElementById("IsNaN1").innerHTML = result;
}

function isNaN2() {
  result = isNaN("1701"); // NaN here results in true - 1701 IS a number
  document.getElementById("IsNaN2").innerHTML = result;
}

function infinity1() {
  result = (3E310); // 3E310 is the highest number computer can accomodate 3E310 and above is infinity
  console.log(result) // typed results in console
}

function infinity2() {
  result = (-3E310); // negative infinity
  console.log(result) // typed results in console log
}

function bool1() {
  result = 10 < 1; // will result in a true or false answer
  document.getElementById("Bool1").innerHTML = result;
}

function bool2() {
  result = 10 > 5; // will result in a true or false answer
  document.getElementById("Bool2").innerHTML = result;
  console.log(result);
}

function conLog() { //boolean expression written to console concatenated with string
  console.log("Is 10 equal to 4: " + (10 == 4));
  console.log("Is 100 equal to 100: " + (100 == 100));

}

function conLog2() { // triple equals sign is asking if BOTH the VALUE and the DATA type are equal
  console.log("Compare value and type. 100 and hundred: " + (100 === 'hundred'));
  console.log("Compare value and type. 100 and 100: " + (100 === 100));
  console.log("Compare value and type. 101 and 100: " + (101 === 100));
  console.log("Compare value and type. 101 and hundred: " + (101 === 'hundred'));
}

function conLog3() { // AND operator && will check if both conditions are true
  console.log("Is 10 greater than 5 AND 5 greater than 2: " + (10 > 5 && 5 > 2));
  console.log("Is 10 greater than 20 OR 10 greater than 5: " + (10 > 20 || 10 > 5));
}

function notOp1(X) { // ! operator checks if something is NOT true x = !(10 = 10) X returns false
  X = 5;
  result = !(X > 10);
  console.log("Is 5 NOT greater than 10?: " + result);

}

function notOp2(X){
  X = 5;
  result = !(X < 10); // ! operator checks if something is NOT true
  console.log("Is 5 NOT less than 10: "+ result);
}