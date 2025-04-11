document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Once we've shown the element, no need to observe it anymore
              observer.unobserve(entry.target);
          }
      });
  }, {
      // Element becomes visible when 20% of it enters the viewport
      threshold: 0.7
  });

  // Observe all elements with the fade-in-element class
  document.querySelectorAll('.fade-in-element').forEach(element => {
      observer.observe(element);
  });

  document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});
});

document.addEventListener('DOMContentLoaded', function() {
  // Animation sequence
  // Step 0: Aimate heading

  const welcome = document.querySelector('.heading');

  setTimeout(() => {
    welcome.style.transition = 'transform 0.3s ease-out';
    welcome.style.transform = 'scaleX(1)';
  }, 250);
  
  // Step 2: Animate the ring chart rolling out
  const ringPaths = document.querySelectorAll('.ring-path');
  
  setTimeout(() => {
    ringPaths.forEach(path => {
      path.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
      path.style.transform = 'rotateX(360deg)';
      path.style.opacity = '1';
    });
  }, 600);
  
  // Step 3: Animate the bubbles fading in
  const bubbles = document.querySelectorAll('.bubble');
  
  setTimeout(() => {
    bubbles.forEach((bubble, index) => {
      setTimeout(() => {
        bubble.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        bubble.style.transform = 'scale(1)';
        bubble.style.opacity = '1';
      }, index * 100);
    });
  }, 600);
  
  // Step 4: Animate the text fading in
  const textPart = document.querySelector('.text-part');
  
  setTimeout(() => {
    textPart.style.transition = 'opacity 1s ease-out';
    textPart.style.opacity = '1';
  }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('background-video');
  video.playbackRate = 0.7; // This slows down the video to 50% of its original speed
});