// Add this to the beginning of your script.js to debug
console.log('Script.js loaded successfully');

// Wait for both DOM and Materialize to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Ensure Materialize is loaded
  if (typeof M === 'undefined') {
    console.error('Materialize not loaded!');
    return;
  }
  
  initializeAllComponents();
});

// Centralized initialization function
function initializeAllComponents() {
  console.log('Initializing all Materialize components...');
  
  // Initialize Sidenav
  const sidenavElems = document.querySelectorAll('.sidenav');
  if (sidenavElems.length > 0) {
    M.Sidenav.init(sidenavElems);
    console.log('Sidenav initialized:', sidenavElems.length);
  }
  
  // Initialize Dropdown with better options
  const dropdownElems = document.querySelectorAll('.dropdown-trigger');
  if (dropdownElems.length > 0) {
    M.Dropdown.init(dropdownElems, {
      coverTrigger: false,
      constrainWidth: false,
      alignment: 'left',
      hover: false,
      closeOnClick: true,
      inDuration: 300,
      outDuration: 225
    });
    console.log('Dropdowns initialized:', dropdownElems.length);
  }
  
  // Initialize Collapsibles (Accordions)
  const collapsibleElems = document.querySelectorAll('.collapsible');
  if (collapsibleElems.length > 0) {
    M.Collapsible.init(collapsibleElems, {
      accordion: false, // Set to false to allow multiple sections open
      inDuration: 300,
      outDuration: 300
    });
    console.log('Collapsibles initialized:', collapsibleElems.length);
  }
  
  // Initialize Carousel for mobile hero section
  const carouselElems = document.querySelectorAll('.carousel');
  if (carouselElems.length > 0) {
    const carouselInstances = M.Carousel.init(carouselElems, {
      fullWidth: false,
      indicators: true,
      shift: 100,
      duration: 300,
      numVisible: 3,
    });
    
    // Auto-cycle through images every 5 seconds
    if (carouselInstances.length > 0) {
      setInterval(function() {
        carouselInstances.forEach(function(instance) {
          instance.next();
        });
      }, 5000);
    }
    console.log('Carousels initialized:', carouselElems.length);
  }
  
  // Initialize Fixed Action Button
  const fabElems = document.querySelectorAll('.fixed-action-btn');
  if (fabElems.length > 0) {
    M.FloatingActionButton.init(fabElems, {
      direction: 'left'
    });
    console.log('FABs initialized:', fabElems.length);
  }
  
  // Initialize fade-in animations
  initializeFadeInAnimations();
  
  // Initialize smooth scroll
  initializeSmoothScroll();
  
  // Initialize cookie banner
  initializeCookieBanner();
}

// Fade-in effect for cards
function initializeFadeInAnimations() {
  const cards = document.querySelectorAll('.fade-in-up');
  if (cards.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.9 });

  cards.forEach(card => {
    observer.observe(card);
  });
}

// Smooth scroll for anchor links 
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Cookie Banner Functions
function initializeCookieBanner() {
  console.log('Initializing cookie banner...');
  
  const consent = getCookie('behjarta_cookie_consent');
  console.log('Current consent status:', consent);
  
  const banner = document.getElementById('cookieBanner');
  console.log('Banner element found:', banner !== null);
  
  if (!consent) {
    console.log('No consent found, showing banner in 1.5 seconds...');
    setTimeout(() => {
      console.log('Attempting to show banner now');
      showCookieBanner();
    }, 1500);
  } else {
    console.log('Consent already given:', consent);
    if (consent === 'accepted') {
      console.log('Cookies tidigare accepterade - laddar alla tjänster');
    } else if (consent === 'declined') {
      console.log('Cookies tidigare avböjda - endast grundläggande funktionalitet');
    }
  }
}

