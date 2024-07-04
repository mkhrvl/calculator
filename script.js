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

// List of characters in the equation in terms of their role
// e.g. 22 + 2 = [ leftOperand, leftOperand, operator, rightOperand ]
let equationStructure = [];

function clearEquation() {
    equation.leftOperand = '';
    equation.rightOperand = '';
    equation.operator = '';
    equationStructure = [];
}

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
        equationStructure.push('rightOperand');
    } else {
        equation.leftOperand += e.target.value;
        equationStructure.push('leftOperand');
    }
    updateDisplay();
}))

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => operator.addEventListener('click', (e) => {
    if (equation.leftOperand) {
        equation.operator = e.target.value;
        equationStructure.push('operator');
    }

    if (e.target.value === '−'&& !equation.leftOperand) {
        equation.leftOperand += '-'
        equationStructure.push('leftOperand');
    }

    if (equation.operator) {
        equation.operator = e.target.value;
    }

    updateDisplay();
}))

const btnEqual = document.querySelector('.equal')
btnEqual.addEventListener('click', () => {
    if (equation.rightOperand) {
        const result = operate(equation).toString();
        clearEquation();
        equation.leftOperand = result;
        equationStructure.push('leftOperand');
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
        equationStructure.push('leftOperand');
    }

    if (
        !equation.rightOperand.includes('.') &&
        equation.operator &&
        equation.leftOperand
    ) {
        equation.rightOperand += '.';
        equationStructure.push('rightOperand');
    }

    updateDisplay();
}

const btnDecimal = document.querySelector('.decimal');
btnDecimal.addEventListener('click', handleDecimalEvent)

function deleteLastCharacterFromEquation() {
    const lastCharPointer = equationStructure[equationStructure.length - 1];
    equationStructure.pop();

    switch(lastCharPointer) {
        case 'leftOperand':
            equation.leftOperand = equation.leftOperand.substring(0, equation.leftOperand.length - 1);
            break;
        case 'rightOperand':
            equation.rightOperand = equation.rightOperand.substring(0, equation.rightOperand.length - 1);
            break;
        case 'operator':
            equation.operator = '';
            break;
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
    console.log(equationStructure)
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

