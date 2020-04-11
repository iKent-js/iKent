'use strict';
// функция для проверки введенных данных типов СТРОКА, СИМВОЛЫ, ПРОБЕЛЫ И В КУЧЕ . Должны быть введены цифры
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
// переменная money с функцией присваивающая этой переменной значение с типом ЧИСЛО
let money ,
start = function() {
    do {
        money = prompt('Ваш месячный доход ?', '34000');
    }
    while (!isNumber(money));
    money = +money;
};
start();

// создаем объект
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    mission: 250000,
    period: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
        'clubs, girls, other funs');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке ?');
            for (let i = 0; i < 2; i++) {
                let question = prompt('Введите обязятельную статью расходов ?', 'required payments');
                
                let StringToNumber = prompt('Во сколько это обойдется ?', '570');
                while (!isNumber(StringToNumber)) {
                    StringToNumber = prompt('Во сколько это обойдется ?', '10000');
                    console.log(typeof StringToNumber);
                }                
                appData.expenses[question] = +StringToNumber;
            }        
    },
    getExpensesMonth: function() {
        let sum = 0;
        for ( let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        return sum;

// donnot touch function below
        // let expenses = [];
        // let sum = 0;
        // let sumStringToNumber;
        // for (let i = 0; i < 2; i++) {
        //     expenses[i] = prompt('Введите обязятельную статью расходов ?', 'required payments');
        //     sumStringToNumber = prompt('Во сколько это обойдется ?', 'sum');
        //     while (!isNumber(sumStringToNumber)) {
        //         sumStringToNumber = prompt('Во сколько это обойдется ?', 'sum');
        //     }
        //     sum += +sumStringToNumber;
        // }
        // console.log(expenses);
        // return sum;
    },
    getBudget: function (arg1, arg2) {
        return arg1 - arg2;
    },
    getTargetMonth: function (arg1, arg2) {
        return +(arg1 / arg2);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } 
        if (appData.budgetDay > 600 && appData.budgetDay < 1200 ) {
            return ('У вас средний уровень дохода');
        } 
        if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } 
        if (appData.budgetDay <= 0) {
            return ('Что то пошло не так ! Че не смеетесь ? Не смешно ? Не поняли, да ? Это РОССИЯ !!!');
        }
    }
};
// вызываем метод из объекта который инициализирует работу всего кода )))
appData.asking();
console.log(appData);

appData.expensesMonth = appData.getExpensesMonth();

appData.getBudget(money, appData.getExpensesMonth());

appData.budgetMonth = appData.getBudget(money, appData.getExpensesMonth());

appData.period = appData.getTargetMonth(appData.mission, appData.budgetMonth);

appData.budgetDay = appData.budgetMonth / 30;

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Цель будет достигнута за: ' + Math.round(appData.period) + ' месяц(а,ев)');
console.log(appData.getStatusIncome());

for ( let getObj in appData) {
    console.log('Наша программа включает в себя данные : ' + 'ключ ' + getObj + ' значение ' + appData[getObj]);
}
// от себя добавил )))
for ( let subObj in appData.expenses) {
    console.log('Наш внутренний объект включает в себя : ' + 'ключ ' + subObj + 
    ' значение ' + appData.expenses[subObj]);
}