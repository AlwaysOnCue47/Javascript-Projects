// testinf stuff in this file

function countToTen() {
  var digit = "";
  var X = 1;
  while (X < 11) {
    digit += "<br>" + X;
    X++;
  }
  document.getElementById("countToTen").innerHTML = digit;
}
var items = ["Cherry", "Lemon", "Lime", "Star", "$$$$"];
var slot1, slot2, slot3;
var credits = 100;
var X;
 
function spin() {
  if (credits == 0 ) {
    console.log("no more spins");
  }
  else {
    credits = credits - 25;
    X = Math.floor(Math.random() * 5);
    Y = Math.floor(Math.random() * 5);
    Z = Math.floor(Math.random() * 5);
    slot1 = items[X];
    slot2 = items[Y];
    slot3 = items[Z];
    document.getElementById("slot1").innerHTML = slot1;
    document.getElementById("slot2").innerHTML = slot2;
    document.getElementById("slot3").innerHTML = slot3;
    document.getElementById("credits").innerHTML = credits;
    console.log(X, Y, Z);
    console.log(slot1, slot2, slot3);
    console.log(items);

  }

}