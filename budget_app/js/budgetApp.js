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
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    depositPercent = document.querySelector('deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    allInput = document.querySelectorAll('input'),
    getInputData = document.querySelectorAll('.data input[type="text"]'),
    getInputResult = document.querySelectorAll('.result input[type="text"]'),
    periodAmount = document.getElementsByClassName('period-amount')[0];



    
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const AppData = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};
AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getTargetMonth();
    this.getInfoDeposit();
    this.showResult();
    this.changeRange();
    this.reset(); 
};
AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function() {
        incomePeriodValue.value = _this.calcSavedMoney();
    });
    targetMonthValue.addEventListener('change', function() {
        targetMonthValue.value = +(this.target / incomePeriodValue);
    });
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus1);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        buttonPlus1.style.display = 'none';
    }
};
AppData.prototype.addExpensesBlock = function() { 
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlus2);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonPlus2.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach (function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach (function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for ( let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for ( let key in this.expenses ) {
        sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.target = function() {
    if (!isNumber(targetAmount.value)) {
        alert('Введите число');
    } 
    return  +targetAmount.value;
};
AppData.prototype.getTargetMonth = function () {
    return +targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } 
    if (this.budgetDay > 600 && this.budgetDay < 1200 ) {
        return ('У вас средний уровень дохода');
    } 
    if (this.budgetDay <= 600 && this.budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } 
    if (this.budgetDay <= 0) {
        return ('Что то пошло не так ! Че не смеетесь ? Не смешно ? Не поняли, да ? Это РОССИЯ !!!');
    }
};
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
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
};
AppData.prototype.calcSavedMoney = function() {
    const _this = this;
    return _this.budgetMonth * periodSelect.value;
};
AppData.prototype.changeRange = function() {
    periodSelect.addEventListener('input', function() {
        periodAmount.textContent = periodSelect.value;
    });
};
AppData.prototype.reset = function() {
    const _this = this;
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

        for ( let key in _this.income) {
            delete _this.income[key];
        }

        for ( let key in _this.expenses) {
            delete _this.expenses[key];
        }

        do {
            _this.addExpenses.pop();
        } while (_this.addExpenses.length > 0);

        do {
            _this.addIncome.pop();
        } while (_this.addIncome.length > 0);


        // for ( let item of _this.addIncome) {
        //     _this.addIncome[item].pop();
        // }
        
    _this.budget = 0;
    _this.budgetDay = 0;
    _this.budgetMonth = 0;
    _this.expensesMonth = 0;
    _this.percentDeposit = 0;
    _this.moneyDeposit = 0;
    _this.incomeMonth = 0;
    salaryAmount.value = '';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    cancel.style.display = 'none';
    calculate.style.display = 'block';
    // console.log(_this);
    // return;
    });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const appData = new AppData();
//////////////////////////////////////////////////////////////////////////////////////////////////////////
AppData.prototype.eventListener = function() {
    calculate.addEventListener('click', function() {
        if (!isNumber(salaryAmount.value)) {
            alert('Введите месячный доход');
        } else {
            for (let i = 0 ; i < getInputData.length; i++) {
                getInputData[i].setAttribute('disabled', 'disabled');
            }
            let addIncItems = document.querySelectorAll('.data .income-items input[type="text"]');
            for ( let i = 0; i < addIncItems.length; i++) {
                addIncItems[i].setAttribute('disabled', 'disabled');
            }
            let addExItems = document.querySelectorAll('.data .expenses-items input[type="text"]');
            for ( let i = 0; i < addExItems.length; i++) {
                addExItems[i].setAttribute('disabled', 'disabled');
            }
        calculate.style.display = 'none';
        cancel.style.display = 'block';
        appData.start();
        }
    });
// calculate.addEventListener('click', this.start.bind(this));
buttonPlus1.addEventListener('click', this.addIncomeBlock.bind(this));
buttonPlus2.addEventListener('click', this.addExpensesBlock.bind(this));
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
appData.eventListener();

