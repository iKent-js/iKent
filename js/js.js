'use strict';

let money = 50, 
    income = '"работа с сайтом"',
    addExpenses = 'такси, кафе, мобильный, прочее',
    deposit = true,
    mission = 250000,
    period = 7,
    budgetDay = money / 30;

alert('ученик JS 12');
console.log('Привет ! Я не художник, я только учусь !');
console.log(typeof money, income, deposit);
console.log('длина строки addExpenses = ' + addExpenses.length + ' символам');
console.log('Период равен ' + period + ' месяцам.', 'Цель заработать ' + mission + ' рублей.');
console.log(addExpenses.toLowerCase().split(' '));
console.log(budgetDay);