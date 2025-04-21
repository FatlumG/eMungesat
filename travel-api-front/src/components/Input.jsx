import React from "react";

function Input({
  id,
  type,
  placeholder,
  required,
  className,
  onChange,
  value,
  name,
  min,
  max,
  step,
}) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      step={step}
    ></input>
  );
}

export default Input;
