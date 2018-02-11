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
