function displayType(character) {
  console.log(character);
  var characterType = character.getAttribute("data-character_type");
  console.log(characterType);
  alert(characterType + " is in the " + character.innerHTML+ " universe"); 
  console.log(character.innerHTML);
}

demoFunction1 = (X, Y) => document.getElementById("demoOutput").innerHTML = "Let's multiply 4 by 7: " + X * Y ; // arrow function

// some() method

var studentAges = [2, 5, 6, 6, 7, 12, 13, 13, 15, 16];
checkAge = (age) => age >= 15;
document.getElementById("someOutput").innerHTML = studentAges.some(checkAge);


  



