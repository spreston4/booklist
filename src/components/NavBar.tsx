import * as React from "react";
import axios from "axios";
import Button from "./ui/atoms/Button";
import Link from "./ui/atoms/Link";
import { SessionProps } from "../App";
import { NewAuthObject } from "./Home";

interface NavBarProps extends SessionProps {
  handleLogin: (data: NewAuthObject) => void;
  handleLogout: () => void;
}

const NavBar = ({
  loggedInStatus,
  currentUser,
  handleLogin,
  handleLogout,
}: NavBarProps) => {
  const loggedIn = loggedInStatus === "LOGGED_IN";
  const handleLogoutRequest = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => console.log("logout error: ", error));
  };

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center py-4 px-8 bg-bg-light">
      <h1 className="text-3xl font-montserrat text-type-dark">BookList</h1>
      <div className="flex flex-row flex-nowrap justify-end items-center gap-x-2">
        <Link scheme="alternate" href="/" className="uppercase">Home</Link>
        <Link scheme="alternate" href="/dashboard" className="uppercase">Dashboard</Link>
        {loggedIn && (
          <Button scheme="alternate" size="none" variant="plain" onClick={handleLogoutRequest}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
