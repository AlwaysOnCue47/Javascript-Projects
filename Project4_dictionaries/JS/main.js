function myDictionary() {
  var crewMember = {
    Name:"Picard",
    Rank:"Captain",
    Ship:"Enterprise",
    Planet:"Earth",
    yearsOfService: 34
  };
  document.getElementById("Dictionary").innerHTML = crewMember.Name;
}

function myDictionary2() {
  var crewMember2 = {
    Name:"Riker",
    Rank:"Commander",
    Ship:"Enterprise",
    Planet:"Earth",
    yearsOfService: 16
  };
  delete crewMember2.Name;

  document.getElementById("Dictionary2").innerHTML = crewMember2.Name;
}