import "./App.css";
import CalcButton from "./components/CalcButton";
import React, { useState } from "react";
import NumbersArray from "./components/CalcButtonsArray";
import { evaluate } from "mathjs";

//const isOperator = /^[*/+\-]$/,
const isNumber = /[0-9]/,
  endsWithOperator = /[0-9][*+\‑/]$/,
  endsWithNegativeSign = /[0-9]-$/,
  beginsWithDivideorMultiply = /^[*/]/,
  isFullExpression = /[0-9][*+\-][0-9]/;
//new operation Regex

const opRegex = /[+|\-|/|*]/g;

function App() {
  const [currentDisplay, setCurrentDisplay] = useState("0");
  const [operationsDisplay, setOperationsDisplay] = useState("");
  const [answer, setAnswer] = useState(null);
  const [count, setCount] = useState(0);

  const clearCalculator = () => {
    setCurrentDisplay("0");
    setOperationsDisplay("");
    setAnswer(null);
    setCount(0);
  };

  const calculate = (num) => {
    //if ends with operator or ends with negative sign then set value equal to value without - or operator at the end
    if (
      endsWithOperator.test(operationsDisplay) ||
      endsWithNegativeSign.test(operationsDisplay)
    ) {
      let finalAnswer = operationsDisplay.replace(/\D/g, "");
      setCurrentDisplay(finalAnswer);
      setOperationsDisplay(`${finalAnswer}=${finalAnswer}`);
      setAnswer(finalAnswer);
      //if begins with Divide or multiply then keep display the same.
    } else if (beginsWithDivideorMultiply.test(operationsDisplay)) {
      setCurrentDisplay(currentDisplay);
      setOperationsDisplay(operationsDisplay);
    } else {
      let finalAnswer = evaluate(operationsDisplay).toString();
      //NEW ADDITION TO CALCULATOR
      console.log("type of operation display", operationsDisplay);
      let numbersOnly = operationsDisplay.split(opRegex).map(Number);

      let operatorOnly = operationsDisplay.match(opRegex);
      console.log(operatorOnly);
      console.log(numbersOnly);
      let stringResult = 0;
      switch (operatorOnly[0]) {
        case "+":
          // console.log("add calculated")
          stringResult = numbersOnly[0] + numbersOnly[1];
          break;
        case "-":
          // console.log("subtract calculated")
          stringResult = numbersOnly[0] - numbersOnly[1];
          break;
        case "*":
          // console.log("multiply calculated")
          stringResult = numbersOnly[0] * numbersOnly[1];
          break;
        case "/":
          // console.log("divide calculated")
          stringResult = numbersOnly[0] / numbersOnly[1];
          break;
        default:
          console.log("Calculate switch statement missed something");
      }
      console.log("String Result", stringResult);
      //let finalAnswer = stringResult.toString();
      setCurrentDisplay(finalAnswer);
      setOperationsDisplay(`${operationsDisplay}=${finalAnswer}`);
      setAnswer(finalAnswer);
      console.log("answer", answer);
    }
  };

  const handleOperators = (num) => {
    const { numberValue } = num;
    if (
      (opRegex.test(currentDisplay) || currentDisplay === "0") &&
      opRegex.test(operationsDisplay)
    ) {
      replaceInputs(numberValue);
      setCount(1);
    } else if (
      endsWithOperator.test(operationsDisplay) &&
      numberValue !== "-"
    ) {
      let updatedValue = operationsDisplay.replace(/[*+\‑/]/, numberValue);
      setOperationsDisplay(updatedValue);
      setCurrentDisplay(numberValue);
    } else if (answer !== null) {
      setOperationsDisplay(answer.concat(num.numberValue));
      setCurrentDisplay(num.numberValue);
      setCount(count + 1);
    } else if (count === 2 && !isFullExpression.test(operationsDisplay)) {
      let justNumber = operationsDisplay.replace(/\D/g, "");
      setOperationsDisplay(justNumber.concat(num.numberValue));
    } else {
      setCurrentDisplay(numberValue);
      setOperationsDisplay(operationsDisplay.concat(num.numberValue));
      setCount(count + 1);
    }
  };

  const replaceInputs = (numberValue) => {
    setCurrentDisplay(numberValue.toString());
    setOperationsDisplay(numberValue.toString());
  };
  const addNumber = (num) => {
    const { numberValue } = num;

    if (num.numberValue === "AC") {
      clearCalculator();
      //if current Display is 0 then replace that display with the number
    } else if (currentDisplay === "0" && isNumber.test(numberValue)) {
      replaceInputs(numberValue);
      //if you press . and the current display already has . then keep same display
    } else if (numberValue === "." && currentDisplay.includes(".")) {
      setCurrentDisplay(currentDisplay);
      //
    } else if (opRegex.test(numberValue)) {
      handleOperators(num);
      // you press = and the calculate function gets executed
    } else if (numberValue === "=") {
      calculate(num);
    } else if (operationsDisplay.includes("=")) {
      setCurrentDisplay(currentDisplay.concat(num.numberValue));
      setOperationsDisplay(answer.concat(num.numberValue));
    } else {
      setCurrentDisplay(currentDisplay.concat(num.numberValue));
      setOperationsDisplay(operationsDisplay.concat(num.numberValue));
    }
  };

  return (
    <div className="App">
      <h1>Calculator designed and coded by Carlos Planchart</h1>
      <div id="displayContainer">
        <div id="operationsDisplay">{operationsDisplay}</div>
        <div id="display">{currentDisplay}</div>
      </div>
      <div className="row">
        {NumbersArray.map((operator) => {
          return (
            <CalcButton
              key={operator.div}
              addNumber={addNumber}
              number={operator}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
