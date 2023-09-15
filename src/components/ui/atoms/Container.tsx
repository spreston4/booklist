import * as React from "react";

interface ContanerProps {
  children: any;
}

const Container = ({ children }: ContanerProps) => {
  return <div className="bg-bg-primary p-2 rounded-sm mx-auto">{children}</div>;
};

export default Container;
