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
    ></input>
  );
}

export default Input;
