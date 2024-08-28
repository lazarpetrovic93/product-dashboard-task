import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
  onButtonClickFunc,
  text,
  className,
}) => {
  return (
    <button className={className} onClick={onButtonClickFunc}>
      {text}
    </button>
  );
};

export default Button;
