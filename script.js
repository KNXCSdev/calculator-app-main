const themeRange = document.getElementById("calculator__theme-range");
const calculatorButtons = document.querySelector(".calculator__buttons");
const result = document.querySelector("#result");

class Calculator {
  currentInput = "";

  constructor() {
    themeRange.addEventListener("input", this._themeSwitcher);
    calculatorButtons.addEventListener("click", (e) => this._calculateValue(e));
  }

  _themeSwitcher(e) {
    const rootElement = document.body;
    const selectedTheme = e.target.value;
    rootElement.classList.remove("theme1", "theme2", "theme3");
    rootElement.classList.add(`theme${selectedTheme}`);
  }

  _calculateValue(e) {
    const clicked = e.target.closest(".calculator__btn")?.value;
    if (!clicked) return;
    if (clicked === "DEL") {
      this.currentInput = this.currentInput.slice(0, -1);
    } else if (clicked === "RESET") {
      this.currentInput = "";
    } else if (clicked === "=") {
      this._evaluateExpression();
    } else if (this._isOperator(clicked)) {
      this._handleOperator(clicked);
    } else {
      this.currentInput += clicked;
    }

    console.log(this.currentInput);
    result.value = this.currentInput;
  }

  // Check if the clicked value is an operator
  _isOperator(value) {
    return ["+", "-", "x", "/", "."].includes(value);
  }

  // operator logic to prevent consecutive operators
  _handleOperator(operator) {
    const lastChar = this.currentInput.slice(-1);
    if (this._isOperator(lastChar)) return; // Prevent consecutive operators
    this.currentInput += operator;
  }

  _evaluateExpression() {
    try {
      // Replace "x" with "*" and evaluate the expression
      this.currentInput = eval(this.currentInput.replace(/x/g, "*")).toString();
    } catch (error) {
      return;
    }
  }
}

const app = new Calculator();
