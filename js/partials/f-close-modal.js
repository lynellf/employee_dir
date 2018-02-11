function closeModal() {
    var xIcon = document.querySelector('.modal__close'),
        basicInfo = document.querySelector('.modal__basic'),
        moreInfo = document.querySelector('.modal__more');

    function removeNodes() {
      employeeDetails.className = '';
      overlay.className = 'directory__overlay--inactive';
      modalBack.setAttribute('class', 'modal__back--inactive');
      modalForward.setAttribute('class', 'modal__forward--inactive');
      while (employeeDetails.firstChild) {
        employeeDetails.removeChild(employeeDetails.firstChild);
      }
    }


    xIcon.addEventListener('click', function () {
        removeNodes();
    });

    overlay.addEventListener('click', function () {
        removeNodes();
    });
}