'use strict';
// функция для проверки введенных данных типов СТРОКА, СИМВОЛЫ, ПРОБЕЛЫ И В КУЧЕ . Должны быть введены цифры
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//создаем переменные 
let calculate = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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

let allInput = document.querySelectorAll('input'),
    getInputData = document.querySelectorAll('.data input[type="text"]'),
    getInputResult = document.querySelectorAll('.result input[type="text"]'),
    periodAmount = document.getElementsByClassName('period-amount')[0];


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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getTargetMonth();
        this.getInfoDeposit(); // Добавил вызов метода который высчитывает кол-во месяцев для достиж.цели 
        this.showResult();
        this.changeRange(); // создал внутри объекта метод (результат перемещения ползунка в реалтайме)
        this.reset();   // создал внутри объекта метод (сброс калькулятора в дефолт)
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
        targetMonthValue.addEventListener('change', function() {
            targetMonthValue.value = +(appData.target / incomePeriodValue);
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
        for ( let key in this.expenses ) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },
    target: function() {
        if (!isNumber(targetAmount.value)) {
            alert('Введите число');
        } 
        return  +targetAmount.value;
    },
    getTargetMonth: function () {
        return +targetAmount.value / this.budgetMonth;
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
        if (this.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(this.percentDeposit)) {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
        this.percentDeposit = +this.percentDeposit;

            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
        this.moneyDeposit = +this.moneyDeposit;
        
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    changeRange: function() {
        periodSelect.addEventListener('input', function() {
            periodAmount.textContent = periodSelect.value;
        });
    },
    reset: function() {
        cancel.addEventListener('click', function() {
            for (let i = 0 ; i < getInputResult.length; i++) {
                getInputResult[i].value = '';
            }

            for (let i = 0 ; i < getInputData.length; i++) {
                getInputData[i].removeAttribute('disabled');
                getInputData[i].value = '';
            }

            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].remove();
            }
            buttonPlus1.style.display = 'block';

            for ( let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].remove();
            }
            buttonPlus2.style.display = 'block';

            // incomeItems.forEach (function(item) {
            //     delete appData.income[item];
            // });

            // incomeItems.forEach (function(item) {
            //     delete appData.income[item];
            // });

            appData.addIncome.pop();
            appData.addIncome.pop();

            for ( let key in appData.income) {
                delete appData.income[key];
            }

            for ( let key in appData.expenses) {
                delete appData.expenses[key];
            }

            appData.addExpenses.pop();
            appData.addExpenses.pop();
            
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.expensesMonth = 0;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.incomeMonth = 0;
        salaryAmount.value = '';
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
        cancel.style.display = 'none';
        calculate.style.display = 'block';
        return;
        });
    }
};
//начинаем работу объекта
let start = calculate.addEventListener('click', function() {
    if (!isNumber(salaryAmount.value)) {
        alert('Введите месячный доход');
    } else {
        for (let i = 0 ; i < getInputData.length; i++) {
            getInputData[i].setAttribute('disabled', 'disabled');
        }
        let addIncItems = document.querySelectorAll('.data .income-items input[type="text"]');
        for ( let i = 0; i < addIncItems.length; i++) {
            addIncItems[i].setAttribute('disabled', 'disabled');
            // console.log(addIncItems);
        }
        let addExItems = document.querySelectorAll('.data .expenses-items input[type="text"]');
        for ( let i = 0; i < addExItems.length; i++) {
            addExItems[i].setAttribute('disabled', 'disabled');
            // console.log(addExItems);
        }
    calculate.style.display = 'none';
    cancel.style.display = 'block';
    appData.start();
    }
});
// кнопки для добавления дополнительный полей в калькуляторе
buttonPlus1.addEventListener('click', appData.addIncomeBlock);
buttonPlus2.addEventListener('click', appData.addExpensesBlock);
console.log(appData);