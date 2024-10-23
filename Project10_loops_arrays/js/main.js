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

// instuments loop
var instruments = ["Guitar", "Drums", "Piano", "Bass", "Violin", "Trumpet", "Flute"];
var content = "";
var Y;
function instrumentsLoop() {
  for (Y = 0; Y < instruments.length; Y++) {
    content+= instruments[Y] + "<br>";
  }
  document.getElementById("listOfInstruments").innerHTML = content;

}

// array function
function myPics() {
  var myPictures = []
  myPictures[0] = "sleeping";
  myPictures[1] = "playing";
  myPictures[2] = "eating";
  myPictures[3] = "with my cat";
  document.getElementById("array1").innerHTML = "In this picture I am..." + myPictures[3] + ".";
}

// constant keywords

function constantFunction() {
  const  starshipProperties = {type: "Galaxy class", name: "Enterprise", captain: "Picard", maxSpeed: "warp 9.5"}
  document.getElementById("constantParagraph1").innerHTML = "Current maximum speed of ship: "+ starshipProperties.maxSpeed;
  starshipProperties.transWarp = "Installed";
  starshipProperties.maxSpeed = "warp 9.975";
  document.getElementById("constantParagraph2").innerHTML = "Status of engine upgrade: " + starshipProperties.transWarp;
  document.getElementById("constantParagraph3").innerHTML = "New maximum speed is now: " + starshipProperties.maxSpeed;

}
