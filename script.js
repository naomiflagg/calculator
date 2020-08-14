// DOM variables
const buttons = document.querySelectorAll("button");
const display = document.querySelector("p");
let stringOperator;
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
  buttonID = this.getAttribute("ID");
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
      display.textContent = "";
      break;
    case "delete":
      manageDelete();
      break;
    case "ans":
      //ans function
      break;
    case "period":
      //period function
      break;
  }
}

function getOperands() {
  let splitDisplay = display.textContent.split(stringOperator);
  operand1 = Number(splitDisplay[splitDisplay.length - 2]);
  operand2 = Number(splitDisplay[splitDisplay.length - 1]);
}

// Functions launched based on button pressed
function manageNumber(number) {
  if (!operator && answer) {
    display.textContent = buttonPressed;
    answer = 0;
  }
  else {
    display.textContent += buttonPressed;
  }
}

function manageOperator() {
  console.log(display.textContent);
  if (display.textContent) {
    display.textContent += " " + buttonPressed + " ";
    operator = buttonID;
    console.log(`operator: ${operator}`);
    stringOperator = buttonPressed;
  }
}

function manageEquals() {
  console.log(display.textContent);
  getOperands();
  if (operand1) {
    operate(operator, operand1, operand2);
  }
  else display.textContent = operand2;
}

function operate(operator, x, y=0) {
  answer = window[operator](x, y);
  display.textContent = answer;
  resetValues();
}

function resetValues() {
  operator = null;
  operand1 = null;
  operand2 = null;  
}

function manageDelete() {
  //edit to delete two spaces if deleting operator
  display.textContent = display.textContent.slice(0, -1); 
}

// Basic operator functions
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
2. Deal with special buttons
  2a. fix delete to delete two spaces if deleting operator
3. Deal with multidigit numbers for operand1 (display issue)
3. Round long decimals
4. Add decimal function (if . is inputted) - make sure user doesn't 
add more than 1 by disabling . button if there is already one
5. Error handling
6. Keyboard support if I have energy for it
*/
