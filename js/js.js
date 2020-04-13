'use strict';
// функция для проверки введенных данных типов СТРОКА, СИМВОЛЫ, ПРОБЕЛЫ И В КУЧЕ . Должны быть введены цифры
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
// переменная money с функцией присваивающая этой переменной значение с типом ЧИСЛО
let calculate = document.getElementById('start'),
    buttonPlus1 = document.getElementsByTagName('button')[0],
    buttonPlus2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePerionValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');


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
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    mission: 250000,
    period: 0,
    asking: function() {

        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let additionalIncome = prompt('Какой у вас дополнительный источник заработка?', 'пишу код');

            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);
                while (!isNumber(cashIncome)) {
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);
                }
            appData.income[additionalIncome] = +cashIncome;
        }

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
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
        appData.percentDeposit = +appData.percentDeposit;

            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        appData.moneyDeposit = +appData.moneyDeposit;
        
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
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
appData.getInfoDeposit();

console.log((String(appData.addExpenses)).charAt(0).toUpperCase() + (String(appData.addExpenses[0])).substring(1));