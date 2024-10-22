function greeting() {
  hourOfDay = new Date().getHours(); // assigned the hour to a variable
  if (hourOfDay > 18) {
    document.getElementById("Greeting").innerHTML = "Good day to you";
    console.log(hourOfDay); 

  }

}

function pizzaOrder() {
  orderAmount = document.getElementById("numberOfPizzas").value;
  console.log(orderAmount);
  if (orderAmount == 1) {
    document.getElementById("orderOutput").innerHTML = orderAmount + " pizza in the oven!";
    
  }
  else if (orderAmount > 1 && orderAmount < 7) { // use else if when specifying more than 1 if condition
    document.getElementById("orderOutput").innerHTML = orderAmount + " pizzas, coming up!";
  }

  else {
    document.getElementById("orderOutput").innerHTML = orderAmount + "!!  That's a lot of pizza!";
  }
    
  
}