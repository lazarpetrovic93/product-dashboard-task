import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  classNames,
  type,
  disabled = false,
}) => {
  return (
    <button
      className={`min-w-[50px] ${classNames} disabled:pointer-events-none disabled:opacity-75`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
