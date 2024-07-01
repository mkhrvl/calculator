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

let leftOperand = 0;
let operator = '';
let rightOperand = 0;

function operate(leftOperand, rightOperand, operator) {
    switch (operator) {
        case '+':
            return add(leftOperand, rightOperand);
        case '-':
            return subtract(leftOperand, rightOperand);
        case '*':
            return multiply(leftOperand, rightOperand);
        case '/':
            return divide(leftOperand, rightOperand);
    }
}