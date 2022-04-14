function CalcButton({ number, addNumber }) {
  return (
    <div
      className={"calculator-button normal"}
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
