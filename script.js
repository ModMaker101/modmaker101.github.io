document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector('.enderman-container');/*This is for the class*/
    setInterval(createParticle, 150);

    function createParticle() {
        var particle = document.createElement("div");
        particle.classList.add("particle");
        container.appendChild(particle);

        var size = Math.random() * 10;
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var duration = Math.random() * 3 + 1;

        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.animationDuration = duration + "s";

        setTimeout(function() {
            particle.remove();
        }, duration * 1000);
    }
});
const desktopImage = 'https://wallpaperaccess.com/full/2932430.png';
const mobileImage = 'image.png';
const tabletImage = 'image.png'; // Update path for tablet image

function setBackgroundImage() {
  const backgroundElement = document.querySelector('.enderman-background');
  let imageUrl;

  // Check screen size and assign appropriate image URL
  const screenWidth = window.innerWidth;
  if (screenWidth <= 480) {
    imageUrl = mobileImage;
  } else if (screenWidth <= 1024) {
    imageUrl = tabletImage;
  } else {
    imageUrl = desktopImage;
  }

  // Set background image with caching headers (if supported)
  backgroundElement.style.backgroundImage = `url(${imageUrl})`;
  if (typeof document.createElement('img').crossOrigin !== 'undefined') {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = 'anonymous'; // Enable cross-origin for caching
  }
}

setBackgroundImage();
window.addEventListener('resize', setBackgroundImage); // Update on resize

// script.js
document.addEventListener('DOMContentLoaded', function() {
    function reveal() {
       var reveals = document.querySelectorAll(".reveal");
   
       for (var i = 0; i < reveals.length; i++) {
         var windowHeight = window.innerHeight;
         var elementTop = reveals[i].getBoundingClientRect().top;
         var elementVisible = 150;
   
         if (elementTop < windowHeight - elementVisible) {
           reveals[i].classList.add('active');
         } else {
           reveals[i].classList.remove('active');
         }
       }
    }
   
    window.addEventListener('scroll', reveal);
    reveal();
   });
   