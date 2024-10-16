document.write("hello world!"); //prints the text on the body of the html - i think
window.alert("Hello, World!"); // prints the message in an alert box
console.log("Log this");
var A = " \"This is a string.\" Said, Sandy." + " \"Isn\'t that special.\" Said, Jerry. ";
document.write(A);
var family="The SImpsons", dad="Homer", mom="Marge", son="Bart", daughter="Lisa"; //assign multiple varibles 
document.write(son);
console.log(mom, son); // prints the message in the console log
document.write(3+3);
console.log(3+3);
var sent1="This is the beginning of the string ", sent2="and this is the end of the string.";
document.write(sent1 + sent2); // THis is concatenating 2 string varibles together

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}