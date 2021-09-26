import logo from "./logo.svg";
import "./App.css";
import Pad from "./components/Pad";
import React, { useState, useEffect } from "react";

const NumbersArray = [
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
    keyCode: 48,
    numberValue: 0,
    id: "zero",
  },
  {
    keyCode: 48,
    numberValue: ".",
    id: "decimal",
  },
];

function App() {
  const [timer, setNewTimer] = useState({
    finalOutput: 0,
    numberOne: null,
    operator: null,
    currentOperation: null,
  });

  return (
    <div className="App">
      <h1>Calculator designed and coded by Carlos Planchart</h1>
      <div className="row">
        {NumbersArray.map((clip) => {
          return (
            <Pad
              key={clip.div}
              clip={clip}
              //volume={volume}
              //setCurrent={setCurrent}
              //setVolume={setVolume}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
