var employees = [],
    cards = [],
    userDir = document.querySelector('.employees'),
    overlay = document.querySelector('#overlay'),
    modal = document.querySelector('.modal__container'),
    modalBack = document.querySelector('#modalBack'),
    modalForward = document.querySelector('#modalForward'),
    employeeDetails = document.querySelector('#employeeDetails'),
    searchBar = document.querySelector('.header__search'),
    employeesLoaded = false;

    function capitalize (string) {
      var firstLetter = string.charAt(0),
        restOfString = string.slice(1),
        upperCaseFirstLetter = firstLetter.toUpperCase();

      return upperCaseFirstLetter + restOfString;
    }

    function capAll (string) {
        var sentence = string.split(' '),
            newSentence = [];
        for (var i = 0; i < sentence.length; i++) {
            newSentence.push(capitalize(sentence[i]));
        }
        return newSentence.join(' ');
    }
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

// Add a way to filter the directory by name or username. To do this, you'll need to
// request a random user nationality that will only return data in the English alphabet.
// Note: you don't have to rely on the API to return search results. You'll need to write
// functionality that fulters results once they are already on the page.

function searchEmployee() {
  var names = [],
    userNames = [];

  searchBar.addEventListener('keyup', function(event) {
    var query = event.target.value.toLowerCase();
    for (var i = 0; i < employees.length; i++) {
      if (
        employees[i]['name']['first'].indexOf(query) > -1 ||
        employees[i]['name']['last'].indexOf(query) > -1 ||
        employees[i]['login']['username'].indexOf(query) > -1
      ) {
        cards[i].className = 'employees__card';
      } else {
        cards[i].className = 'employees__card--hidden';
      }
    }
  });
}

// Display employee details upon click
function displayModal() {
  if (employeesLoaded === true) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function(event) {

        // event.currentTarget ensures capturing the DOM element via
        // event bubbling or propagation through the DOM tree.
        // We want to capture the event at the upmost parent element.
        if (event.currentTarget.className === 'employees__card') {
          // Create a modal window that will pop up when any part of the user's row is clicked.
          // The following details should display in the modal window:
            // Image
            // Name
            // Username
            // Email
            // Cell Number
            // Detailed Address, including street name number, city country, and postal code
            // Birthdate
          var index = parseInt(event.currentTarget.getAttribute('index')),
            cardPosition = cards[index].getBoundingClientRect(),
            topPosition = (window.pageYOffset / document.body.scrollHeight * 100 + 5).toString(),
            date = new Date(employees[index]['dob']),
            // Generate DOM elements
            basicInfo = document.createElement('div'),
            moreInfo = document.createElement('div'),
            // Basic Info
            xIcon = document.createElement('span'),
            avy = new Image(),
            name = document.createElement('h3'),
            username = document.createElement('span'),
            email = document.createElement('span'),
            city = document.createElement('span'),
            // More info
            phone = document.createElement('span'),
            address = document.createElement('span'),
            birthdate = document.createElement('span');

          // Set classNames and attributes
          // Basic info
          basicInfo.className = 'modal__basic';
          xIcon.className = 'modal__close';
          name.className = 'modal__name';
          username.className = 'modal__username';
          email.className = 'modal__email';
          city.className = 'modal__city';
          avy.src = employees[index]['picture']['large'];
          avy.className = 'modal__avy';

          // More info
          moreInfo.className = 'modal__more';
          phone.className = 'modal__phone';
          address.className = 'modal__address';
          birthdate.className = 'modal__birthdate';
          overlay.className = 'directory__overlay';

          // Navigation
          if(index > 0) {
            modalBack.setAttribute('class', 'modal__back');
          } else {
            modalBack.setAttribute('class', 'modal__back--inactive');
          }

          if (index === (employees.length -1)) {
            modalForward.setAttribute('class', 'modal__forward--inactive');
          } else {
            modalForward.setAttribute('class', 'modal__forward');
          }
          modalBack.setAttribute('index', index);
          modalForward.setAttribute('index', index);

          // Insert generated content for each element
          name.textContent = capAll(employees[index]['name']['first'])
               + ' ' + capAll(employees[index]['name']['last']);
          username.textContent = 'Username: ' + employees[index]['login']['username'];
          email.textContent = employees[index]['email'];
          city.textContent = capitalize(employees[index]['location']['city']);
          // More info
          phone.textContent = employees[index]['cell'];

          address.textContent = capAll(employees[index]['location']['street']) + ' ' + capAll(employees[index]['location']['city']) + ',' + ' ' + capitalize(employees[index]['location']['state'])  + ' ' + employees[index]['location']['postcode'];
          birthdate.textContent = 'Birthdate: ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date
              .getFullYear()
              .toString()
              .substr(-2);

          employeeDetails.className = 'modal--inactive';
          modal.style.top = topPosition + '%';

          // Inserting DOM elements
          // Basic Info
          basicInfo.appendChild(avy);
          basicInfo.appendChild(name);
          basicInfo.appendChild(username);
          basicInfo.appendChild(email);
          basicInfo.appendChild(city);

          // More Info
          moreInfo.appendChild(phone);
          moreInfo.appendChild(address);
          moreInfo.appendChild(birthdate);
          employeeDetails.appendChild(xIcon);
          employeeDetails.appendChild(basicInfo);
          employeeDetails.appendChild(moreInfo);

          employeeDetails.className = 'modal';
        }
        closeModal();
      });
    }
  }
}


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

function closeModal() {
    var xIcon = document.querySelector('.modal__close'),
        basicInfo = document.querySelector('.modal__basic'),
        moreInfo = document.querySelector('.modal__more');

    function removeNodes() {
      employeeDetails.className = '';
      overlay.className = 'directory__overlay--inactive';
      modalBack.setAttribute('class', 'modal__back--inactive');
      modalForward.setAttribute('class', 'modal__forward--inactive');
      while (employeeDetails.firstChild) {
        employeeDetails.removeChild(employeeDetails.firstChild);
      }
    }


    xIcon.addEventListener('click', function () {
        removeNodes();
    });

    overlay.addEventListener('click', function () {
        removeNodes();
    });
}
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

// Step one: Get and display 12 randomusers from The RandomUser Generator API
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
      employees = data.results;
      console.log(employees);
      for(var i = 0; i < employees.length; i++) {
        // Generate DOM elements
        displayEmployee(i);
      }
      // Set card array for further DOM manipulation
      cards = document.querySelectorAll('.employees__card');
      employeesLoaded = true;
      displayModal();
      searchEmployee();
    }
  });

//# sourceMappingURL=js/main.js.map
