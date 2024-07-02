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

function clearEquation() {
    equation.leftOperand = '';
    equation.rightOperand = '';
    equation.operator = '';
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

let contentToDisplay = '';

const output = document.querySelector('.display__output');
function displayOutput(content) {
    output.textContent = content;
}

const operands = document.querySelectorAll('.operand');
operands.forEach((operand) => operand.addEventListener('click', (e) => {
    contentToDisplay += e.target.value;
    displayOutput(contentToDisplay);

    if (equation.leftOperand && equation.operator) {
        equation.rightOperand += e.target.value;
    } else {
        equation.leftOperand += e.target.value;
    }
}))

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => operator.addEventListener('click', (e) => {
    if (equation.leftOperand) {
        contentToDisplay += ` ${e.target.value} `;
        equation.operator = e.target.value;
    }

    if (e.target.value === '−'&& !equation.leftOperand) {
        contentToDisplay += '-';
        equation.leftOperand += '-'
    }

    if (equation.operator) {
        const contentParts = contentToDisplay.split(' ');
        contentToDisplay = `${contentParts[0]} ${e.target.value} `
        equation.operator = e.target.value;
    }

    displayOutput(contentToDisplay);
}))

const btnEqual = document.querySelector('.equal')
btnEqual.addEventListener('click', () => {
    if (equation.rightOperand) {
        const result = operate(equation);
        contentToDisplay = result;
        displayOutput(contentToDisplay)

        clearEquation();
        equation.leftOperand = result.toString();
    }
})

const btnClear = document.querySelector('#btn-clear');
btnClear.addEventListener('click', () => {
    contentToDisplay = '';
    displayOutput(contentToDisplay);
    clearEquation();
})

const btnDecimal = document.querySelector('.decimal');
btnDecimal.addEventListener('click', (e) => {
    if (
        !equation.leftOperand.includes('.') &&
        !equation.operator &&
        !equation.rightOperand
    ) {
        equation.leftOperand += e.target.value;
        contentToDisplay += e.target.value;
        displayOutput(contentToDisplay);
    }

    if (
        !equation.rightOperand.includes('.') &&
        equation.operator &&
        equation.leftOperand
    ) {
        equation.rightOperand += e.target.value;
        contentToDisplay += e.target.value;
        displayOutput(contentToDisplay);
    }
})

const btnDelete = document.querySelector('#btn-delete');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', () => {
    if (equation.leftOperand === ZERO_DIVISION_ERROR_MSG) {
        contentToDisplay = '';
        clearEquation();
    }
    console.table(equation)
}));

