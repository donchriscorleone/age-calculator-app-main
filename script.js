const form = document.getElementById('form');

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();

dayInput.addEventListener('keyup', onChange);
monthInput.addEventListener('keyup', onChange);
yearInput.addEventListener('keyup', onChange);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let futureDate = getDate();
    const {y, m, d} = calculateAge(date, futureDate);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return;
     
    const remainingDaysEl = document.querySelector('.result-days .digit');
    remainingDaysEl.classList.add('result-animation');

    const remainingMonthsEl = document.querySelector('.result-months .digit');
    remainingMonthsEl.classList.add('result-animation');

    const remainingYearsEl = document.querySelector('.result-years .digit');
    remainingYearsEl.classList.add('result-animation');

    remainingDaysEl.innerText = d > 9 ? d : `0${d}`;
    remainingMonthsEl.innerText = m > 9 ? m : `0${m}`;
    remainingYearsEl.innerText = y > 9 ? y : `0${y}`;

    setTimeout(() => {
        remainingDaysEl.classList.remove('result-animation');
        remainingMonthsEl.classList.remove('result-animation');
        remainingYearsEl.classList.remove('result-animation');

    }, 500)
})

function getNecessaryElements(e) {
    const formFieldEl = e.target.parentElement;
    const errorMessageEl = formFieldEl.querySelector('.form-field-error-message');

    return {formFieldEl, errorMessageEl};
}

function onChange(e) {
    const name = e.target.name;
    const { formFieldEl, errorMessageEl } = getNecessaryElements(e);

    let {isValid, message} = validateInput(e);
    if (!isValid) {
        formFieldEl.classList.add('error');
        errorMessageEl.innerText = message;
        return;
    }

    if (name === 'day') {
        let { isValid, message } = validateDay(e);
        if (!isValid) {
            formFieldEl.classList.add('error');
            errorMessageEl.innerText = message;
            return;
        }
    } else if (name === 'month') {
        let { isValid, message } = validateMonth(e);
        if (!isValid) {
            formFieldEl.classList.add('error');
            errorMessageEl.innerText = message;
            return;
        }
    } else {
        let { isValid, message } = validateYear(e);
        if (!isValid) {
            formFieldEl.classList.add('error');
            errorMessageEl.innerText = message;
            return;
        }
    }

    formFieldEl.classList.remove('error');
    errorMessageEl.innerText = "";
}

function getDate() {
    let yearValue = parseInt(yearInput.value);
    let monthIndex = parseInt(monthInput.value) - 1;
    let day = parseInt(dayInput.value);
    return new Date(yearValue, monthIndex, day);
}

// Helper functions
function validateInput(e) {
    const value = e.target.value;
    const parsed = parseInt(e.target.value);
    const obj = {"isValid": true, "message": ''}

    if (value === "") {
        obj.isValid = false;
        obj.message = "This field is required"
    } else if (isNaN(parsed)) {
        obj.isValid = false;
        obj.message = "Must be a number"
    }

    return obj;
}

function validateDay(e) {
    const value = e.target.value;
    const parsed = parseInt(value);
    const month = parseInt(monthInput.value);
    const obj = {"isValid": true, "message": ''};

    if (parsed < 1 || parsed > 31) {
        obj.message = "Must be between 1 and 31";
    } else if (parsed === 31 && month === 4) {
        obj.message = "Must be between 1 and 30";
    }

    obj.isValid = obj.message === '';

    return obj;
}

function validateMonth(e) {
    const value = e.target.value;
    const parsed = parseInt(value);
    const day = parseInt(dayInput.value);
    const obj = {"isValid": true, "message": ''};

    if (parsed < 1 || parsed > 12) {
        obj.message = "Must be between 1 and 12";
    } else if (day === 31 && parsed === 4) {
        obj.message = "April only has 30 days.";
    }

    obj.isValid = obj.message === '';
    return obj;
}

function validateYear(e) {
    const value = e.target.value;
    const parsed = parseInt(value);
    const obj = {"isValid": true, "message": ''};
    if (parsed < year) {
        obj.message = "Must be in future";
    }

    obj.isValid = obj.message === '';
    return obj;
}

function calculateAge(date1, date2) {
    var d1 = date1.getDate();
    var m1 = 1 + date1.getMonth();
    var y1 = date1.getFullYear();

    var d2 = date2.getDate();
    var m2 = 1 + date2.getMonth();
    var y2 = date2.getFullYear();

    const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(d1 > d2){
      d2 = d2 + month[m2 - 1];
      m2 = m2 - 1;
    }
    if(m1 > m2){
      m2 = m2 + 12;
      y2 = y2 - 1;
    }

    const d = d2 - d1;
    const m = m2 - m1;
    const y = y2 - y1;
  
    return {d, m, y};
}