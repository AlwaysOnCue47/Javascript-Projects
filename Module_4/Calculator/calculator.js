// Calculator script file 

//this object keeps track of values
const Calculator = {
  displayValue: '0',
  firstOperand: null,
  waitSecondOperand: false,
  operator: null,
};

//modify values when button is clicked
function inputDigit(digit) {
  const {displayValue, waitSecondOperand} = Calculator;
  if (waitSecondOperand === true) {
    Calculator.displayValue = digit;
    Calculator.waitSecondOperand = false;
  }
  else {
    Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

// this handles the decimal point

function inputDecimal(dot) {
  if (Calculator.waitSecondOperand === true) return;
  if (!Calculator.displayValue.includes(dot)) {
      Calculator.displayValue += dot;
  }
}

// this handles operators

function handleOperator(nextOperator) {
  const {firstOperand, displayValue, operator} = Calculator;
  const valueOfInput = parseFloat(displayValue);

  if (operator && Calculator.waitSecondOperand) {
    Calculator.operator = nextOperator;
    return;
  }
  if (firstOperand == null) {
    Calculator.firstOperand = valueOfInput;
  }
  else if (operator) {
    const valueNow = firstOperand || 0;
    let result = performCalculation[operator](valueNow, valueOfInput);
    result = Number(result).toFixed(9);
    result = (result * 1).toString();
    Calculator.displayValue = result;
    Calculator.firstOperand = result;
  }
  Calculator.waitSecondOperand = true;
  Calculator.operator = nextOperator;
}

// handles calculation - an array in which each key represents a corresponding function

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand,
};

// resets calculator when AC is clicked

function calculatorReset() {
  Calculator.displayValue = '0';
  Calculator.firstOperand = null;
  Calculator.waitSecondOperand = false;
  Calculator.operator = null;
}

// this function updates the screen using displayValue

function updateDisplay() {
  const display = document.querySelector('.calculatorScreen');
  display.value = Calculator.displayValue;
}

updateDisplay();

// this monitors button clicks 

const keys = document.querySelector('.calculatorKeys');
keys.addEventListener('click', (event) => {
  const {target} = event;
  if (!target.matches('button')){ 
    return;
  }
  if (target.classList.contains('operator')){
    handleOperator(target.value);
    updateDisplay()
    return;
  }
  if (target.classList.contains('decimal')){
    inputDecimal(target.value);
    updateDisplay()
    return;
  }
  if (target.classList.contains('all-clear')){
    calculatorReset();
    updateDisplay()
    return;
  }
  inputDigit(target.value);
  updateDisplay();
})