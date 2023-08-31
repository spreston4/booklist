import * as React from "react";

interface ButtonProps {
  children: any;
  className?: string;
  onClick?: () => void;
  scheme?: "primary" | "alternate";
  size?: "none" | "sm" | "md" | "lg";
  type?: "button" | "reset" | "submit" | undefined;
  variant?: "fill" | "outline" | "plain";
}

const Button = ({
  children,
  className = "",
  onClick,
  scheme = "primary",
  size = "md",
  type,
  variant = "fill",
}: ButtonProps) => {
  const classes = {
    primary: {
      fill: "bg-button-active text-type-white hover:bg-button-hover",
      outline:
        "bg-bg-primary border-2 border-button-active text-button-active hover:border-button-hover hover:text-button-hover",
      plain: "bg-transparent text-button-active hover:text-button-hover",
    },
    alternate: {
      fill: "bg-type-dark text-type-white hover:bg-button-alt",
      outline:
        "bg-transparent border-2 border-type-dark text-type-dark hover:border-button-alt hover:text-button-alt",
      plain: "bg-transparent text-type-dark hover:text-button-alt",
    },
  };

  const padding = {
    none: "",
    sm: "py-1 px-3",
    md: "py-3 px-8",
    lg: "py-4 px-9",
  };

  return (
    <button
      className={`transition-all duration-300 text-xs font-medium font-roboto uppercase rounded-sm ${padding[size]} ${classes[scheme][variant]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
