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

// Recommendation text mapping
const durationRecommendations = {
'2': 'Gäller städning för 0 - 29 m² (max. 1 RoK)',
'3': 'Gäller städning för 30 - 49 m² (max. 2 RoK)',
'4': 'Gäller städning för 50 - 79 m² (max. 3 RoK)',
'5': 'Gäller städning för 80 - 99 m² (max. 4 RoK)',
'6': 'Gäller städning för 100 - 125 m² (max. 5 RoK)',
'7': 'Gäller städning för 126 - 149 m² (max. 5 RoK)',
'8': 'Gäller städning för 150 m² +'
};

// Frequency pricing mapping
const frequencyPricing = {
'weekly': 225,
'biweekly': 255,
'monthly': 285,
'oneoff': 315
};

// Additional services pricing mapping
const additionalServicesPricing = {
    '200': 200,
    '285': 285,
    'true': 0
};

// Function to calculate and update price
function calculatePrice() {
    const selectedDuration = document.querySelector('.duration-option.selected')?.getAttribute('data-duration');
    const selectedFrequency = document.querySelector('.frequency-option.selected')?.getAttribute('data-frequency');
    const additionalServices = document.querySelectorAll('input[type="checkbox"]:checked');
    const windowsSelected = document.querySelector('input[data-frequency="true"]:checked');
    const additionalServicesTotal = Array.from(additionalServices).reduce((total, service) => {
        const servicePrice = additionalServicesPricing[service.getAttribute('data-frequency')];
        return total + (servicePrice || 0);
    }, 0);
    
    if (selectedDuration && selectedFrequency) {
        const hours = parseInt(selectedDuration);
        const ratePerHour = frequencyPricing[selectedFrequency];
        const totalPrice = (hours * ratePerHour) + additionalServicesTotal;
        const asterisk = windowsSelected ? '*' : '';
        
        document.getElementById('summary-price').innerHTML = `<strong class="section-title">${totalPrice} kr${asterisk}</strong>`;
        
        // Show/hide windows note
        const windowsNote = document.getElementById('windows-note');
        if (windowsSelected) {
            windowsNote.style.display = 'block';
        } else {
            windowsNote.style.display = 'none';
        }
    } else {
        document.getElementById('summary-price').textContent = 'Inget att kalkylera än';
        document.getElementById('windows-note').style.display = 'none';
    }
}

// Handle duration option selection
document.querySelectorAll('.duration-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all duration options
        document.querySelectorAll('.duration-option').forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Update recommendation text
        const duration = this.getAttribute('data-duration');
        const recommendationText = durationRecommendations[duration];
        document.getElementById('duration-recommendation').textContent = recommendationText;
        
        // Update summary
        document.getElementById('summary-duration').textContent = duration + ' timmar';
        
        // Calculate and update price
        calculatePrice();
    });
});

// Handle frequency option selection
document.querySelectorAll('.frequency-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all frequency options
        document.querySelectorAll('.frequency-option').forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Update summary
        const frequency = this.getAttribute('data-frequency');
        let frequencyText = '';
        switch(frequency) {
            case 'weekly': frequencyText = 'Veckovis'; break;
            case 'biweekly': frequencyText = 'Varannan vecka'; break;
            case 'monthly': frequencyText = 'En gång i månaden'; break;
            case 'oneoff': frequencyText = 'Enstaka städning'; break;
        }
        document.getElementById('summary-frequency').textContent = frequencyText;
        
        // Calculate and update price
        calculatePrice();
    });
});

// Handle additional services checkbox changes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        calculatePrice();
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
document.querySelectorAll('.duration-option.selected, .frequency-option.selected').forEach(el => el.classList.remove('selected'));
document.getElementById('cleaning_products').checked = false;
document.getElementById('ironing_1').checked = false;
document.getElementById('fridge').checked = false;
document.getElementById('windows').checked = false;
document.getElementById('name').value = '';
document.getElementById('phone').value = '';
document.getElementById('email').value = '';
document.getElementById('address1').value = '';
document.getElementById('city').value = '';
document.getElementById('postal-code').value = '';
document.getElementById('comments').value = '';
document.getElementById('code').value = '';

// Reset summary section
document.getElementById('summary-date').textContent = 'Inte valt';
document.getElementById('summary-time').textContent = 'Inte valt';
document.getElementById('summary-frequency').textContent = 'Inte valt';
document.getElementById('summary-duration').textContent = 'Inte valt';
document.getElementById('summary-price').textContent = 'Inget att kalkylera än';
document.getElementById('windows-note').style.display = 'none';
}

function submitBooking() {
const date = document.getElementById('booking-date').value;
const time = document.getElementById('booking-time').value;
const duration = document.querySelector('.duration-option.selected')?.getAttribute('data-duration');
const frequency = document.querySelector('.frequency-option.selected')?.getAttribute('data-frequency');
const cleaningSuply = document.getElementById('cleaning_products').checked ? 'TRUE' : 'FALSE';
const ironing1 = document.getElementById('ironing_1').checked ? 'TRUE' : 'FALSE';
const fridge = document.getElementById('fridge').checked ? 'TRUE' : 'FALSE';
const windows = document.getElementById('windows').checked ? 'TRUE' : 'FALSE';
const deepClean = setvalue = "";
const movingClean = setvalue = "";
const name = document.getElementById('name').value;
const phone = document.getElementById('phone').value;
const email = document.getElementById('email').value;
const address = document.getElementById('address1').value;
const city = document.getElementById('city').value;
const postalCode = document.getElementById('postal-code').value;
const comments = document.getElementById('comments').value;
const code = document.getElementById('code').value;

if (!date || !time || !duration || !frequency || !name || !phone || !email || !address || !city || !postalCode) {
    M.toast({html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red'});
    return;
}

const formData = new URLSearchParams({
    date, time, duration, frequency, cleaningSuply, ironing1, fridge, windows, deepClean, movingClean, name, phone, email, address, city, postalCode, comments, code
});

const preloader = document.getElementById('preloader');
preloader.style.display = 'block';

fetch('https://script.google.com/macros/s/AKfycbxxdlA1qsJyaMn6AIiRVQ3f09-rXrusaG98yxCCuS5ey5c4wt4Ux5dwr19UugDw7SBAcw/exec', {
    method: 'POST',
    body: formData
})
.then(response => {
    preloader.style.display = 'none';
    if (response.ok) {
    M.toast({html: 'Tack för visat intresse.😊 Bokning skickad! Vi hör av oss inom 30 minuter!👍', classes: 'green'});
    clearFormFields();
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