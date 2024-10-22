// Project 8 String methods 
function concatSentence() {
  var X = "Space, the final frontier. ";
  var Y = "These are the voyages of ";
  var Z = "the star ship Enterprise.";
  var completeSentence = X.concat(Y, Z);
  document.getElementById("concatResult").innerHTML = completeSentence;
}

function sliceMethod() {
  var fullSentence = "To boldly go where no one has gone before!";
  var slicedSection = fullSentence.slice(3,9);
  var toUpper = slicedSection.toUpperCase(); // to upper case method
  document.getElementById("sentence1").innerHTML = fullSentence;
  document.getElementById("slicedSentence1").innerHTML = slicedSection;
  document.getElementById("upperCase").innerHTML = "I said... " + toUpper + "!!!";

}

function searchMethod() {
  var searchSentence1 = "To explore strange new worlds and new civilizations";
  var searchResult1 = searchSentence1.search("worlds");
  document.getElementById("sentence2").innerHTML = searchSentence1;
  document.getElementById("searchedSentence1").innerHTML = searchResult1;
}

function numToString() {
  var X = 1980;
  var Y = X.toString();
  document.getElementById("num1").innerHTML = X;
  document.getElementById("num1ToString").innerHTML = Y;
}