import * as React from "react";
import { LinkProps } from "../../../types";

const Link = ({ children, className, href, scheme = "primary" }: LinkProps) => {
  const classes = {
    primary: "text-button-active hover:text-button-hover",
    alternate: "text-type-dark hover:text-button-alt",
  };
  return (
    <a
      href={href}
      className={`transition-all duration-300 text-xs font-medium font-roboto ${classes[scheme]} ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
