'use strict';

let money, 
    income,
    addExpenses,
    deposit,
    mission,
    period;

alert('ученик JS 12');
console.log('Привет ! Я не художник, я только учусь !');



(function() {
    var button = document.getElementById('toggle-menu');
    button.addEventListener('click', function(event) {
        event.preventDefault();
        var menu = document.getElementById('main-menu');
        menu.classList.toggle('is-open');
    });
})();