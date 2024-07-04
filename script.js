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
        equationStructure.push('rightOperand');
    } else {
        equation.leftOperand += e.target.value;
        equationStructure.push('leftOperand');
    }
}))

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => operator.addEventListener('click', (e) => {
    if (equation.leftOperand) {
        contentToDisplay += ` ${e.target.value} `;
        equation.operator = e.target.value;
        equationStructure.push('operator');
    }

    if (e.target.value === '−'&& !equation.leftOperand) {
        contentToDisplay += '-';
        equation.leftOperand += '-'
        equationStructure.push('leftOperand');
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
        const result = operate(equation).toString();
        contentToDisplay = result;
        displayOutput(contentToDisplay)

        clearEquation();
        equation.leftOperand = result;
        equationStructure.push('leftOperand');
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
        equationStructure.push('leftOperand');
        contentToDisplay += e.target.value;
        displayOutput(contentToDisplay);
    }

    if (
        !equation.rightOperand.includes('.') &&
        equation.operator &&
        equation.leftOperand
    ) {
        equation.rightOperand += e.target.value;
        equationStructure.push('rightOperand');
        contentToDisplay += e.target.value;
        displayOutput(contentToDisplay);
    }
})

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

const btnDelete = document.querySelector('#btn-delete');
btnDelete.addEventListener('click', () => {
    if (equationStructure[equationStructure.length - 1] === 'operator') {
        contentToDisplay = contentToDisplay.substring(0, contentToDisplay.length - 3)
    } else {
        contentToDisplay = contentToDisplay.substring(0, contentToDisplay.length - 1);
    }
    displayOutput(contentToDisplay);
    deleteLastCharacterFromEquation();
})

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', () => {
    if (equation.leftOperand === ZERO_DIVISION_ERROR_MSG) {
        contentToDisplay = '';
        clearEquation();
    }
    console.table(equation)
    console.log(equationStructure)
    console.log(contentToDisplay)
}));

