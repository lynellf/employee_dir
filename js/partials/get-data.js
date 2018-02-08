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