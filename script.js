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

document.addEventListener('DOMContentLoaded', function() {
  // Initialize
  let currentLang = localStorage.getItem('language') || 'en';
  
  // Create language toggle button
  const navUl = document.querySelector('nav .nav-wrapper ul.right');
  const mobileSidenav = document.querySelector('.sidenav');
  
  if (navUl) {
    const langLi = document.createElement('li');
    const langButton = document.createElement('a');
    langButton.id = 'lang-toggle';
    langButton.className = 'light-blue-text text-darken-4';
    langButton.textContent = translations[currentLang]['language-button'];
    langButton.href = '#';
    langButton.addEventListener('click', toggleLanguage);
    langLi.appendChild(langButton);
    navUl.appendChild(langLi);
  }
  
  if (mobileSidenav) {
    const langLi = document.createElement('li');
    const langButton = document.createElement('a');
    langButton.id = 'mobile-lang-toggle';
    langButton.className = 'light-blue-text text-darken-4';
    langButton.textContent = translations[currentLang]['language-button'];
    langButton.href = '#';
    langButton.addEventListener('click', toggleLanguage);
    langLi.appendChild(langButton);
    mobileSidenav.appendChild(langLi);
  }
  
  // Add data-i18n attributes to all elements
  addTranslationAttributes();
  
  // Apply saved language
  if (currentLang === 'sv') {
    applyTranslations();
  }
  
  function addTranslationAttributes() {
    // Navigation
    document.querySelectorAll('nav ul li a').forEach(el => {
      if (el.textContent.trim() === 'Home') el.setAttribute('data-i18n', 'nav-home');
      if (el.textContent.trim() === 'Pricing') el.setAttribute('data-i18n', 'nav-pricing');
      if (el.textContent.trim() === 'About') el.setAttribute('data-i18n', 'nav-about');
      if (el.textContent.trim() === 'Book a Demo') el.setAttribute('data-i18n', 'nav-book-demo');
    });
    
    document.querySelectorAll('.sidenav li a').forEach(el => {
      if (el.textContent.trim() === 'Home') el.setAttribute('data-i18n', 'nav-home');
      if (el.textContent.trim() === 'Pricing') el.setAttribute('data-i18n', 'nav-pricing');
      if (el.textContent.trim() === 'About') el.setAttribute('data-i18n', 'nav-about');
      if (el.textContent.trim() === 'Book a Demo') el.setAttribute('data-i18n', 'nav-book-demo');
    });
    
    // Hero section
    const heroTitle = document.querySelector('.container h1.teal-text');
    if (heroTitle) heroTitle.setAttribute('data-i18n', 'hero-title');
    
    const heroSubtitle = document.querySelector('.container h5 .light-blue-text');
    if (heroSubtitle) heroSubtitle.setAttribute('data-i18n', 'hero-subtitle');
    
    const introText = document.querySelector('.container > p');
    if (introText) introText.setAttribute('data-i18n', 'intro-text');
    
    const ctaButton = document.querySelector('a.btn.light-blue');
    if (ctaButton) ctaButton.setAttribute('data-i18n', 'cta-button');
    
    // Why Choose section
    const whyChooseTitle = document.querySelector('h2.light-blue-text');
    if (whyChooseTitle) whyChooseTitle.setAttribute('data-i18n', 'why-choose-title');
    
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
      if (accordion.textContent.includes('Tailored Solutions')) {
        accordion.setAttribute('data-i18n-html', 'tailored-title');
        accordion.nextElementSibling.querySelector('p').setAttribute('data-i18n', 'tailored-desc');
      }
      if (accordion.textContent.includes('Efficiency Redefined')) {
        accordion.setAttribute('data-i18n-html', 'efficiency-title');
        accordion.nextElementSibling.querySelector('p').setAttribute('data-i18n', 'efficiency-desc');
      }
      if (accordion.textContent.includes('Focus on SMBs')) {
        accordion.setAttribute('data-i18n-html', 'focus-title');
        accordion.nextElementSibling.querySelector('p').setAttribute('data-i18n', 'focus-desc');
      }
    });
    
    // Expertise section
    const expertiseTitle = document.querySelectorAll('h2.light-blue-text')[1];
    if (expertiseTitle) expertiseTitle.setAttribute('data-i18n', 'expertise-title');
    
    // Sections with parallax
    const sections = document.querySelectorAll('.section.light-blue');
    sections.forEach((section, index) => {
      const h3 = section.querySelector('h3');
      const p = section.querySelector('p');
      
      if (index === 0) {
        h3.setAttribute('data-i18n', 'workflow-title');
        p.setAttribute('data-i18n', 'workflow-desc');
      } else if (index === 1) {
        h3.setAttribute('data-i18n', 'data-viz-title');
        p.setAttribute('data-i18n', 'data-viz-desc');
      } else if (index === 2) {
        h3.setAttribute('data-i18n', 'design-title');
        p.setAttribute('data-i18n', 'design-desc');
      } else if (index === 3) {
        h3.setAttribute('data-i18n', 'chatbot-title');
        p.setAttribute('data-i18n', 'chatbot-desc');
      }
    });
    
    // Contact section
    const contactText = document.querySelector('.teal.lighten-5 h5');
    if (contactText) contactText.setAttribute('data-i18n', 'contact-text');
    
    const contactButton = document.querySelector('.teal.lighten-5 a.btn-flat');
    if (contactButton) contactButton.setAttribute('data-i18n', 'cta-button');
    
    // Footer
    const companyTitle = document.querySelector('.footer-bg h5:nth-of-type(1)');
    if (companyTitle) companyTitle.setAttribute('data-i18n', 'company');
    
    const legalTitle = document.querySelector('.footer-bg h5:nth-of-type(2)');
    if (legalTitle) legalTitle.setAttribute('data-i18n', 'legal');
    
    const footerLinks = document.querySelectorAll('.footer-bg a');
    footerLinks.forEach(link => {
      if (link.textContent.trim() === 'About') link.setAttribute('data-i18n', 'nav-about');
      if (link.textContent.trim() === 'Book a Demo') link.setAttribute('data-i18n', 'nav-book-demo');
      if (link.textContent.trim() === 'FAQ') link.setAttribute('data-i18n', 'faq');
      if (link.textContent.trim() === 'Privacy Policy') link.setAttribute('data-i18n', 'privacy-policy');
      if (link.textContent.trim() === 'Cookie Policy') link.setAttribute('data-i18n', 'cookie-policy');
    });
    
    const copyright = document.querySelector('.footer-copyright .container');
    if (copyright) copyright.setAttribute('data-i18n', 'rights-reserved');
  }
  
  function toggleLanguage(e) {
    e.preventDefault();
    currentLang = currentLang === 'en' ? 'sv' : 'en';
    localStorage.setItem('language', currentLang);
    
    // Update language button text
    const langToggle = document.getElementById('lang-toggle');
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    
    if (langToggle) langToggle.textContent = translations[currentLang]['language-button'];
    if (mobileLangToggle) mobileLangToggle.textContent = translations[currentLang]['language-button'];
    
    applyTranslations();
  }
  
  function applyTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[currentLang][key]) {
        element.textContent = translations[currentLang][key];
      }
    });
    
    // Special handling for elements that need to preserve HTML like icons
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      if (translations[currentLang][key]) {
        // This preserves the icon
        const icon = element.querySelector('i');
        element.innerHTML = '';
        if (icon) element.appendChild(icon);
        element.innerHTML += ' ' + translations[currentLang][key];
      }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && currentLang === 'sv') {
      metaDescription.content = "Din pålitliga partner för effektivisering av arbetsprocesser! Frigör din verksamhets fulla potential med Behjärta, en ledande expert inom automatisering av Google Workspace och Microsoft Office. Vi specialiserar oss på att stärka små och medelstora företag genom att erbjuda tjänster som revolutionerar hur du hanterar data, automatiserar uppgifter och designar effektiva arbetsflöden.";
    } else if (metaDescription) {
      metaDescription.content = "Your Trusted Partner in Streamlining Work Processes! Unlock the true potential of your business with Behjärta, a leading expert in Google Workspace and Microsoft Office automation. We specialize in empowering small and medium-sized businesses by offering a suite of services that revolutionize the way you handle data, automate tasks, and design efficient workflows.";
    }
  }
});
