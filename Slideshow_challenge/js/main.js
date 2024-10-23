// Slide show challenge assignment

let slideIndex = 1; // this variable keeps track of which slide is currently displayed
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) { // n represents the number of slides to push forward or backward prev -1, next +1
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} // if n is greater than the number of slides then gotto slide 1
  if (n < 1) {slideIndex = slides.length} // if n is less than 1 gotto the last slide, slideIndex = slides.length
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // this removes the string " active" from the class name
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}