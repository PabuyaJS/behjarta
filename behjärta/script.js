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