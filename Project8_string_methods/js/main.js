// Project 8 String methods 
function concatSentence() {
  var X = "Space, the final frontier. ";
  var Y = "These are the voyages of ";
  var Z = "the star ship Enterprise.";
  var completeSentence = X.concat(Y, Z);
  document.getElementById("concatResult").innerHTML = completeSentence;
}