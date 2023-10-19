import * as React from "react";
import axios from "axios";
import Button from "./ui/atoms/Button";
import Link from "./ui/atoms/Link";
import { NavBarProps } from "../types";

const NavBar = ({
  loggedInStatus,
  currentUser,
  handleLogin,
  handleLogout,
}: NavBarProps) => {
  const loggedIn = loggedInStatus === "LOGGED_IN";
  const handleLogoutRequest = () => {
    axios
      .delete("/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => console.log("logout error: ", error));
  };

  return (
    <div className="flex flex-row items-center justify-between px-8 py-4 flex-nowrap bg-bg-light">
      <h1 className="text-3xl font-montserrat text-type-dark">BookList</h1>
      <div className="flex flex-row items-center justify-end flex-nowrap gap-x-2">
        <Link scheme="alternate" href="/" className="uppercase">
          Home
        </Link>
        <Link scheme="alternate" href="/books" className="uppercase">
          Books
        </Link>
        {loggedIn && (
          <Link scheme="alternate" href="/dashboard" className="uppercase">
            Dashboard
          </Link>
        )}
        {loggedIn && (
          <Button
            scheme="alternate"
            size="none"
            variant="plain"
            onClick={handleLogoutRequest}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
