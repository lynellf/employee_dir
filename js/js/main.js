// Step one: Get and display 12 randomusers from The RandomUser Generator API
var users = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
      users = data.results;
      console.log(data)
    }
  });
//# sourceMappingURL=js/main.js.map
