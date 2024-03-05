import { useState } from "react";

export function useInput(defaultValue, validation) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validation(enteredValue);

  function handleChange(e) {
    setEnteredValue(e.target.value);
    setDidEdit(false);
  }

  function handleInputBlur(e) {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange: handleChange,
    handleInputBlur: handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
