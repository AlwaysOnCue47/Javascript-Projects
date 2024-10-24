// Loops array
function callLoop() {
  X = 0;
  list = ["apples", "Oranges", "Bananas", "pears","Pineaplle"];
  Y = list.length;
  while (X < Y) {
    console.log(list[X]);
    X++;
  } 
  console.log(Y);
}

// instruments loop
var instruments = ["Guitar", "Drums", "Piano", "Bass", "Violin", "Trumpet", "Flute"];
var content = "";
var Y;
function instrumentsLoop() {
  for (Y = 0; Y < instruments.length; Y++) {
    content+= instruments[Y] + "<br>"; // adding <br> as text works as a page break because we are injected it into INNERhtml, the elements actual html code not just text value
  }
  document.getElementById("listOfInstruments").innerHTML = content; // using INNERhtml method can cause security issues since html code can be injected directly into an element

}

// array function
function myPics() { // this function is adding values to the array myPics which is initialy empty
  var myPictures = []
  myPictures[0] = "sleeping";
  myPictures[1] = "playing";
  myPictures[2] = "eating";
  myPictures[3] = "with my cat";
  document.getElementById("array1").innerHTML = "In this picture I am..." + myPictures[3] + ".";
}

// constant keywords

function constantFunction() { // using const for an array means you can still alter the values in the array but not the keys -- i think
  const  starshipProperties = {type: "Galaxy class", name: "Enterprise", captain: "Picard", maxSpeed: "warp 9.5"}
  document.getElementById("constantParagraph1").innerHTML = "Current maximum speed of ship: "+ starshipProperties.maxSpeed;
  starshipProperties.transWarp = "Installed";
  starshipProperties.maxSpeed = "warp 9.975";
  document.getElementById("constantParagraph2").innerHTML = "Status of engine upgrade: " + starshipProperties.transWarp;
  document.getElementById("constantParagraph3").innerHTML = "New maximum speed is now: " + starshipProperties.maxSpeed;

}

function letKeyword() { // demonstrates the scope of different variable types in relation to where they are created
  var X = "I'm VAR X 1";
  let Y = "I'm LET Y 1";
  console.log(X, Y);
  {
    var X = "I'm VAR X 2";
    let Y = "I'm LET Y 2";
    console.log(X, Y);
  }
  console.log(X, Y);
}

function returnFunction() { // when a function ends with a return statement the function itself can be placed where the data is to be viewed - NOT the variable in the function
  X = document.getElementById("num1").value;
  Y = document.getElementById("num2").value;
  result = (X * Y);
  return result;
}


function returnFunction2() { // using a function to call another function to demonstrate the return method
  document.getElementById("returnFunctionResult").innerHTML = returnFunction();
  console.log(returnFunction());

}
  
let starship = { // a value within an array can be a function. when calling that key value the function runs and displays what is set as the return value
  make: "Federation",
  class: "Galaxy",
  registryNumber: "NCC-1701-D",
  name: "USS Enterprise",
  description: function() {
    return "This is a " + this.make + " starship. " + this.class + " class. Full name is: " + this.name + ": " + this.registryNumber;
    
  }
 
}

function showObjects() { // this function calls the value in the above array that is a function itself
  console.log(starship.description());
  document.getElementById("starshipResult").innerHTML = starship.description();

}

function breakLoop() { // break demo - this loop will break if i is divisable by 5 - 5 %(modulus) 5 = 0
  let text = "";
  for (i = 1; i < 10; i++) {
    if (i % 5 == 0) {break;}
    text += "The iteration is: " + i + "<br>";
    document.getElementById("breakLoop").innerHTML = text;
    console.log(text);
  }
}
