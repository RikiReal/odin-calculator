const add = (num1, num2) => {
  return num1 + num2;
};

const sub = (num1, num2) => {
  return num1 - num2;
};

const mul = (num1, num2) => {
  return num1 * num2;
};

const div = (num1, num2) => {
  if (num2 === 0) {
    return "aaaaaahh";
  }
  return num1 / num2;
};

let num1 = 0;
let num2 = NaN;
let operator = "?";

const operate = (num1, operator, num2) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "*":
      return mul(num1, num2);
    case "/":
      return div(num1, num2);
    default:
      break;
  }
};

// Max 13 items in display (1 sign, 12 numbers or 11 numbers + 1 comma)
// Min 1 item (0) in display

// TODO: Numbers that are large extend past the display and adding commas only works for digits that are not 0

let display = document.querySelector("#display");
let displayNumber = "0";
const buttonClickHandler = (e) => {
  const text = e.target.innerText;

  // GET text
  // IF text CLEAR
  // THEN clear display
  // GOTO RESET
  // ELSE IF text DEL AND num1.length > 1
  // THEN delete last character
  // SET num1 / num2

  if (text === "C") {
    displayNumber = "0";
    num1 = 0;
    operator = "?";
    num2 = NaN;
    display.innerText = Number.parseFloat(displayNumber).toString();
    return;
  } else if (text === "DEL") {
    if (displayNumber.length > 1) {
      if (displayNumber.length === 2 && displayNumber.at(0) === "-") {
        return;
      }
      displayNumber = displayNumber.slice(0, -1);
      if (operator === "?") {
        num1 = Number.parseFloat(displayNumber);
      } else {
        num2 = Number.parseFloat(displayNumber);
      }
      display.innerText = Number.parseFloat(displayNumber).toString();
    }
    return;
  } else if (
    text === "." &&
    displayNumber.length < 12 &&
    !displayNumber.includes(".")
  ) {
    displayNumber = displayNumber + ".";
    display.innerText = displayNumber;
    return;
  }

  // IF text type Number AND operator equal "?"
  // THEN append text to num1
  // ELSE IF text type Number AND operator not equal "?"
  // THEN append text to num2

  // IF NOT text type Number
  // THEN save text to operator
  // RETURN

  // IF num1 AND operator AND num2
  // THEN CALL operate(num1, operator, num2)
  // SAVE result in display
  // SAVE result in num1

  // RESET: RESET operator AND num2

  // If text is a digit
  if (!Number.isNaN(Number.parseFloat(text))) {
    if (displayNumber.length < 12) {
      displayNumber = Number.parseFloat(displayNumber + text).toString()
      if (operator === "?") {
        num1 = Number.parseFloat(displayNumber);
      } else {
        num2 = Number.parseFloat(displayNumber);
      }
    }
  } else if (text === "=") {
    if (num1 && operator !== "?" && !Number.isNaN(num2)) {
      displayNumber = operate(num1, operator, num2);
      operator = "?";
      num2 = NaN;
      num1 = displayNumber;
    }
  } else if (text === "+/-" && displayNumber.length < 12) {
    displayNumber = (Number.parseFloat(displayNumber) * -1).toString();
    if (operator === "?") {
      num1 = Number.parseFloat(displayNumber);
    } else {
      num2 = Number.parseFloat(displayNumber);
    }
  } else {
    operator = text;
    if (num1 && operator !== "?" && !Number.isNaN(num2)) {
      displayNumber = operate(num1, operator, num2);
      num2 = NaN;
      num1 = displayNumber;
      display.innerText = displayNumber;
    }
    displayNumber = "0";
    return;
  }
  display.innerText = displayNumber
};
const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  btn.addEventListener("click", buttonClickHandler);
  btn.onmousedown = (e) => (e.target.style.opacity = 0.8);
  btn.onmouseup = (e) => (e.target.style.opacity = 1);
});
