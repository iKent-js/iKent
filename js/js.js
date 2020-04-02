'use strict';

let money = prompt('Ваш месячный доход ?', 'Введите число !');
    money = (Number(money));
console.log(money); 

let addExpenses1 = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Введите число !');
console.log(addExpenses1);

// let income = '"работа с сайтом"',
//     addExpenses = 'такси, кафе, мобильный, прочее';

let deposit = confirm('Есть ли у вас депозит в банке ?');
    // deposit = (!!(deposit));
console.log(deposit);

let expenses1 = prompt('Введите обязятельную статью расходов ?');
console.log(expenses1);

let expenses2 = prompt('Введите обязательную статью расходов ?');
console.log(expenses2);   

let amount1 = prompt('Во сколько это обойдется ?');
    amount1 = (Number(amount1));
console.log(amount1);

let amount2 = prompt('Во сколько это обойдется ?');
    amount2 = (Number(amount2));
console.log(amount2);

let mission = 250000;

let budgetMonth = money - (amount1 + amount2);
    console.log(budgetMonth);

    mission /= budgetMonth;
console.log(Math.ceil(mission));

let budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));

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
   

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} if (budgetMonth > 600 && budgetDay < 1200 ) {
    console.log('У вас средний уровень дохода');
} if (budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} if (budgetDay < 0) {
    console.log('Что то пошло не так ! Че не смеетесь ? Не смешно ? Не поняли, да ? Это РОССИЯ !!!');
} else if (budgetDay === 1200) {
    console.log('Очень даже ничего !');
} else if (budgetDay === 600) {
    console.log('Дно среднего заработка... Могло быть и хуже !');
} else if (budgetDay === 0) {
    console.log('Сочувствую... ');
}  else {
    console.log('НАУЧИ ЗАРАБАТЫВАТЬ !');
}
