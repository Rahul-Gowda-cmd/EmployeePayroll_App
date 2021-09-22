// uc1
window.addEventListener('DOMContentLoaded', (event) => {
  validateName();
  salaryOutput();
  validateDate();
  checkForUpdate();
});

// uc2
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

function validateDate() {
  const day = document.querySelector('#day');
  const month = document.querySelector('#month');
  const year = document.querySelector('#year');

  day.addEventListener('input', checkDate);
  month.addEventListener('input', checkDate);
  year.addEventListener('input', checkDate);
}

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

// uc8
function salaryOutput() {
  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });
}

let isUpdate = false;


// uc3 
const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    let empData = setEmployeePayrollObject();
    createAndUpdateStorage(empData);
    resetForm();
    window.location.replace(site_properties.home_page)
  } catch (e) {
    console.log(e)
    return;
  }
}


let employPayrollObject = {};

const setEmployeePayrollObject = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    alert("Employee Name: " + getInputValueById('#name'))
    employeePayrollData.name = getInputValueById('#name');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
  } catch (e) {
    if ('Incorrect Name' == e) {
      setTextValue('.text-error', e);
    } else {
      setTextValue('.date-error', e);
    }
    throw e
  }
  employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  employeePayrollData.id = employPayrollObject._id;
  let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
  employeePayrollData.date = Date.parse(date);
  // alert(employeePayrollData.toString());
  return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
}

// uc4 

const createNewEmpId = () => {
  let empId = localStorage.getItem('EmpId');
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem('EmpId', empId);
  return empId;
}

const createAndUpdateStorage = (data) => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList) {
    let existingEmpData = employeePayrollList.find(empData => empData._id == data.id);
    console.log(existingEmpData, employeePayrollList._id);
    if (!existingEmpData) {
      data._id = createNewEmpId();
      employeePayrollList.push(data);
    } else {
      const index = employeePayrollList.map(empData => empData._id).indexOf(data.id);
      employeePayrollList.splice(index, 1, data);
      console.log(employeePayrollList)
    }
  } else {
    data._id = createNewEmpId();
    employeePayrollList = [data]
  }
  confirm(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

// uc5 
const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('.salary-output', 400000);
  setTextValue(".text-error", '');
  setTextValue(".date-error", '');
  setValue('#notes', '');
  setValue('#day', '1');
  setValue('#month', 'Jan');
  setValue('#year', '2020');
}
const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

const setTextValue = (id, value) => {
  let textError = document.querySelector(id);
  textError.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

// Update

const checkForUpdate = () => {
  const jsonData = localStorage.getItem('edit-emp');
  isUpdate = jsonData ? true : false;
  if (!isUpdate) return;
  employPayrollObject = JSON.parse(jsonData);
  setForm();
}

const setForm = () => {
  setValue('#name', employPayrollObject._name);
  setSelectedValue('[name = profile]', employPayrollObject._profilePic);
  setSelectedValue('[name = gender]', employPayrollObject._gender);
  setSelectedValue('[name = department]', employPayrollObject._department);
  setValue('#salary', employPayrollObject._salary);
  setTextValue('.salary-output', employPayrollObject._salary);
  let date = stringifyDate(employPayrollObject._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
  setValue('#notes', employPayrollObject._note);
}

const setSelectedValue = (propertyValue, value) => {
  let allItem = document.querySelectorAll(propertyValue);
  allItem.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    } else if (item.value === value) {
      item.checked = true;
    }
  });
}