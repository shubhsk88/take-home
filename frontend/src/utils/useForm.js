import { useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = parseInt(value);
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function clearForm() {
    const clearedInputs = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(clearedInputs);
  }
  return { inputs, handleChange, clearForm };
}
