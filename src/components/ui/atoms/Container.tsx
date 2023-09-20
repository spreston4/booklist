import * as React from "react";

interface ContanerProps {
  children: any;
  className?: string;
}

const Container = ({ children, className }: ContanerProps) => {
  return (
    <div className={`bg-bg-primary p-2 rounded-sm mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
