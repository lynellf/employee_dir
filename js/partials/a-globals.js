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