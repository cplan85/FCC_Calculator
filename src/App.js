import "./App.css";
import CalcButton from "./components/CalcButton";
import React, { useState } from "react";

const NumbersArray = [
  {
    keyCode: 8,
    numberValue: "AC",
    id: "clear",
  },
  {
    keyCode: 111,
    numberValue: "/",
    id: "divide",
  },
  {
    keyCode: 106,
    numberValue: "*",
    id: "multiply",
  },
  {
    keyCode: 55,
    numberValue: 7,
    id: "seven",
  },
  {
    keyCode: 56,
    numberValue: 8,
    id: "eight",
  },
  {
    keyCode: 57,
    numberValue: 9,
    id: "nine",
  },
  {
    keyCode: 109,
    numberValue: "-",
    id: "subtract",
  },
  {
    keyCode: 52,
    numberValue: 4,
    id: "four",
  },
  {
    keyCode: 53,
    numberValue: 5,
    id: "five",
  },
  {
    keyCode: 54,
    numberValue: 6,
    id: "six",
  },
  {
    keyCode: 107,
    numberValue: "+",
    id: "add",
  },
  {
    keyCode: 49,
    numberValue: 1,
    id: "one",
  },
  {
    keyCode: 50,
    numberValue: 2,
    id: "two",
  },
  {
    keyCode: 51,
    numberValue: 3,
    id: "three",
  },
  {
    keyCode: 13,
    numberValue: "=",
    id: "equals",
  },
  {
    keyCode: 48,
    numberValue: 0,
    id: "zero",
  },
  {
    keyCode: 110,
    numberValue: ".",
    id: "decimal",
  },
];

const isOperator = /^[*/+\-]$/,
  isNumber = /[0-9]/,
  endsWithOperator = /[0-9][*+\‑/]$/,
  endsWithNegativeSign = /[0-9]-$/,
  beginsWithDivideorMultiply = /^[*/]/,
  isFullExpression = /[0-9][*+\-][0-9]/;

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
    if (
      endsWithOperator.test(operationsDisplay) ||
      endsWithNegativeSign.test(operationsDisplay)
    ) {
      let finalAnswer = operationsDisplay.replace(/\D/g, "");
      setCurrentDisplay(finalAnswer);
      setOperationsDisplay(`${finalAnswer}=${finalAnswer}`);
      setAnswer(finalAnswer);
    } else if (beginsWithDivideorMultiply.test(operationsDisplay)) {
      setCurrentDisplay(currentDisplay);
      setOperationsDisplay(operationsDisplay);
    } else {
      let finalAnswer = eval(operationsDisplay).toString();
      setCurrentDisplay(finalAnswer);
      setOperationsDisplay(`${operationsDisplay}=${finalAnswer}`);
      setAnswer(finalAnswer);
      console.log("answer", answer);
    }
  };

  const handleOperators = (num) => {
    const { numberValue } = num;
    if (
      (isOperator.test(currentDisplay) || currentDisplay === "0") &&
      isOperator.test(operationsDisplay)
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
    } else if (count == 2 && !isFullExpression.test(operationsDisplay)) {
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
    } else if (currentDisplay === "0" && isNumber.test(numberValue)) {
      replaceInputs(numberValue);
    } else if (numberValue === "." && currentDisplay.includes(".")) {
      setCurrentDisplay(currentDisplay);
    } else if (isOperator.test(numberValue)) {
      handleOperators(num);
    } else if (numberValue == "=") {
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
              clip={operator}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