function showCookieBanner() {
  console.log('showCookieBanner() called');
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.classList.add('show');
    console.log('Banner should now be visible');
    console.log('Banner classes:', banner.className);
  } else {
    console.error('Cookie banner element not found!');
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Test function - run this in console to manually test
function testCookieBanner() {
  document.cookie = 'behjarta_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log('Cleared consent cookie');
  showCookieBanner();
}

// Submit contact function
function clearContactFields() {
  document.getElementById('contactName').value = '';
  document.getElementById('contactPhone').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactMessage').value = '';
}

function submitContact() {
  const contactName = document.getElementById('contactName').value;
  const contactPhone = document.getElementById('contactPhone').value;
  const contactEmail = document.getElementById('contactEmail').value;
  const contactMessage = document.getElementById('contactMessage').value;

  if (!contactName || !contactPhone || !contactEmail) {
    M.toast({html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red'});
    return;
  }

  const formData = new URLSearchParams({
    contactName, contactPhone, contactEmail, contactMessage
  });

  const preloader2 = document.getElementById('preloader2');
  preloader2.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbye8mABJhmmym5IiHzphwqYb65QMfA-kTd8LGZ03ft_L62m5Y_w06ZMkPOUGL1_FBpR/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    preloader2.style.display = 'none';
    if (response.ok) {
      M.toast({html: 'Tack! 😊 Vi hör av oss inom 24 timmar!👍', classes: 'green'});
      clearContactFields();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    preloader2.style.display = 'none';
    M.toast({html: 'Något gick fel. Försök igen.', classes: 'red'});
    console.error('Error!', error.message);
  });
}

// Submit complain function
function clearComplainFields() {
  document.getElementById('customerNumber').value = '';
  document.getElementById('serviceNumber').value = '';
  document.getElementById('cleaningDate').value = '';
  document.getElementById('complainMessage').value = '';
}

function submitComplain() {
  const customerNumber = document.getElementById('customerNumber').value;
  const serviceNumber = document.getElementById('serviceNumber').value;
  const cleaningDate = document.getElementById('cleaningDate').value;
  const complainMessage = document.getElementById('complainMessage').value;

  if (!customerNumber || !serviceNumber || !cleaningDate || !complainMessage) {
    M.toast({html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red'});
    return;
  }

  const formData = new URLSearchParams({
    customerNumber, serviceNumber, cleaningDate, complainMessage
  });

  const preloader3 = document.getElementById('preloader3');
  preloader3.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbxD3IrA9k3AzMWfOX1tuupCz9vwDzhUS4NyPYYy1BX9pNPJ0wXASoMiG6VwxclnCd9S/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    preloader3.style.display = 'none';
    if (response.ok) {
      M.toast({html: 'Tack! 😊 Vi hör av oss inom 30 minuter!👍', classes: 'green'});
      clearComplainFields();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    preloader3.style.display = 'none';
    M.toast({html: 'Något gick fel. Försök igen.', classes: 'red'});
    console.error('Error!', error.message);
  });
}

// Table sorting function
let sortDirections = [false, false, true, true, true];

function sortTable(columnIndex) {
  const table = document.getElementById('priceTable');
  if (!table) return;
  
  const tbody = document.getElementById('tableBody');
  const rows = Array.from(tbody.rows);
  
  sortDirections[columnIndex] = !sortDirections[columnIndex];
  const ascending = sortDirections[columnIndex];
  
  const headers = table.querySelectorAll('th .sort-arrow');
  headers.forEach((arrow, index) => {
    if (index === columnIndex) {
      arrow.textContent = ascending ? '▲' : '▼';
    } else {
      arrow.textContent = '▲';
    }
  });
  
  rows.sort((a, b) => {
    let aVal = a.cells[columnIndex].textContent.trim();
    let bVal = b.cells[columnIndex].textContent.trim();
    
    if (columnIndex > 0) {
      aVal = parseFloat(aVal.replace(/[^\d]/g, ''));
      bVal = parseFloat(bVal.replace(/[^\d]/g, ''));
      return ascending ? aVal - bVal : bVal - aVal;
    } else {
      return ascending ? aVal.localeCompare(bVal, 'sv') : bVal.localeCompare(aVal, 'sv');
    }
  });
  
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
}

// Submit affiliate function
function clearAffiliateFields() {
  document.getElementById('affiliateName').value = '';
  document.getElementById('affiliatePhone').value = '';
  document.getElementById('affiliateEmail').value = '';
  document.getElementById('paypalRadio').checked = false;
  document.getElementById('swishRadio').checked = false;
}

function submitAffiliate() {
  const affiliateName = document.getElementById('affiliateName').value;
  const affiliatePhone = document.getElementById('affiliatePhone').value;
  const affiliateEmail = document.getElementById('affiliateEmail').value;
  
  const paypalSelected = document.getElementById('paypalRadio').checked;
  const swishSelected = document.getElementById('swishRadio').checked;
  let paymentMethod = '';
  
  if (paypalSelected) {
    paymentMethod = 'PayPal';
  } else if (swishSelected) {
    paymentMethod = 'Swish';
  }

  if (!affiliateName || !affiliatePhone || !affiliateEmail) {
    M.toast({html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red'});
    return;
  }
  
  if (!paymentMethod) {
    M.toast({html: 'Vänligen välj en utbetalningsmetod', classes: 'red'});
    return;
  }

  const formData = new URLSearchParams({
    affiliateName, 
    affiliatePhone, 
    affiliateEmail, 
    paymentMethod
  });

  const preloader8 = document.getElementById('preloader8');
  preloader8.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbwaFMtKLjpQ3VI7-JryRJROTATPbNTySL-MFMFbES3ocYwVHH-33CfmnTy8k50zc5B3/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    preloader8.style.display = 'none';
    
    if (data.includes('Success') || data === 'Success') {
      M.toast({html: 'Tack för din registrering! 😊 Vi kommer att skicka bekräftelse email med din kod inom 10 minuter!👍', classes: 'green'});
      clearAffiliateFields();
    } else {
      throw new Error('Unexpected response: ' + data);
    }
  })
  .catch(error => {
    preloader8.style.display = 'none';
    console.error('Detailed error:', error);
    M.toast({html: 'Något gick fel. Försök igen.', classes: 'red'});
  });
}

// Submit application function
function clearApplicationFields() {
  document.getElementById('jobName').value = '';
  document.getElementById('jobPhone').value = '';
  document.getElementById('jobEmail').value = '';
  document.getElementById('jobPN').value = '';
  document.getElementById('jobAddress1').value = '';
  document.getElementById('jobCity').value = '';
  document.getElementById('jobPostalCode').value = '';
  document.getElementById('jobStartDate').value = '';
  document.getElementById('jobExperience').value = '';
  document.getElementById('jobPrevious').value = '';
  document.getElementById('jobAvailability').value = '';
  document.getElementById('jobLanguage').value = '';
  document.getElementById('jobDL').value = '';
  document.getElementById('jobPersona').value = '';
}

function submitApplication() {
  const jobName = document.getElementById('jobName').value;
  const jobPhone = document.getElementById('jobPhone').value;
  const jobEmail = document.getElementById('jobEmail').value;
  const jobPN = document.getElementById('jobPN').value;
  const jobAddress1 = document.getElementById('jobAddress1').value;
  const jobCity = document.getElementById('jobCity').value;
  const jobPostalCode = document.getElementById('jobPostalCode').value;
  const jobStartDate = document.getElementById('jobStartDate').value;
  const jobExperience = document.getElementById('jobExperience').value;
  const jobPrevious = document.getElementById('jobPrevious').value;
  const jobAvailability = document.getElementById('jobAvailability').value;
  const jobLanguage = document.getElementById('jobLanguage').value;
  const jobDL = document.getElementById('jobDL').value;
  const jobPersona = document.getElementById('jobPersona').value;

  if (!jobName || !jobPhone || !jobEmail || !jobPN || !jobAddress1 || !jobCity || !jobPostalCode || !jobStartDate || !jobExperience || !jobPrevious || !jobAvailability || !jobLanguage || !jobDL || !jobPersona) {
    M.toast({html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red'});
    return;
  }

  const formData2 = new URLSearchParams({
    jobName,
    jobPhone,
    jobEmail,
    jobPN,
    jobAddress1,
    jobCity,
    jobPostalCode,
    jobStartDate,
    jobExperience,
    jobPrevious,
    jobAvailability,
    jobLanguage,
    jobDL,
    jobPersona 
  });

  const preloader9 = document.getElementById('preloader9');
  preloader9.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbyH7_-JjXQEsOL7LptOSMJGXKcHB6K6UrFNiXqM5mGDV2LQXesTLIGLaSA-GFJihspX/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData2
  })
  .then(response => response.text())
  .then(data => {
    preloader9.style.display = 'none';
    
    if (data.includes('Success') || data === 'Success') {
      M.toast({html: 'Tack för din ansökan! 😊 Vi kommer att höra av oss snart!👍', classes: 'green'});
      clearApplicationFields();
    } else {
      throw new Error('Unexpected response: ' + data);
    }
  })
  .catch(error => {
    preloader9.style.display = 'none';
    console.error('Detailed error:', error);
    M.toast({html: 'Något gick fel. Försök igen.', classes: 'red'});
  });
}

// Submit CV
function submitCV(event) {
  event.preventDefault();

  const fileInput = document.getElementById('cvFile');
  if (fileInput.files.length === 0) {
    M.toast({html: 'Vänligen välj en fil att ladda upp', classes: 'red'});
    return;
  }

  const preloaderCv = document.getElementById('preloaderCV');
  preloaderCv.style.display = 'block';

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const base64Data = e.target.result.split(',')[1];
    const payload = {
      filename: file.name,
      mimeType: file.type,
      data: base64Data
    };

    fetch("https://script.google.com/macros/s/AKfycbw5z2lT80L0DCZuhStSFLTI8QiM9WQ0H_HQIePW99VbNF1AsMSgcFhJTi0oy84thtrP/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(data => {
      preloaderCv.style.display = 'none';
      if (data.includes("Success")) {
        M.toast({html: 'CV uppladdat! Tack för din ansökan 🙌', classes: 'green'});
        document.getElementById("cvForm").reset();
      } else {
        throw new Error(data);
      }
    })
    .catch(err => {
      preloaderCv.style.display = 'none';
      console.error("Upload error:", err);
      M.toast({html: 'Fel vid uppladdning. Försök igen.', classes: 'red'});
    });
  };

  reader.readAsDataURL(file);
}