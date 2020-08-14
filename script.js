// DOM variables
const buttons = document.querySelectorAll("button");
const display = document.querySelector("p");
const period = document.querySelector("#period");
const operators = ["+", "x<sup>y</sup>", "÷", "-", "×"];
let lastButtonPressed;
let currScreen;
let splitScreen = "default value";
let operand1;
let operand2;
let operator;
let answer;

// Button listener
buttons.forEach(button => {
  button.addEventListener("click", identifyButton);
});

function identifyButton(button) {
  buttonPressed = this.textContent;
  buttonClass = this.getAttribute("class");
  buttonID = this.getAttribute("id");
  launchButtonFunction(buttonPressed);
} 

// Functions that launch correct function based on button pressed
function launchButtonFunction(button) {
  switch (buttonClass) {
    case "number":
      manageNumber(buttonPressed);
      break;
    case "operator":
      manageOperator(buttonPressed);
      break;  
  } 
  switch (buttonID) {
    case "equals":
      manageEquals();
      break;
    case "clear":
      resetValues();
      clearScreen();
      break;
    case "delete":
      manageDelete();
      break;
    case "ans":
      manageAns();
      break;
    case "period":
      managePeriod();
      break;
  }
  readyValues(buttonID);
}

function getOperands() {
  operand1 = Number(splitScreen[splitScreen.length - 3]);
  operand2 = Number(splitScreen[splitScreen.length - 1]);
}

// Functions launched based on button pressed
function manageNumber(number) {
  if (lastButtonPressed === "equals") {
    clearScreen();
    addToScreen(buttonPressed);
  }
  else if (operators.includes(splitScreen[splitScreen.length - 1])) {
    addToScreen(" ");
    addToScreen(buttonPressed); 
  }
  else {
    addToScreen(buttonPressed);
  }
}

function manageOperator() {
  if (currScreen) {
    addToScreen(" ");
    addToScreen(buttonPressed);
    operator = buttonID;
    period.disabled = false;
  }
}

function manageEquals() {
  getOperands();
  if (operand1) {
    operate(operator, operand1, operand2);
  }
  else addToScreen(operand2);
}

function operate(operator, x, y=0) {
  answer = window[operator](x, y);
  display.textContent = answer;
  ans = answer;
  resetValues();
}


function addToScreen(text) {
  display.textContent += text;
}


function resetValues() {
  operator = null;
  operand1 = null;
  operand2 = null;  
}

function clearScreen() {
  display.textContent = "";
}

function manageDelete() {
  // fix to delete the the space before the number
  if (operators.includes(splitScreen[splitScreen.length - 1])) {
    display.textContent = currScreen.slice(0, -2);
  }
  else display.textContent = currScreen.slice(0, -1); 
}

function manageAns() {
  display.textContent += answer;
}

function managePeriod() {
  addToScreen(buttonPressed);
  period.disabled = true;
}

function togglePeriod() {
  if (period.disabled === true) {
    if (buttonClass === "number" || buttonID === "period") return;
    else period.disabled = false;
  }
}

// Readies stored values for next button
function readyValues(buttonID) {
  lastButtonPressed = buttonID;
  currScreen = display.textContent;
  splitScreen = currScreen.split(" ");
  togglePeriod()
}

// Basic operator functions called by operate function
function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function divide(x, y) {
  if (y == "0") {
    return "No dividing by 0. Tsk!"
  }
  else return x / y;
}

function multiply(x, y) {
  return x * y;
}

function power(x, y) {
	return Math.pow(x, y); 
}


/* To do
1. Deal with multi operator/number operations
2. Fix operators constant
3. Fix delete so that it only erases one digit unless an operator
3. Deal with multidigit numbers for operand1 (display issue)
3. Round long decimals
4 Fix period such that can't add another if delete button is used
5. Error handling
6. Keyboard support if I have energy for it
*/
