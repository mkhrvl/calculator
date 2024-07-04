function add(a, b) {
    return Math.round((a + b) * 10e7) / 10e7;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

const ZERO_DIVISION_ERROR_MSG = 'Boom!'
function divide(a, b) {
    if (b === 0) {
        return ZERO_DIVISION_ERROR_MSG;
    }
    // Round number up to 7 decimal places
    return Math.round((a / b) * 10e7) / 10e7;
}

const equation = {
    leftOperand: '',
    rightOperand: '',
    operator: '',
};

function operate(equation) {
    const leftOperand = Number(equation.leftOperand);
    const rightOperand = Number(equation.rightOperand)

    switch (equation.operator) {
        case '+':
            return add(leftOperand, rightOperand);
        case '−':
            return subtract(leftOperand, rightOperand);
        case '×':
            return multiply(leftOperand, rightOperand);
        case '÷':
            return divide(leftOperand, rightOperand);
    }
}

const output = document.querySelector('.display__output');
function updateDisplay() {
    const leftOperand = equation.leftOperand;
    const operator = equation.operator;
    const rightOperand = equation.rightOperand;
    output.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}

const operands = document.querySelectorAll('.operand');
operands.forEach((operand) => operand.addEventListener('click', (e) => {
    if (equation.leftOperand && equation.operator) {
        equation.rightOperand += e.target.value;
    } else {
        equation.leftOperand += e.target.value;
    }

    // Converts string to number then back to string to remove leading zeros
    if (
        !equation.leftOperand.includes('.') &&
        !equation.rightOperand
    ) {
        equation.leftOperand = Number(equation.leftOperand).toString();
    } else if (
        !equation.rightOperand.includes('.') &&
        equation.operator
        && equation.leftOperand
    ) {
        equation.rightOperand = Number(equation.rightOperand).toString();
    }

    updateDisplay();
}))

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => operator.addEventListener('click', (e) => {
    if (equation.leftOperand) {
        equation.operator = e.target.value;
    }

    if (e.target.value === '−'&& !equation.leftOperand) {
        equation.leftOperand += '-'
    }

    if (equation.operator) {
        equation.operator = e.target.value;
    }

    updateDisplay();
}))

function clearEquation() {
    equation.leftOperand = '';
    equation.rightOperand = '';
    equation.operator = '';
}

const btnEqual = document.querySelector('.equal')
btnEqual.addEventListener('click', () => {
    if (equation.rightOperand) {
        const result = operate(equation).toString();
        clearEquation();
        equation.leftOperand = result;
        updateDisplay();
    }
})

function handleClearEvent() {
    clearEquation();
    updateDisplay();
}

const btnClear = document.querySelector('#btn-clear');
btnClear.addEventListener('click', handleClearEvent)

function handleDecimalEvent() {
    if (
        !equation.leftOperand.includes('.') &&
        !equation.operator &&
        !equation.rightOperand
    ) {
        equation.leftOperand += '.';
    }

    if (
        !equation.rightOperand.includes('.') &&
        equation.operator &&
        equation.leftOperand
    ) {
        equation.rightOperand += '.';
    }

    updateDisplay();
}

const btnDecimal = document.querySelector('.decimal');
btnDecimal.addEventListener('click', handleDecimalEvent)

function deleteLastCharacterFromEquation() {
    const leftOperand = equation.leftOperand;
    const operator = equation.operator;
    const rightOperand = equation.rightOperand;

    if (leftOperand && operator && rightOperand) {
        equation.rightOperand = rightOperand.substring(0, rightOperand.length - 1)
    } else if (leftOperand && operator && !rightOperand) {
        equation.operator = '';
    } else if (leftOperand && !operator && !rightOperand){
        equation.leftOperand = leftOperand.substring(0, leftOperand.length - 1);
    }
}

function handleDeleteEvent() {
    deleteLastCharacterFromEquation();
    updateDisplay();
}

const btnDelete = document.querySelector('#btn-delete');
btnDelete.addEventListener('click', handleDeleteEvent);

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', () => {
    if (equation.leftOperand === ZERO_DIVISION_ERROR_MSG) {
        clearEquation();
    }
    console.table(equation)
}));

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key === '.') {
        handleDecimalEvent();
    } else if (key === 'c' || key === 'Escape') {
        handleClearEvent();
    } else if (key === 'Backspace') {
        handleDeleteEvent();
    }

    console.log(key);
})

