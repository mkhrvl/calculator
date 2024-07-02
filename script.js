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
    return a / b;
}

const equation = {};

function operate(leftOperand, rightOperand, operator) {
    switch (operator) {
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
}))

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => operator.addEventListener('click', (e) => {
    const hasLeftOperand = Object.hasOwn(equation, 'leftOperand');
    if (!hasLeftOperand) {
        equation.leftOperand = Number(contentToDisplay);
        contentToDisplay += ` ${e.target.value} `;
        displayOutput(contentToDisplay);
    }

    equation.operator = e.target.value;

    const hasOperator = Object.hasOwn(equation, 'operator');
    if (hasOperator) {
        const contentParts = contentToDisplay.split(' ');
        contentToDisplay = `${contentParts[0]} ${e.target.value} `
        displayOutput(contentToDisplay);
    }
}))

const equal = document.querySelector('.equal')

equal.addEventListener('click', () => {
    const hasRightOperand = Object.hasOwn(equation, 'rightOperand');
    if (!hasRightOperand) {
        const rightContent = contentToDisplay.split(' ');
        equation.rightOperand = Number(rightContent[rightContent.length - 1]);
    }
})