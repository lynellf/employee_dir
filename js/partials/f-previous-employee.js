modalBack.addEventListener('click', function(event) {
  var index = parseInt(event.currentTarget.getAttribute('index')),
    prevIndex = index - 1,
    nextIndex = index + 1,
    xIcon = document.querySelector('.modal__close'),
    avy = document.querySelector('.modal__avy'),
    name = document.querySelector('.modal__name'),
    username = document.querySelector('.modal__username'),
    email = document.querySelector('.modal__email'),
    city = document.querySelector('.modal__city'),
    phone = document.querySelector('.modal__phone'),
    address = document.querySelector('.modal__address'),
    date = new Date(employees[prevIndex]['dob']),
    birthdate = document.querySelector('.modal__birthdate');
  modalBack.setAttribute('index', prevIndex);
  modalForward.setAttribute('index', prevIndex);

  // Insert generated content for each element
  name.textContent =
    capAll(employees[prevIndex]['name']['first']) +
    ' ' +
    capAll(employees[prevIndex]['name']['last']);
  username.textContent = 'Username: ' + employees[prevIndex]['login']['username'];
  email.textContent = employees[prevIndex]['email'];
  city.textContent = capitalize(employees[prevIndex]['location']['city']);
  avy.src = employees[prevIndex]['picture']['large'];

  // More info
  phone.textContent = employees[prevIndex]['cell'];

  // Navigation
  if (prevIndex !== employees.length - 1) {
    modalForward.setAttribute('class', 'modal__forward');
  } else {
    modalForward.setAttribute('class', 'modal__forward--inactive');
  }
  if (prevIndex > 0) {
    modalBack.setAttribute('class', 'modal__back');
  } else {
    modalBack.setAttribute('class', 'modal__back--inactive');
  }

  address.textContent =
    capAll(employees[prevIndex]['location']['street']) +
    ' ' +
    capAll(employees[prevIndex]['location']['city']) +
    ',' +
    ' ' +
    capitalize(employees[prevIndex]['location']['state']) +
    ' ' +
    employees[prevIndex]['location']['postcode'];
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
