# employee_dir (Treehouse Project 10)

The employee directory project involved obtaining 'employee' information using the [Random User Generator API.](https://randomuser.me/) With the data, 'employee' information is dynamically generated and displayed to the DOM.

Objective Breakdown:

------------------------

### Get and display 12 random users from [The Random User Generator API](https://randomuser.me/)

Using photos and information that the API provides, you'll display 12 users, along with some basic information:

-   Image

-   First and Last Name

-   Email

-   City

````
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
````

### Create a modal window that will pop up when any part of the user's row is clicked. The following details should display in the modal window:

-   Image

-   Name

-   Username

-   Email

-   Cell Number

-   Detailed Address, including street name and number, city, country and post code.

-   Birthdate

````
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
            topPosition = (
              window.pageYOffset / document.body.scrollHeight * 100 +
              5
            ).toString(),
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
          if (index > 0) {
            modalBack.setAttribute('class', 'modal__back');
          } else {
            modalBack.setAttribute('class', 'modal__back--inactive');
          }

          if (index === employees.length - 1) {
            modalForward.setAttribute('class', 'modal__forward--inactive');
          } else {
            modalForward.setAttribute('class', 'modal__forward');
          }
          modalBack.setAttribute('index', index);
          modalForward.setAttribute('index', index);

          // Insert generated content for each element
          name.textContent =
            capAll(employees[index]['name']['first']) +
            ' ' +
            capAll(employees[index]['name']['last']);
          username.textContent =
            'Username: ' + employees[index]['login']['username'];
          email.textContent = employees[index]['email'];
          city.textContent = capitalize(employees[index]['location']['city']);
          // More info
          phone.textContent = employees[index]['cell'];

          address.textContent =
            capAll(employees[index]['location']['street']) +
            ' ' +
            capAll(employees[index]['location']['city']) +
            ',' +
            ' ' +
            capitalize(employees[index]['location']['state']) +
            ' ' +
            employees[index]['location']['postcode'];
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
````

####

### Structure and style the user directory so that it roughly matches the provide mockup.

-   Display the users in a grid or table

-   Add a hover state to the rows of the user table.

-   Make sure there's a way to close the modal window

````
.directory {
    background: $site-background;
    position: relative;
    display: flex;
    flex-direction: column;
    @include e('container') {
        @include flex();
        min-height: 100vh;
    }
    @include e('overlay') {
        position: absolute;
        top: 0%;
        opacity: .4;
        visibility: visible;
        background: gray;
        height: 100%;
        width: 100%;
        z-index: 100;
        transition: all .3s ease-in-out;

        @include m('inactive') {
            opacity: 0;
            visibility: hidden;
        }
    }
}
````

####

### Add a way to filter the directory by name or username. To do this, you'll need to request a random user nationality that will only return data in the English alphabet. Note: you don't have to rely on the API to return search results. You'll need to write functionality that filters results once they already on the page.

````
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
````

####

### Add a way to move back and forth between employee detail windows when the modal window is open.

````
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
````

