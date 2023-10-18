import * as React from "react";
import { InputProps } from "../../../types";

const Input = ({
  type,
  name,
  className,
  placeholder,
  value,
  onChange,
  required,
  scheme = "primary",
  label,
}: InputProps) => {
  const classes = {
    primary:
      "text-type-dark border-button-active focus:border-button-hover hover:border-button-hover",
    alternate:
      "text-type-dark border-bg-type-dark focus:border-button-alt hover:border-button-alt",
  };
  return (
    <div className="w-full">
      <label htmlFor={name} className="font-montserrat text-type-dark">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`transition-all duration-300 font-roboto text-sm appearance-none bg-transparent p-2 w-full rounded-sm border-2 focus:outline-none ${classes[scheme]} ${className}`}
      />
    </div>
  );
};

export default Input;
