// Add this to the beginning of your script.js to debug
console.log('Script.js loaded successfully');

// Modified initialization with debugging
function initializeCookieBanner() {
  console.log('Initializing cookie banner...');
  
  const consent = getCookie('behjarta_cookie_consent');
  console.log('Current consent status:', consent);
  
  const banner = document.getElementById('cookieBanner');
  console.log('Banner element found:', banner !== null);
  
  if (!consent) {
    console.log('No consent found, showing banner in 1.5 seconds...');
    // Show banner after a short delay to ensure page is loaded
    setTimeout(() => {
      console.log('Attempting to show banner now');
      showCookieBanner();
    }, 1500);
  } else {
    console.log('Consent already given:', consent);
    // Initialize based on previous consent
    if (consent === 'accepted') {
      console.log('Cookies tidigare accepterade - laddar alla tjänster');
    } else if (consent === 'declined') {
      console.log('Cookies tidigare avböjda - endast grundläggande funktionalitet');
    }
  }
}

// Modified showCookieBanner with debugging
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

// Test function - run this in console to manually test
function testCookieBanner() {
  // Clear any existing consent
  document.cookie = 'behjarta_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log('Cleared consent cookie');
  
  // Show banner immediately
  showCookieBanner();
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
});

// Initialize carousel for mobile hero section
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {
    fullWidth: false,
    indicators: true,
    shift: 100,
    duration: 300,
    numVisible: 3,
  });

  // Auto-cycle through images every 5 seconds
  if (instances.length > 0) {
    setInterval(function() {
      instances.forEach(function(instance) {
        instance.next();
      });
    }, 5000);
  }
});

// Fade-in effect for cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.9});

  cards.forEach(card => {
    observer.observe(card);
  });
});

// Smooth scroll for anchor links 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fixed action button
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });
});

// colapse initialization
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {
    accordion: true, // Allow multiple collapsibles to be open at the same time
    inDuration: 300, // Animation duration
    outDuration: 300 // Animation duration
  });
});

// Initialize dropdown
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        coverTrigger: false, // Display dropdown below the button
        constrainWidth: false, // Do not constrain width to the button
        alignment: 'center' // Align dropdown to the center
    });
  });

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

  const preloade2 = document.getElementById('preloader2');
  preloade2.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbye8mABJhmmym5IiHzphwqYb65QMfA-kTd8LGZ03ft_L62m5Y_w06ZMkPOUGL1_FBpR/exec', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      preloade2.style.display = 'none';
      if (response.ok) {
      M.toast({html: 'Tack! 😊 Vi hör av oss inom 24 timmar!👍', classes: 'green'});
      clearContactFields();
      } else {
      throw new Error('Network response was not ok');
      }
  })
  .catch(error => {
    preloader.style.display = 'none';
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

  const preloade3 = document.getElementById('preloader3');
  preloade3.style.display = 'block';

  fetch('https://script.google.com/macros/s/AKfycbxD3IrA9k3AzMWfOX1tuupCz9vwDzhUS4NyPYYy1BX9pNPJ0wXASoMiG6VwxclnCd9S/exec', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      preloade3.style.display = 'none';
      if (response.ok) {
      M.toast({html: 'Tack! 😊 Vi hör av oss inom 30 minuter!👍', classes: 'green'});
      clearComplainFields();
      } else {
      throw new Error('Network response was not ok');
      }
  })
  .catch(error => {
    preloader.style.display = 'none';
    M.toast({html: 'Något gick fel. Försök igen.', classes: 'red'});
    console.error('Error!', error.message);
  });
}

let sortDirections = [false, false, true, true, true]; // true = ascending, false = descending

  function sortTable(columnIndex) {
      const table = document.getElementById('priceTable');
      const tbody = document.getElementById('tableBody');
      const rows = Array.from(tbody.rows);
      
      // Toggle sort direction
      sortDirections[columnIndex] = !sortDirections[columnIndex];
      const ascending = sortDirections[columnIndex];
      
      // Update arrow indicators
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
          
          // For price columns, extract numeric value
          if (columnIndex > 0) {
              aVal = parseFloat(aVal.replace(/[^\d]/g, ''));
              bVal = parseFloat(bVal.replace(/[^\d]/g, ''));
              return ascending ? aVal - bVal : bVal - aVal;
          } else {
              // For company names, use string comparison
              return ascending ? aVal.localeCompare(bVal, 'sv') : bVal.localeCompare(aVal, 'sv');
          }
      });
      
      // Clear tbody and add sorted rows
      tbody.innerHTML = '';
      rows.forEach(row => tbody.appendChild(row));
  }
  
  // Initial sort by company name
  sortTable(1);

// Submit affiliate function
function clearAffiliateFields() {
  document.getElementById('affiliateName').value = '';
  document.getElementById('affiliatePhone').value = '';
  document.getElementById('affiliateEmail').value = '';
  // Clear radio button selections
  document.getElementById('paypalRadio').checked = false;
  document.getElementById('swishRadio').checked = false;
}

function submitAffiliate() {
  const affiliateName = document.getElementById('affiliateName').value;
  const affiliatePhone = document.getElementById('affiliatePhone').value;
  const affiliateEmail = document.getElementById('affiliateEmail').value;
  
  // Check which payment method is selected
  const paypalSelected = document.getElementById('paypalRadio').checked;
  const swishSelected = document.getElementById('swishRadio').checked;
  let paymentMethod = '';
  
  if (paypalSelected) {
    paymentMethod = 'PayPal';
  } else if (swishSelected) {
    paymentMethod = 'Swish';
  }

  // Validation
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

  console.log('Sending data:', {
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
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    return response.text();
  })
  .then(data => {
    console.log('Response data:', data);
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

  // Validation
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

  console.log('Sending data:', {
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
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    return response.text();
  })
  .then(data => {
    console.log('Response data:', data);
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
    const base64Data = e.target.result.split(',')[1]; // strip metadata
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
