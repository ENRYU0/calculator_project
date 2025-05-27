const add = function(a,b){
    return a+b;
}
const subtract = function(a,b){
    return a-b;
}
const multiply = function(a,b){
    return a*b;
}
const divide = function(a,b){
    return a/b;
}
let number1 = null;
let operator = null;
let number2 = null;
let currentDisplay = "";
let resultDisplayed = false;

const roundResult = (num) => {
    if (Number.isFinite(num)) {
        return Math.round(num * 100000) / 100000; // 5 decimal places
    }
    return num;
};

const operate = function(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
        default:
            return null;
    }
};
const btns = document.querySelectorAll("button");
const display = document.querySelector("input");

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerHTML;

        // If result is displayed and a digit is pressed, start new calculation
        if (resultDisplayed && !isNaN(value)) {
            currentDisplay = "";
            resultDisplayed = false;
        }

        if (!isNaN(value)) {
            // Digit
            currentDisplay += value;
            display.value = currentDisplay;
        } else if (["+", "-", "*", "/"].includes(value)) {
            // Operator
            if (operator && currentDisplay !== "") {
                // If already have operator and second number, evaluate first
                number2 = Number(currentDisplay);
                if (operator === "/" && number2 === 0) {
                    display.value = "Nice try! Can't ÷ by 0";
                    currentDisplay = "";
                    number1 = null;
                    operator = null;
                    number2 = null;
                    resultDisplayed = true;
                    return;
                }
                let result = operate(operator, number1, number2);
                result = roundResult(result);
                display.value = result;
                number1 = result;
                currentDisplay = "";
                operator = value; // Set new operator
                resultDisplayed = true;
            } else if (currentDisplay !== "") {
                // Store first number and operator
                number1 = Number(currentDisplay);
                operator = value;
                currentDisplay = "";
                resultDisplayed = false;
            } else if (number1 !== null) {
                // Change operator if pressed consecutively
                operator = value;
            }
            // If nothing entered, ignore operator
        } else if (value === "=") {
            // Equals
            if (operator && currentDisplay !== "") {
                number2 = Number(currentDisplay);
                if (operator === "/" && number2 === 0) {
                    display.value = "Nice try! Can't ÷ by 0";
                    currentDisplay = "";
                    number1 = null;
                    operator = null;
                    number2 = null;
                    resultDisplayed = true;
                    return;
                }
                let result = operate(operator, number1, number2);
                result = roundResult(result);
                display.value = result;
                currentDisplay = result.toString();
                number1 = null;
                operator = null;
                number2 = null;
                resultDisplayed = true;
            }
            // If not enough data, do nothing
        } else if (value === "C") {
            // Clear
            currentDisplay = "";
            display.value = "";
            number1 = null;
            operator = null;
            number2 = null;
            resultDisplayed = false;
        }
    });
});