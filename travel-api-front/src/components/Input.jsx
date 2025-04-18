import React from "react";

function Input({ id, type, placeholder, required, className }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      className={className}
    ></input>
  );
}

export default Input;
