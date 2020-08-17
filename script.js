// DOM variables
const buttons = document.querySelectorAll("button");
const display = document.querySelector("p");
const period = document.querySelector("#period");
const operators = ["+", "xy", "÷", "-", "×"];
let lastButtonPressedID;
let lastButtonPressedClass;
let currScreen = "default value";
let splitScreen = "default value";
let lastStrOnScrn;
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
  switch (buttonID) {
    case "equals":
      manageEquals();
      break;
    case "clear":
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
  if (currScreen.length < 22) {
    switch (buttonClass) {
      case "number":
        manageNumber(buttonPressed);
        break;
      case "operator":
        manageOperator(buttonPressed);
        break;  
    } 
  }
  readyValues(buttonID, buttonClass);
}

function getOperands() {
  operand1 = Number(splitScreen[0]);
  operand2 = Number(splitScreen[2]);
  operator = splitScreen[1];
  buttons.forEach(button => {
    if (button.textContent == operator) {
      operator = button.getAttribute("id");
    }
  })
}

// Functions launched based on button pressed
function manageNumber(number) {
  if (lastButtonPressedID === "equals") {
    clearScreen();
    addToScreen(number);
  }
  else if (lastButtonPressedID === "subtract" && operators.includes(splitScreen[lastStrOnScrn - 1])) {
    addToScreen(number);
  }
  else if (lastButtonPressedClass === "operator") {
    addToScreen(" ");
    addToScreen(number); 
  }
  else {
    addToScreen(number);
  }
}

function manageOperator(buttonPressed) {
  if (buttonPressed === "-" && lastButtonPressedClass === "operator" 
    && !operators.includes(splitScreen[lastStrOnScrn - 1]) 
    || lastButtonPressedClass !== "operator") {
    addToScreen(" ");
    addToScreen(buttonPressed);
    period.disabled = false;
  }
}

function manageEquals() {
  if (splitScreen.length < 3) {
    clearScreen();
    answer = splitScreen[0];
    addToScreen(answer);
  }
  else {
    while (splitScreen.length >= 3) {
      getOperands();
      operate(operator, operand1, operand2);
      splitScreen.splice(0, 3, answer);
    }
    if (answer.length > 22) display.textContent = answer.toExponential();
    else display.textContent = answer;
  }
}

function operate(operator, x, y=0) {
  answer = window[operator](x, y);
  answer = parseFloat(answer.toFixed(10)); // Round long decimals
}


function addToScreen(text) {
  display.textContent += text;
}

function clearScreen() {
  display.textContent = "";
}

function manageDelete() {
  if (currScreen.lastIndexOf(" ") === (currScreen.length - 2)) {
    display.textContent = currScreen.slice(0, -2);
  }
  else display.textContent = currScreen.slice(0, -1); 
}

function manageAns() {
  manageNumber(answer);
}

function managePeriod() {
  addToScreen(buttonPressed);
  period.disabled = true;
}

function togglePeriod() {
  if (period.disabled === true) {
    if (splitScreen[lastStrOnScrn].includes(".")) return;
    else period.disabled = false;
  }
}

// Readies stored values for next button
function readyValues(buttonID, buttonClass) {
  lastButtonPressedID = buttonID;
  lastButtonPressedClass = buttonClass;
  currScreen = display.textContent;
  splitScreen = currScreen.split(" ");
  lastStrOnScrn = splitScreen.length - 1;
  togglePeriod();
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