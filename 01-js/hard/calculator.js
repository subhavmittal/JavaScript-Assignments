/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator { 
  constructor() {
    this.result = 0;
  }
  add(num){
    this.result += num
  }
  subtract(num){
    this.result-=num
  }
  multiply(num){
    this.result*=num
  }
  divide(num){
    if(num === 0){
      throw new Error("Cannot divide by zero")
    }
    this.result/=num
  }
  clear(){
    this.result=0
  }
  getResult(){
    return this.result
  }
  calculate(calcStr){
    // Remove all spaces
    const expr = calcStr.replace(/\s+/g, '');

    // Validate expression - should only contain numbers, operators, parentheses, and decimal points
    if (!/^[0-9+\-*/.()]+$/.test(expr)) {
      throw new Error("Invalid Expression");
    }

    let pos = 0;

    const parseExpression = () => {
      let result = parseTerm();

      while (pos < expr.length && (expr[pos] === '+' || expr[pos] === '-')) {
        const op = expr[pos++];
        const term = parseTerm();
        if (op === '+') {
          result += term;
        } else {
          result -= term;
        }
      }

      return result;
    };

    const parseTerm = () => {
      let result = parseFactor();

      while (pos < expr.length && (expr[pos] === '*' || expr[pos] === '/')) {
        const op = expr[pos++];
        const factor = parseFactor();
        if (op === '*') {
          result *= factor;
        } else {
          if (factor === 0) {
            throw new Error("Division by zero");
          }
          result /= factor;
        }
      }

      return result;
    };

    const parseFactor = () => {
      // Handle negative numbers
      if (expr[pos] === '-') {
        pos++;
        return -parseFactor();
      }

      // Handle parentheses
      if (expr[pos] === '(') {
        pos++;
        const result = parseExpression();
        if (expr[pos] !== ')') {
          throw new Error("Invalid Expression");
        }
        pos++;
        return result;
      }

      // Parse number
      let numStr = '';
      while (pos < expr.length && (expr[pos] >= '0' && expr[pos] <= '9' || expr[pos] === '.')) {
        numStr += expr[pos++];
      }

      if (numStr === '') {
        throw new Error("Invalid Expression");
      }

      return parseFloat(numStr);
    };

    try {
      this.result = parseExpression();

      // Check for unmatched parentheses or extra characters
      if (pos !== expr.length) {
        throw new Error("Invalid Expression");
      }

      if (!isFinite(this.result)) {
        throw new Error("Division by zero");
      }
    } catch (error) {
      throw new Error("Invalid Expression");
    }

    return this.result;
  }

}

calc = new Calculator();
calc.calculate('2+3*4')
console.log(calc.getResult())

module.exports = Calculator;