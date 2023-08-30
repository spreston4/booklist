import * as React from "react";

const NavBar = () => {
  return (
    <div className="flex flex-row flex-nowrap justify-between items-center p-4">
      <div>Logo</div>
      <div className="flex flex-row flex-nowrap justify-end items-center gap-x-2">
        <a href="/" className="font-roboto font-bold">Home</a>
        <a href="/dashboard" className="font-montserrat">Dashboard</a>
      </div>
    </div>
  );
};

export default NavBar;
