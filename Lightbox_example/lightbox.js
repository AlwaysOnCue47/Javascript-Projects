// lightbox samle script
const lightbox = document.getElementById('lightbox'); //creates a variable that points to the element with ID lightbox
const images = document.querySelectorAll('img'); // this creates a variable that references all 'img' elements on the page

images.forEach(image => { // this is adding the event listener property to each image element listening for a click
  image.addEventListener('click', e => { //the e represents the image that was clicked
    lightbox.classList.add('active') 
    const viewImage = document.createElement('img')
    viewImage.src = image.src // this image variable is referring specifically to the image that was clicked
    while (lightbox.firstChild) { // This is saying if the lightbox has a child element then remove it - we have to say 'while'  because if we just state 'remove existing images' if there is no existing images then you get an error
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(viewImage) // adds the image element to the lightbox
  })
})

lightbox.addEventListener('click', e => { // this is to close the lightbox when lightbox is clicked. 
  if (e.target !== e.currentTarget) return // BUT we don't want to close the lightbox if the image is clicked
  lightbox.classList.remove('active')
})

