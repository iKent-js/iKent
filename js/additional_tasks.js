'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let showDays = document.querySelector('.mainMassive');
showDays.addEventListener('click', function() {
        for (let i = 0; i < 7; i++) {
            let newUl = document.createElement('li');
            let divNode = document.querySelectorAll('div')[11];
            let paren = divNode.parentNode;
            paren.insertBefore(newUl, divNode);
            newUl.innerHTML = week[0 + i];
            newUl.style.padding = '15px';
            newUl.style.listStyleType = 'circle';
            // newUl.innerHTML.getDate(newUl[i]);

            if(i > 4) {
                newUl.style.fontStyle = 'italic';
                newUl.style.listStyleType = 'square';
                newUl.style.fontWeight = 'bold';
            }
        }       
        
});
console.log(week);