// Project 6 Ternary operators
function Ride_Function() {
	var Height, Can_ride;
	Height = document.getElementById("Height").value;
	Can_ride = (Height < 52) ? "You are to short" : "You are tall enough"; // with the ? operator you can pick a value based on a condition
	document.getElementById("Ride").innerHTML = Can_ride + " to ride.";
}

function ageFunction() {
  var Age, canVote;
  Age = document.getElementById("Age").value;
  canVote = (Age >= 18) ? "Yes, you can vote" : "I'm sorry, you cannot vote yet"; // using ? - if the condition is true the first option returns. False returns the second
  document.getElementById("vote").innerHTML = "You are " + Age + ". " + canVote;
}

function Vehicle(Make, Model, Year, Color){ // this function is a constructor because it can be used to contruct other objects
  this.Vehicle_Make = Make;
  this.Vehicle_Model = Model;
  this.Vehicle_Year = Year;
  this.Vehicle_Color = Color;
}

var Jack = new Vehicle("Dodge", "Viper", 2020, "Red");
var Emily= new Vehicle("Jeep", "Trail Hawk", 2019, "White and Black");
var Erik = new Vehicle("Ford", "Pinto", 1971, "Mustard");

function myFunction() {
  document.getElementById("Keywords_and_Constructors").innerHTML = 
  "Erik drives a " + Erik.Vehicle_Color + "-colored " + Erik.Vehicle_Model + 
  " manufactured in " + Erik.Vehicle_Year;
}

function addNew() {
  Make = document.getElementById("Make").value;
  Model = document.getElementById("Model").value;
  Year = document.getElementById("Year").value;
  Color = document.getElementById("Color").value;
  var yourCar = new Vehicle(Make, Model, Year, Color);
  document.getElementById("newEntry").innerHTML = 
  "You drive a " + yourCar.Vehicle_Color + "-colored " + yourCar.Vehicle_Model + 
  " manufactured in " + yourCar.Vehicle_Year;

}

function nestedFunction() {
  X = Number(document.getElementById("num1").value); //Number function here ensures that the data being read will be a number not a string
  Y = Number(document.getElementById("num2").value);
  Z = Number(document.getElementById("num3").value);
    addUp()
    function addUp(){ //Nested the adding function
      result = X + Y + Z;
      return result;

    }
  
  document.getElementById("nestedResult").innerHTML = result;

}
