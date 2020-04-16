'use strict';
// функция для проверки введенных данных типов СТРОКА, СИМВОЛЫ, ПРОБЕЛЫ И В КУЧЕ . Должны быть введены цифры
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let calculate = document.getElementById('start'),
    buttonPlus1 = document.getElementsByTagName('button')[0],
    buttonPlus2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    // incomeAmount = document.querySelector('.income-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    // depositAmount = document.querySelector('.deposit-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    depositPercent = document.querySelector('deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

// создаем объект
let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus1);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonPlus1.style.display = 'none';
        }
    },
    addExpensesBlock: function() { 
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlus2.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach (function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach (function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });


        // if (confirm('Есть ли у вас дополнительный источник заработка?')) {
        //     let additionalIncome = prompt('Какой у вас дополнительный источник заработка?', 'пишу код');

        //     let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);
        //         while (!isNumber(cashIncome)) {
        //             cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);
        //         }
        //     appData.income[additionalIncome] = +cashIncome;
        // }

        for ( let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        let sum = 0;
        for ( let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
        if (appData.deposit) {
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
        return appData.budgetMonth * periodSelect.value;
    }
};
periodSelect.addEventListener('input', function() {
    document.querySelector('.period-amount').textContent = periodSelect.value;
});
calculate.addEventListener('click', function() {
    if (!isNumber(salaryAmount.value)) {
        alert('Введите');
    } else {
        appData.start();
    }
});
// calculate.addEventListener('click', appData.start);
buttonPlus1.addEventListener('click', appData.addIncomeBlock);
buttonPlus2.addEventListener('click', appData.addExpensesBlock);

// appData.expensesMonth = appData.getExpensesMonth;
// appData.getBudget(appData.budget, appData.getExpensesMonth());
// appData.budgetMonth = appData.getBudget(appData.budget, appData.getExpensesMonth);
// appData.period = appData.getTargetMonth(appData.mission, appData.budgetMonth);
// appData.budgetDay = appData.budgetMonth / 30;
// console.log('Расходы за месяц: ' + appData.expensesMonth);
// console.log('Цель будет достигнута за: ' + Math.round(appData.period) + ' месяц(а,ев)');
// console.log(appData.getStatusIncome());
// for ( let getObj in appData) {
//     console.log('Наша программа включает в себя данные : ' + 'ключ ' + getObj + ' значение ' + appData[getObj]);
// }
// // от себя добавил )))
// for ( let subObj in appData.expenses) {
//     console.log('Наш внутренний объект включает в себя : ' + 'ключ ' + subObj + 
//     ' значение ' + appData.expenses[subObj]);
// }
appData.getInfoDeposit();
// console.log((String(appData.addExpenses)).charAt(0).toUpperCase() + (String(appData.addExpenses[0])).substring(1));