function salaryOutput() {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
      output.textContent = salary.value;
    });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    salaryOutput();
  });

// function validate name
function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
      if (name.value.length == 0) {
        textError.textContent = "";
        return;
      }
      try {
        (new EmployeePayrollData()).name = name.value;
        textError.textContent = "";
      } catch (e) {
        console.error(e);
        textError.textContent = e;
      }
    });
  }
  
  // check date if it is within 30 days
  function checkDate() {
    const dateError = document.querySelector('.date-error');
    try {
      let date = day.value + " " + month.value + " " + year.value;
      (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }
  
  // function to validate date
  function validateDate() {
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    day.addEventListener('input', checkDate);
    month.addEventListener('input', checkDate);
    year.addEventListener('input', checkDate);
  }
  
  // add eventListener as the page loads
  window.addEventListener('DOMContentLoaded', () => {
    salaryOutput();
    validateName();
    validateDate();
  });