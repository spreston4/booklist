import * as React from "react";

interface ButtonProps {
  children: any;
  onClick?: () => void;
  scheme?: "primary" | "alternate";
  type?: "button" | "reset" | "submit" | undefined;
  variant: "fill" | "outline";
}

const Button = ({
  children,
  onClick,
  scheme = "primary",
  type,
  variant = "fill",
}: ButtonProps) => {
  const classes = {
    primary: {
      fill: "bg-button-active text-type-white hover:bg-button-hover",
      outline:
        "bg-transparent border-2 border-button-active text-button-active hover:border-button-hover hover:text-button-hover",
    },
    alternate: {
      fill: "bg-type-dark text-type-white hover:bg-button-alt",
      outline:
        "bg-transparent border-2 border-type-dark text-type-dark hover:border-button-alt hover:text-button-alt",
    },
  };
  return (
    <button
      className={`py-3 px-8 text-xs font-medium font-roboto uppercase rounded-sm ${classes[scheme][variant]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
