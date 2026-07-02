// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
// Initialize datepicker
var datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
    format: 'yyyy-mm-dd',
    showClearBtn: true,
    firstDay: 1, // Gör måndag till veckans första dag
    disableDayFn: function(date) {
        // 0 = Söndag, 6 = Lördag
        return date.getDay() === 0 || date.getDay() === 6;
    },
    i18n: {
        months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        weekdays: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
        weekdaysShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
        weekdaysAbbrev: ['S', 'M', 'T', 'O', 'T', 'F', 'L']
    }
});


// Initialize timepicker
var timepickers = document.querySelectorAll('.timepicker');
M.Timepicker.init(timepickers, {
    twelveHour: false,
    showClearBtn: true
});
});

document.addEventListener('DOMContentLoaded', function() {
  const sqmInput = document.getElementById('sqm');
  const windowsNote = document.getElementById('windows-note');

  const additionalServicesPricing = {
    'true': 0
  };

  function calculatePrice() {
    const sqm = parseInt(sqmInput.value, 10) || 0;
    const startFee = 149;
    let areaPrice = 0;
    let areaPriceLabel = '';

    if (sqm >= 1 && sqm <= 49) {
        areaPrice = 2205; // Fast pris upp till 49 m²
        areaPriceLabel = `${areaPrice} kr (fast pris)`;
    } else if (sqm >= 50 && sqm <= 79) {
        areaPrice = sqm * 45;
        areaPriceLabel = '45 kr';
    } else if (sqm >= 80 && sqm <= 99) {
        areaPrice = sqm * 43;
        areaPriceLabel = '43 kr';
    } else if (sqm >= 100 && sqm <= 129) {
        areaPrice = sqm * 41;
        areaPriceLabel = '41 kr';
    } else if (sqm >= 130 && sqm <= 149) {
        areaPrice = sqm * 39;
        areaPriceLabel = '39 kr';
    } else if (sqm >= 150) {
        areaPrice = sqm * 37;
        areaPriceLabel = '37 kr';
    }

    const windowsSelected = document.getElementById('windows')?.checked;
    const totalPrice = areaPrice ? areaPrice + startFee : 0;
    const asterisk = windowsSelected ? '*' : '';

    // Update summary panel
    document.getElementById('summary-area').textContent = sqm ? `${sqm} m²` : 'Inte valt';
    document.getElementById('area-price').textContent = areaPrice ? areaPriceLabel : 'Inte valt';
    document.getElementById('start-fee').textContent = areaPrice ? `${startFee} kr` : 'Inte lagt till';
    document.getElementById('summary-price').innerHTML = totalPrice ? `<strong class="section-title2">${totalPrice} kr${asterisk}</strong>` : 'Inget att kalkylera än';
    windowsNote.style.display = windowsSelected ? 'block' : 'none';
  }

  // Trigger calculatePrice() on area input
  sqmInput.addEventListener('input', calculatePrice);

  // Trigger calculatePrice() on all additional service checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
  });
});


// Handle date change
document.getElementById('booking-date').addEventListener('change', function() {
    document.getElementById('summary-date').textContent = this.value || 'Inte valt';
});

// Handle time change
document.getElementById('booking-time').addEventListener('change', function() {
    document.getElementById('summary-time').textContent = this.value || 'Inte valt';
});

// Submit booking function
function clearFormFields() {
// Clear inputs
    document.getElementById('booking-date').value = '';
    document.getElementById('booking-time').value = '';
    document.getElementById('sqm').value = '';
    document.getElementById('windows').checked = false;
    document.getElementById('nameDeep').value = '';
    document.getElementById('phoneDeep').value = '';
    document.getElementById('emailDeep').value = '';
    document.getElementById('addressDeep').value = '';
    document.getElementById('cityDeep').value = '';
    document.getElementById('postalDeep').value = '';
    document.getElementById('commentsDeep').value = '';
    document.getElementById('codeDeep').value = '';

    // Reset summary section
    document.getElementById('summary-date').textContent = 'Inte valt';
    document.getElementById('summary-time').textContent = 'Inte valt';
    document.getElementById('summary-area').textContent = 'Inte valt';
    document.getElementById('area-price').textContent = 'Inte valt';
    document.getElementById('start-fee').textContent = 'Inte lagt till';
    document.getElementById('summary-price').textContent = 'Inget att kalkylera än';
    document.getElementById('windows-note').style.display = 'none';
}

function submitBooking() {
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const duration = setvalue = "";
    const frequency = setvalue = "";
    const cleaningSuply = setvalue = 'FALSE';
    const ironing1 = setvalue = 'FALSE';
    const fridge = setvalue = 'FALSE';
    const windows = document.getElementById('windows').checked ? 'TRUE' : 'FALSE';
    const deepClean = document.getElementById('sqm').value;
    const movingClean = setvalue = "";
    const name = document.getElementById('nameDeep').value;
    const phone = document.getElementById('phoneDeep').value;
    const email = document.getElementById('emailDeep').value;
    const address = document.getElementById('addressDeep').value;
    const city = document.getElementById('cityDeep').value;
    const postalCode = document.getElementById('postalDeep').value;
    const comments = document.getElementById('commentsDeep').value;
    const code = document.getElementById('codeDeep').value;
    

    if (!date || !time || !deepClean || !name || !phone || !email || !address || !city || !postalCode) {
        M.toast({html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red'});
        return;
    }

    const formData = new URLSearchParams({
        date, time, duration, frequency, cleaningSuply, ironing1, fridge, windows, deepClean, movingClean, name, phone, email, address, city, postalCode, comments, code
    });

    const preloader3 = document.getElementById('preloader3');
    preloader3.style.display = 'block';

    fetch('https://script.google.com/macros/s/AKfycbxxdlA1qsJyaMn6AIiRVQ3f09-rXrusaG98yxCCuS5ey5c4wt4Ux5dwr19UugDw7SBAcw/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        preloader3.style.display = 'none';
        if (response.ok) {
        M.toast({html: 'Tack för visat intresse.😊 Bokning skickad! Vi hör av oss inom 30 minuter!👍', classes: 'green'});
        clearFormFields();
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