import React, { useEffect, useState } from "react";

function CalcButton({ number, addNumber }) {
  const [active, setActive] = useState(false);

  const handleKeyPress = (e) => {
    if (e.keyCode === number.keyCode) {
      addNumber(number);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={
        active ? "activate calculator-button" : "calculator-button normal"
      }
      onClick={() => addNumber(number)}
      //size="lg"
      variant="secondary"
      id={number.id}
    >
      {number.numberValue}
    </div>
  );
}

export default CalcButton;
