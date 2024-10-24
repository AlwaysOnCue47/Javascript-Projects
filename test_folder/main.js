// testing stuff in this file


// SLOT MACHINE GAME CREATED BY ME!!!

var items = ["Cherry", "Lemon", "Lime", "Star", "Mushroom", "banana", "$$$$"];
var slot1, slot2, slot3;
var X, Y, Z;
var credits = 100;

 
function spin() {
  if (credits == 0 ) {
    console.log("no more spins");
  }
  else {
    credits = credits - 25;
    X = Math.floor(Math.random() * 7);
    Y = Math.floor(Math.random() * 7);
    Z = Math.floor(Math.random() * 7);
    slot1 = items[X];
    slot2 = items[Y];
    slot3 = items[Z];
    document.getElementById("slot1").innerHTML = slot1;
    document.getElementById("slot2").innerHTML = slot2;
    document.getElementById("slot3").innerHTML = slot3;
    
    console.log(X, Y, Z);
    console.log(slot1, slot2, slot3);
    console.log(items);
    if ((slot1 == slot2) && (slot1 == slot3)){
      console.log("winner winner chicken dinner!");
      credits = credits + 300;
      console.log(credits);

    }
    else if ((slot1 == slot2) || (slot2 == slot3) || (slot1 == slot3)) {
      console.log("winner");
      credits = credits + 50;
      console.log(credits);
    }
    document.getElementById("credits").innerHTML = credits;

  }

}