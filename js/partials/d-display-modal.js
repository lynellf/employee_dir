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

