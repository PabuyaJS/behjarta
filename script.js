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

// translations.js - Create this file in your website root
const translations = {
  en: {
    // Navigation
    "nav-home": "Home",
    "nav-pricing": "Pricing",
    "nav-about": "About",
    "nav-book-demo": "Book a Demo",
    
    // Hero section
    "hero-title": "Welcome to Behjärta",
    "hero-subtitle": "Your Trusted Partner in Streamlining Work Processes!",
    "intro-text": "Unlock the true potential of your business with Behjärta, a leading expert in worksheets automation. We specialize in empowering small and medium-sized businesses by offering a suite of services that revolutionize the way you handle data, automate tasks, and design efficient workflows.",
    "cta-button": "BOOK A FREE DEMO",
    
    // Why Choose section
    "why-choose-title": "Why Choose Behjärta?",
    "tailored-title": "Tailored Solutions",
    "tailored-desc": "We understand that every business is unique. Our team works closely with you to deliver customized solutions that cater specifically to your needs and objectives.",
    "efficiency-title": "Efficiency Redefined",
    "efficiency-desc": "Our services are designed to eliminate up to 80% of manual labor involved in importing, operating, and sorting data. Experience a significant boost in efficiency and see your business thrive.",
    "focus-title": "Focus on SMBs",
    "focus-desc": "We specialize in assisting small and medium-sized businesses in optimizing their operations. Let us handle the complexities, so you can concentrate on growing your business.",
    
    // Expertise section
    "expertise-title": "Our Expertise",
    "workflow-title": "Workflow automation",
    "workflow-desc": "Say goodbye to repetitive manual tasks! We specialize in automating your worksheets, allowing your team to focus on strategic initiatives rather than spending hours on mundane data entry. We will streamline and automate complex business processes. this will reduce errors caused by manual intervention and it will improve accuracy.",
    "data-viz-title": "Customized data visualisation",
    "data-viz-desc": "Take control of your data with personalized interactive dashboards. We craft dashboards tailored to your business needs, ensuring that you have a comprehensive and easy-to-understand view of your key metrics.",
    "design-title": "Design",
    "design-desc": "Elevate your online presence with our top-notch web design services. We create modern, responsive and user-friendly websites and web apps that represent your brand and attract your target audience. Besids that we provide graphic design services for banners, product labels, packaging, ads, etc.",
    "chatbot-title": "Customized AI Chatbots and agents",
    "chatbot-desc": "Streamline your customer support with fully customized AI chatbots tailored to meet your unique business needs effortlessly.",
    
    // Contact section
    "contact-text": "Ready to transform the way you work? Contact Behjärta today and let us streamline your business processes, making your journey to success smoother and more efficient than ever before.",
    
    // Footer
    "company": "Company",
    "legal": "Legal",
    "privacy-policy": "Privacy Policy",
    "cookie-policy": "Cookie Policy",
    "faq": "FAQ",
    "rights-reserved": "© 2025 MS Secure solutions AB all rights reserved",
    
    // Language selector
    "language-button": "Svenska"
  },
  sv: {
    // Navigation
    "nav-home": "Hem",
    "nav-pricing": "Priser",
    "nav-about": "Om oss",
    "nav-book-demo": "Boka demo",
    
    // Hero section
    "hero-title": "Välkommen till Behjärta",
    "hero-subtitle": "Din pålitliga partner för effektivisering av arbetsprocesser!",
    "intro-text": "Frigör din verksamhets fulla potential med Behjärta, en ledande expert inom automatisering av kalkylblad. Vi specialiserar oss på att stärka små och medelstora företag genom att erbjuda tjänster som revolutionerar hur du hanterar data, automatiserar uppgifter och designar effektiva arbetsflöden.",
    "cta-button": "BOKA EN GRATIS DEMO",
    
    // Why Choose section
    "why-choose-title": "Varför välja Behjärta?",
    "tailored-title": "Skräddarsydda lösningar",
    "tailored-desc": "Vi förstår att varje företag är unikt. Vårt team arbetar nära dig för att leverera anpassade lösningar som specifikt tillgodoser dina behov och mål.",
    "efficiency-title": "Effektivitet omdefinierad",
    "efficiency-desc": "Våra tjänster är utformade för att eliminera upp till 80% av det manuella arbetet som krävs för att importera, hantera och sortera data. Upplev en betydande effektivitetsökning och se ditt företag blomstra.",
    "focus-title": "Fokus på SMF",
    "focus-desc": "Vi är specialiserade på att hjälpa små och medelstora företag att optimera sina verksamheter. Låt oss hantera komplexiteten så att du kan koncentrera dig på att utveckla din verksamhet.",
    
    // Expertise section
    "expertise-title": "Vår expertis",
    "workflow-title": "Arbetsflödesautomatisering",
    "workflow-desc": "Säg adjö till repetitiva manuella uppgifter! Vi specialiserar oss på att automatisera dina kalkylblad, vilket gör att ditt team kan fokusera på strategiska initiativ istället för att spendera timmar på monoton datainmatning. Vi effektiviserar och automatiserar komplexa affärsprocesser. Detta minskar fel orsakade av manuella ingrepp och förbättrar noggrannheten.",
    "data-viz-title": "Anpassad datavisualisering",
    "data-viz-desc": "Ta kontroll över din data med personliga interaktiva instrumentpaneler. Vi skapar instrumentpaneler anpassade efter dina affärsbehov, vilket säkerställer att du har en omfattande och lättförståelig översikt över dina viktigaste mätvärden.",
    "design-title": "Design",
    "design-desc": "Höj din onlinenärvaro med våra förstklassiga webbdesigntjänster. Vi skapar moderna, responsiva och användarvänliga webbplatser och webbappar som representerar ditt varumärke och lockar din målgrupp. Dessutom erbjuder vi grafiska designtjänster för banners, produktetiketter, förpackningar, annonser, etc.",
    "chatbot-title": "Anpassade AI-chatbots och agenter",
    "chatbot-desc": "Effektivisera din kundsupport med fullt anpassade AI-chatbots skräddarsydda för att möta dina unika affärsbehov utan ansträngning.",
    
    // Contact section
    "contact-text": "Redo att förändra sättet du arbetar på? Kontakta Behjärta idag och låt oss effektivisera dina affärsprocesser, vilket gör din väg till framgång smidigare och effektivare än någonsin tidigare.",
    
    // Footer
    "company": "Företag",
    "legal": "Juridiskt",
    "privacy-policy": "Integritetspolicy",
    "cookie-policy": "Cookie-policy",
    "faq": "Vanliga frågor",
    "rights-reserved": "© 2025 MS Secure solutions AB alla rättigheter förbehållna",
    
    // Language selector
    "language-button": "English"
  }
};

// Add this to your script.js file or create a new one
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
