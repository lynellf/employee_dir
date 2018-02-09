var users = [],
    cards = [],
    userDir = document.querySelector('.users'),
    overlay = document.querySelector('#overlay'),
    employeeDetails = document.querySelector('#employeeDetails');
// Step one: Get and display 12 randomusers from The RandomUser Generator API
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
      
      users = data.results;
      console.log(data);
      for(var i = 0; i < users.length; i++) {

        // Generate DOM elements
        var userCard = document.createElement('div'),
          info = document.createElement('div'),
          name = document.createElement('h3'),
          email = document.createElement('span'),
          city = document.createElement('span'),
          avy = new Image();

          // Set class names for each element
          info.className = 'card__info';
          name.className = 'card__name';
          email.className = 'card__email';
          city.className = 'card__city';
          avy.className = 'card__avy';
          userCard.className = 'users__card';

          // Insert generated content for each element
          avy.src = users[i]['picture']['large'];
          name.textContent = users[i]['name']['first'] + ' ' + users[i]['name']['last'];
          email.textContent = users[i]['email'];
          city.textContent = users[i]['location']['city'];
          
          // Append each element to the DOM
          info.appendChild(name);
          info.appendChild(email);
          info.appendChild(city);
          userCard.appendChild(avy);
          userCard.appendChild(info);
          userDir.appendChild(userCard);
      }
      // Set card array for further DOM manipulation
      cards = document.querySelectorAll('.users__card');
    }
  });
// Display employee details upon click
setTimeout(function() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function(event) {
      // Generate a true array of each card element
      // The indexOf method will not work otherwise
      var nodes = Array.prototype.slice.call(
        document.querySelectorAll('.users__card')
      );

      // event.currentTarget ensures capturing the DOM element via
      // event bubbling or propagation through the DOM tree.
      // We want to capture the event at the upmost parent element.
      if (event.currentTarget.className === 'users__card') {
        var currentCard = event.currentTarget,
        node = nodes.indexOf(currentCard),
        cardPosition = cards[node].getBoundingClientRect(),
        topPosition = ((window.pageYOffset/document.body.scrollHeight * 100) + 10).toString(),
        date = new Date(users[node]['dob']),
          rect = cards[node].getBoundingClientRect(),
          // Generate DOM elements
          basicInfo = document.createElement('div'),
          moreInfo = document.createElement('div'),
          // Basic Info
          xIcon = document.createElement('span'),
          avy = new Image(),
          name = document.createElement('h3'),
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
        email.className = 'modal__email';
        city.className = 'modal__city';
        avy.src = users[node]['picture']['large'];
        avy.className = 'modal__avy';
          // More info
        moreInfo.className = 'modal__more';
        phone.className = 'modal__phone';
        address.className = 'modal__address';
        birthdate.className = 'modal__birthdate';
        overlay.className = 'directory__overlay';

        // Insert generated content for each element
        xIcon.textContent = 'x';
        name.textContent =
          users[node]['name']['first'].charAt(0).toUpperCase() +
          ' ' +
          users[node]['name']['last'].charAt(0).toUpperCase();
        email.textContent = users[node]['email'];
        city.textContent = users[node]['location']['city'].charAt(0).toUpperCase();
        // More info
        phone.textContent = users[node]['cell'];

        address.textContent =
          users[node]['location']['street'].charAt(0).toUpperCase() +
          users[node]['location']['city'].charAt(0).toUpperCase() +
          ',' +
          ' ' +
          users[node]['location']['state'].charAt(0).toUpperCase() +
          ' ' +
          users[node]['location']['postcode'];
        birthdate.textContent = 'Birthdate: ' + date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();

        employeeDetails.className = 'modal';
        employeeDetails.style.top = topPosition + '%';
        // employeeDetails.style.left = leftPosition + '%';
        // employeeDetails.style.left = '35%';
        // employeeDetails.style.right = rightPosition + '%';
        // Basic Info
        basicInfo.appendChild(avy);
        basicInfo.appendChild(name);
        basicInfo.appendChild(email);
        basicInfo.appendChild(city);
        // More Info
        moreInfo.appendChild(phone);
        moreInfo.appendChild(address);
        moreInfo.appendChild(birthdate);
        employeeDetails.appendChild(xIcon);
        employeeDetails.appendChild(basicInfo);
        employeeDetails.appendChild(moreInfo);

        console.log(event);
        console.log(rect);
        console.log(window.pageYOffset);
      }
    });
  }
}, 900);

//# sourceMappingURL=js/main.js.map
