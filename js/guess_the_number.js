'use strict';
window.onload = function() {

// СОЗДАТЬ СРАБАТЫВАЕМУЮ ФУНКЦИЮ ПРИ КЛИКЕ 
document.querySelector('#guessTheNumber').addEventListener('click',function() {

// ВЫПОЛНЯЕМ ФУНКЦИЮ ЕСЛИ ПОЛЬЗОВАТЕЛЬ СОГЛАСИЛСЯ СЫГРАТЬ

    // ГЕНЕРИРУЕМ СЛУЧАЙНОЕ ЧИСЛО ОТ 0 ДО 100 И СОЗДАЕМ СЧЕТЧИК ПОПЫТОК
    function letsplay() {
        let generateRandomNumber = Math.ceil(Math.random() * Math.floor(100));
        console.log('GenerateRandomNumber = ' + typeof generateRandomNumber + ' ' + generateRandomNumber);
        let counter = 10;
        alert('У вас 10 попыток. Lets go');

        // ЗАПРАШИШВАЕМ ЧИСЛО У ПОЛЬЗОВАТЕЛЯ
        let askUserNumber = function() {
            let getUserNumber = prompt('Введите число от 1 до 100 :)');
            console.log('GetUserNumber = ' + typeof getUserNumber + ' ' + getUserNumber); 

            let convertToNumber = +getUserNumber;
            console.log('convertToNumber = ' + typeof convertToNumber + ' ' + convertToNumber);


            // ПРОВЕРИТЬ НА ЧИСЛО
            let isNumber = function(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            
            // ПРЕДУПРЕДИТЬ ЧТО ВВЕЛИ НЕ ЧИСЛО 
            let warnUser = function() {
                alert('Введите число, например : 7 -_-');
                askUserNumber();
            };

            // ПРОВЕРИТЬ НА НАЖАТУЮ ESCAPE И ОТМЕНА          
            if (getUserNumber === null) {
                alert('До свидания !');
                return;
            } else if (!isNumber(getUserNumber)) {
                console.log('typeof getUserNumber = ' + typeof getUserNumber + ' ' + getUserNumber);
                alert('НЕ ЧИСЛО X_x');
                warnUser();
            }

            // let checkCounter = function() {
                
            // };
            // console.log('counter = ' + typeof counter + ' ' + counter);

            // СРАВНИТЬ ЧИСЛО И ОТНЯТЬ 1 У СЧЕТЧИКА
            let compareUserNumber = function() {
                let compareUserNumberConfirm;
                counter--;
                let checkCounterConfirm;
                if (counter <= 0) {
                    checkCounterConfirm = confirm('Попытки закончились, хотите сыграть еще?'); 
                        if (checkCounterConfirm === true) {
                            return letsplay();
                        } else {
                            return false;
                        }
                }
                if (convertToNumber > generateRandomNumber) {
                    alert('Ваше число больше, осталось ' + counter + ' попыток :)');
                    // checkCounter();
                    
                } else if (convertToNumber < generateRandomNumber) {
                    alert('Ваше число меньше, осталось ' + counter + ' попыток :)');
                    // checkCounter();
                    
                } else if (convertToNumber === generateRandomNumber) {
                    compareUserNumberConfirm = confirm('Поздравляю, Вы угадали !!! Хотели бы сыграть еще ?'); 
                        if (compareUserNumberConfirm === true) {
                            return letsplay();
                        } else {
                            return false;
                        }
                }
                askUserNumber();
                
            };
            compareUserNumber();

        };
        askUserNumber();
    }
    // спрашиваем пользователя хочет ли он сыграть ?
    let start = function() {
        let question = confirm('Угадай число от 1 до 100');
        console.log('question = ' + 'тайпоф : ' + typeof question + ', значение : ' + question);
        if (question === true) {
            letsplay();
        }
    };
    start();
});
};