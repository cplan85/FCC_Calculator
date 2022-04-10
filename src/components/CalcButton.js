import React, { useEffect, useState } from "react";

function CalcButton({ clip, addNumber }) {
  const [active, setActive] = useState(false);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      addNumber(clip);
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
      className={active ? "activate drum-pad" : "drum-pad normal"}
      onClick={() => addNumber(clip)}
      //size="lg"
      variant="secondary"
      id={clip.id}
    >
      {clip.numberValue}
    </div>
  );
}

export default CalcButton;
