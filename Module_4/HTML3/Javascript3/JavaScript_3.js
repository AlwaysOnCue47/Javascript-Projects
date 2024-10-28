function displayType(character) {
  console.log(character);
  var characterType = character.getAttribute("data-character_type");
  console.log(characterType);
  alert(characterType + " is in the " + character.innerHTML+ " universe"); 
  console.log(character.innerHTML);
}

