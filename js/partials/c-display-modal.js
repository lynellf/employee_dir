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
        // topPosition = (event.pageY / document.body.scrollHeight * 100).toString(),
        //   leftPosition = (cardPosition['left'] / window.innerWidth * 100).toString(),
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
        birthdate.textContent = 'Birthdate: ' + users[node]['dob'];

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
