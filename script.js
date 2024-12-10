"use strict";
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
    const clicked = e.target.closest(".calculator__btn").value;
    if (!clicked) return;

    if (clicked === "SUBMIT") {
      this._showDisplay();
    } else if (clicked === "RESET") {
      this._resetDisplay();
    } else if (clicked === "DELETE") {
      this._deleteValue();
    } else {
      this._checkError();
      this.currentInput += clicked;
      this._checkCorrect();
      result.value = this.currentInput;
    }
  }

  _showDisplay() {
    try {
      // Evaluate the expression safely
      const evaluation = eval(this.currentInput);

      // Handle undefined or invalid results (e.g., divide by zero)
      if (evaluation === undefined || isNaN(evaluation)) {
        result.value = "Error";
        this.currentInput = "";
      } else {
        result.value = evaluation;
        this.currentInput = evaluation.toString();
      }
    } catch (error) {
      result.value = "Error";
      this.currentInput = "";
    }
  }

  _resetDisplay() {
    result.value = "";
    this.currentInput = "";
  }

  _deleteValue() {
    result.value = result.value.slice(0, -1);
    this.currentInput = result.value;
  }

  _checkCorrect() {
    // Regex patterns

    // Prevent input starting with * or /
    if (/^[*/]/.test(this.currentInput)) {
      this.currentInput = this.currentInput.slice(1);
    }

    const invalidPattern = /[+\-*./]{2,}(?!\d)/;
    if (invalidPattern.test(this.currentInput)) {
      this.currentInput = this.currentInput.replace(
        invalidPattern,
        `${this.currentInput.slice(-1)}`
      );
    }

    // Update the display with sanitized input
    result.value = this.currentInput;
  }

  _checkError() {
    if (this.currentInput.startsWith("E")) {
      this.currentInput = "";
    }
  }
}

const app = new Calculator();
