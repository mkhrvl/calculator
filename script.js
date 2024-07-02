function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
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

const output = document.querySelector('.display__output');
let contentToDisplay = '';

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
    if (equation.leftOperand === '') {
        contentToDisplay += ` ${e.target.value} `;
        displayOutput(contentToDisplay);
    }

    equation.operator = e.target.value;

    if (equation.operator) {
        const contentParts = contentToDisplay.split(' ');
        contentToDisplay = `${contentParts[0]} ${e.target.value} `
        displayOutput(contentToDisplay);
    }
}))

const equal = document.querySelector('.equal')

equal.addEventListener('click', () => {
    if (equation.rightOperand) {
        const result = operate(equation);
        contentToDisplay = result;
        displayOutput(contentToDisplay)

        clearEquation();
        equation.leftOperand = result.toString();
    }
})

const clear = document.querySelector('#btn-clear');

clear.addEventListener('click', () => {
    contentToDisplay = '';
    displayOutput(contentToDisplay);
    clearEquation();
})