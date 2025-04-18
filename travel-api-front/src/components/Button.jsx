import React from "react";
import "../styles/App.css";

function Button({ label, onClick, className, type }) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {label}
    </button>
  );
}

export default Button;
