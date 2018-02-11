modalForward.addEventListener('click', function(event) {
  var index = parseInt(event.currentTarget.getAttribute('index')),
    nextIndex = index + 1,
    prevIndex = index - 1,
    xIcon = document.querySelector('.modal__close'),
    avy = document.querySelector('.modal__avy'),
    name = document.querySelector('.modal__name'),
    username = document.querySelector('.modal__username'),
    email = document.querySelector('.modal__email'),
    city = document.querySelector('.modal__city'),
    phone = document.querySelector('.modal__phone'),
    address = document.querySelector('.modal__address'),
    date = new Date(employees[nextIndex]['dob']),
    birthdate = document.querySelector('.modal__birthdate');
  modalBack.setAttribute('index', nextIndex);
  modalForward.setAttribute('index', nextIndex);

  // Insert generated content for each element
  name.textContent =
    capAll(employees[nextIndex]['name']['first']) +
    ' ' +
    capAll(employees[nextIndex]['name']['last']);
  username.textContent = 'Username: ' + employees[nextIndex]['login']['username'];
  email.textContent = employees[nextIndex]['email'];
  city.textContent = capitalize(employees[nextIndex]['location']['city']);
  avy.src = employees[nextIndex]['picture']['large'];
  // More info
  phone.textContent = employees[nextIndex]['cell'];
  // Navigation
  if (nextIndex !== employees.length -1) {
    modalForward.setAttribute('class', 'modal__forward');
  } else {
    modalForward.setAttribute('class', 'modal__forward--inactive');
  }
  if (nextIndex > 0) {
      modalBack.setAttribute('class', 'modal__back');
  }

  address.textContent =
    capAll(employees[nextIndex]['location']['street']) +
    ' ' +
    capAll(employees[nextIndex]['location']['city']) +
    ',' +
    ' ' +
    capitalize(employees[nextIndex]['location']['state']) +
    ' ' +
    employees[nextIndex]['location']['postcode'];
  birthdate.textContent =
    'Birthdate: ' +
    (date.getMonth() + 1) +
    '/' +
    date.getDate() +
    '/' +
    date
      .getFullYear()
      .toString()
      .substr(-2);
});
