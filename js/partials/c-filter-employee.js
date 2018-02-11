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
