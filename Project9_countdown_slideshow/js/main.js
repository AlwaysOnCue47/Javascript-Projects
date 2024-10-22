// Project 9 - Countdown Slideshow
function countdown() {
  var seconds = document.getElementById("seconds").value ;

  function tick() {
    seconds = seconds - 1;
    document.getElementById("timer").innerHTML = seconds;
    var time = setTimeout(tick, 1000);
    if (seconds == 0) {
      alert("Time's up!");
      clearTimeout(time);
      document.getElementById("timer").value = "";
    }
  }
  tick();
}