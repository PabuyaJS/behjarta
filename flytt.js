// Initialize Materialize components

// Datepicker & Timepicker

document.addEventListener('DOMContentLoaded', function () {
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: 'yyyy-mm-dd',
        showClearBtn: true,
        firstDay: 1,
        disableDayFn: date => date.getDay() === 0 || date.getDay() === 6,
        i18n: {
            months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
            weekdays: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
            weekdaysShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
            weekdaysAbbrev: ['S', 'M', 'T', 'O', 'T', 'F', 'L']
        }
    });

    M.Timepicker.init(document.querySelectorAll('.timepicker'), {
        twelveHour: false,
        showClearBtn: true
    });
});

// Price Calculation

document.addEventListener('DOMContentLoaded', function () {
    const sqmInput = document.getElementById('sqm');

    sqmInput.addEventListener('input', () => {
        const sqm = parseInt(sqmInput.value, 10) || 0;
        let pricePerSqm = 0;
        const startFee = 149;

        if (sqm >= 0 && sqm <= 29) pricePerSqm = 57;
        else if (sqm >= 30 && sqm <= 49) pricePerSqm = 55;
        else if (sqm >= 50 && sqm <= 79) pricePerSqm = 53;
        else if (sqm >= 80 && sqm <= 99) pricePerSqm = 51;
        else if (sqm >= 100 && sqm <= 125) pricePerSqm = 49;
        else if (sqm >= 126 && sqm <= 149) pricePerSqm = 47;
        else if (sqm >= 150) pricePerSqm = 45;

        const areaPrice = sqm * pricePerSqm;
        const totalPrice = areaPrice + startFee;

        document.getElementById('summary-area').textContent = sqm ? `${sqm} m²` : 'Inte valt';
        document.getElementById('area-price').textContent = pricePerSqm ? `${pricePerSqm} kr` : 'Inte valt';
        document.getElementById('start-fee').textContent = pricePerSqm ? `${startFee} kr` : 'Inte lagt till';
        document.getElementById('summary-price').innerHTML = totalPrice ? `<strong class="section-title3">${totalPrice} kr</strong>` : 'Inget att kalkylera än';
    });
});

// Update summary on date/time change

document.getElementById('booking-date').addEventListener('change', function () {
    document.getElementById('summary-date').textContent = this.value || 'Inte valt';
});

document.getElementById('booking-time').addEventListener('change', function () {
    document.getElementById('summary-time').textContent = this.value || 'Inte valt';
});

// Clear form fields

function clearFormFields() {
    const fields = ['booking-date', 'booking-time', 'sqm', 'nameMove', 'phoneMove', 'emailMove', 'addressMove', 'cityMove', 'postalMove', 'commentsMove', 'codeMove'];
    fields.forEach(id => document.getElementById(id).value = '');

    document.getElementById('summary-date').textContent = 'Inte valt';
    document.getElementById('summary-time').textContent = 'Inte valt';
    document.getElementById('summary-area').textContent = 'Inte valt';
    document.getElementById('area-price').textContent = 'Inte valt';
    document.getElementById('start-fee').textContent = 'Inte lagt till';
    document.getElementById('summary-price').textContent = 'Inget att kalkylera än';
    document.getElementById('windows-note').style.display = 'none';
    document.getElementById('codeMove').value = '';
}

// Submit booking

function submitBooking() {
    const formValues = {
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        duration: "",
        frequency: "",
        cleaningSuply: 'FALSE',
        ironing1: 'FALSE',
        fridge: 'FALSE',
        windows: 'FALSE',
        deepClean: "",
        movingClean: document.getElementById('sqm').value,
        name: document.getElementById('nameMove').value,
        phone: document.getElementById('phoneMove').value,
        email: document.getElementById('emailMove').value,
        address: document.getElementById('addressMove').value,
        city: document.getElementById('cityMove').value,
        postalCode: document.getElementById('postalMove').value,
        comments: document.getElementById('commentsMove').value,
        code: document.getElementById('codeMove').value
    };

    // Fields that are truly optional / auto-filled
    const optionalFields = ['duration', 'frequency', 'cleaningSuply', 'ironing1', 'fridge', 'windows', 'deepClean', 'comments', 'code'];

    // Check required fields
    for (let key in formValues) {
        if (optionalFields.includes(key)) continue;
        if (formValues[key] === '' || formValues[key] === null || formValues[key] === undefined) {
            M.toast({ html: 'Vänligen fyll i alla obligatoriska fält', classes: 'red' });
            return;
        }
    }

    // Check terms checkbox separately
    const termsCheckbox = document.querySelector('input[data-frequency="true"]');
    if (!termsCheckbox || !termsCheckbox.checked) {
        M.toast({ html: 'Du måste godkänna villkoren för att fortsätta', classes: 'red' });
        return;
    }

    const preloader4 = document.getElementById('preloader4');
    preloader4.style.display = 'block';

    fetch('https://script.google.com/macros/s/AKfycbxxdlA1qsJyaMn6AIiRVQ3f09-rXrusaG98yxCCuS5ey5c4wt4Ux5dwr19UugDw7SBAcw/exec', {
        method: 'POST',
        body: new URLSearchParams(formValues)
    })
    .then(async response => {
        preloader4.style.display = 'none';
        if (response.ok) {
            M.toast({ html: 'Tack för visat intresse.😊 Bokning skickad! Vi hör av oss inom 30 minuter!👍', classes: 'green' });
            clearFormFields();
        } else {
            const text = await response.text();
            console.error('Server Error:', text);
            M.toast({ html: 'Något gick fel med servern. Försök igen senare.', classes: 'red' });
        }
    })
    .catch(error => {
        preloader4.style.display = 'none';
        console.error('Fetch Error:', error);
        M.toast({ html: 'Nätverksfel. Kontrollera din anslutning.', classes: 'red' });
    });
}
