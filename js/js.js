'use strict';

let money = prompt('Ваш месячный доход ?', 'Введите число !');
    money = (parseFloat(money));
console.log(money); 

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.toUpperCase().split(','));

let income = '"работа с сайтом"';


let deposit = confirm('Есть ли у вас депозит в банке ?');
    // deposit = (!!(deposit));
console.log(deposit);

let expenses1 = prompt('Введите обязятельную статью расходов ?');
console.log(expenses1);

let amount1 = prompt('Расходы по ' + expenses1 + ' Во сколько это обойдется ?');
    amount1 = (Number(amount1));
console.log(amount1);

let expenses2 = prompt('Введите обязательную статью расходов ?');
console.log(expenses2);   

let amount2 = prompt('Расходы по ' + expenses2 + ' Во сколько это обойдется ?');
    amount2 = (Number(amount2));
console.log(amount2);

let mission = 250000;

// Удалить из кода переменную budgetMonth
// let budgetMonth = money - (amount1 + amount2);
//     console.log(budgetMonth);

// Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(arg1, arg2) {
    return arg1 + arg2;   
}
getExpensesMonth(amount1, amount2);
console.log('Рузультат вызова функции getExpensesMonth ' + getExpensesMonth(amount1, amount2));

// Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(arg1, arg2, arg3) {
    return arg1 - (arg2 + arg3);
}
getAccumulatedMonth(money, amount1, amount2);
console.log('Накопления за месяц ' + getAccumulatedMonth(money, amount1, amount2));

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth вариант 1
let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
console.log('Месячные накопления составляют ' + accumulatedMonth);

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth вариант 2
let accumulatedMonth1 = function(arg1, arg2, arg3) {
    // console.log(arguments);
    accumulatedMonth1 = arg1 - (arg2 + arg3);
};
accumulatedMonth1(money, amount1, amount2);
console.log('Накопления за месяц составляют ' + accumulatedMonth1);


// showTypeOf
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
// Объявить функцию getTargetMonth.
// Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth)
// и возвращает результат
function getTargetMonth(arg1, arg2) {
    return arg1 / arg2;
}
getTargetMonth(mission, accumulatedMonth);

let getTargetMonts = mission / accumulatedMonth;
console.log('Цель будет достигнута через ' + Math.ceil(getTargetMonts) + ' месяцев(а)');

let budgetDay = accumulatedMonth / 30;
console.log('Дневной бюджет составляет ' + Math.floor(budgetDay));

//     period = 7,
//     budgetDay = money / 30;

// alert('ученик JS 12');
// console.log('Привет ! Я не художник, я только учусь !');
// console.log(typeof money, income, deposit);
// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit);
// console.log('длина строки addExpenses = ' + addExpenses.length + ' символам');
// console.log('Период равен ' + period + ' месяцам.', 'Цель заработать ' + mission + ' рублей.');
// console.log(addExpenses.toLowerCase().split(' '));
// console.log(budgetDay.toFixed(1));
   
let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } 
    if (accumulatedMonth > 600 && budgetDay < 1200 ) {
        return ('У вас средний уровень дохода');
    } 
    if (budgetDay <= 600 && budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } 
    if (budgetDay <= 0) {
        return ('Что то пошло не так ! Че не смеетесь ? Не смешно ? Не поняли, да ? Это РОССИЯ !!!');
    }
};

console.log(getStatusIncome());
