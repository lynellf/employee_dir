// Get and display 12 random users from The Random User Generator API
  // Using photos and information that the API provides, you'll display 12 users,
  // along with some basic information
    // Image
    // First and last name
    // Email
    // City

function displayEmployee(i) {
  var employeeCard = document.createElement('div'),
    info = document.createElement('div'),
    name = document.createElement('h3'),
    email = document.createElement('span'),
    city = document.createElement('span'),
    avy = new Image();

  // Set class names and attributes for each element
  info.className = 'card__info';
  name.className = 'card__name';
  email.className = 'card__email';
  city.className = 'card__city';
  avy.className = 'card__avy';
  employeeCard.className = 'employees__card';
  employeeCard.setAttribute('index', i);

  // Insert generated content for each element
  avy.src = employees[i]['picture']['large'];
  name.textContent = capitalize(employees[i]['name']['first']) + ' ' + capitalize(employees[i]['name']['last']);
  email.textContent = employees[i]['email'];
  city.textContent = capAll(employees[i]['location']['city']);
  
  // Shrink emails if they're longer than 25 characters
  if (employees[i]['email'].length > 25) {
    email.style.fontSize = '12px';
  }

  // Append each element to the DOM
  info.appendChild(name);
  info.appendChild(email);
  info.appendChild(city);
  employeeCard.appendChild(avy);
  employeeCard.appendChild(info);
  userDir.appendChild(employeeCard);
}
