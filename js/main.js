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
        topPosition = (event.pageY / document.body.scrollHeight * 100).toString(),
          leftPosition = (cardPosition['left'] / window.innerWidth * 100).toString(),
        //   rightPosition = ((event.pageX / window.innerWidth * 100)).toString(),
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
        basicInfo.className = 'details__basic';
        avy.src = users[node]['picture']['large'];
        avy.className = 'details__avy';
        moreInfo.className = 'details__more';
        overlay.className = 'site__overlay';

        // Insert generated content for each element
        xIcon.textContent = 'X';
        name.textContent =
          users[node]['name']['first'] +
          ' ' +
          users[node]['name']['last'];
        email.textContent = users[node]['email'];
        city.textContent = users[node]['location']['city'];
        // More info
        phone.textContent = users[node]['cell'];

        address.textContent =
          users[node]['location']['street'] +
          users[node]['location']['city'] +
          ',' +
          ' ' +
          users[node]['location']['state'] +
          ' ' +
          users[node]['location']['postcode'];
        birthdate.textContent = users[node]['dob'];

        employeeDetails.className = 'site__employee';
        employeeDetails.style.top = topPosition + '%';
        employeeDetails.style.left = leftPosition + '%';
        // employeeDetails.style.right = rightPosition + '%';
        // Basic Info
        basicInfo.appendChild(xIcon);
        basicInfo.appendChild(avy);
        basicInfo.appendChild(name);
        basicInfo.appendChild(email);
        basicInfo.appendChild(city);
        // More Info
        moreInfo.appendChild(phone);
        moreInfo.appendChild(address);
        moreInfo.appendChild(birthdate);
        employeeDetails.appendChild(basicInfo);
        employeeDetails.appendChild(moreInfo);

        console.log(event);
        console.log(rect);
      }
    });
  }
}, 900);

//# sourceMappingURL=js/main.js.map
