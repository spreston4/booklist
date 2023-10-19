import * as React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import Button from "./ui/atoms/Button";
import axios from "axios";
import { HomeProps, NewAuthObject } from "../types";

const Home = ({
  loggedInStatus,
  currentUser,
  handleLogin,
  handleLogout,
}: HomeProps) => {
  const navigate = useNavigate();
  const [displayRegister, setDisplayRegister] = React.useState(false);
  const [displayLogin, setDisplayLogin] = React.useState(false);

  const handleSuccessfulAuth = (data: NewAuthObject) => {
    handleLogin(data);
    navigate("/dashboard");
  };

  const handleLogoutRequest = () => {
    axios
      .delete("/logout", {})
      .then((response) => {
        handleLogout();
      })
      .catch((error) => console.log("logout error: ", error));
  };

  const handleToggleRegister = () => {
    displayLogin && setDisplayLogin(false);
    setDisplayRegister(!displayRegister);
  };

  const handleToggleLogin = () => {
    displayRegister && setDisplayRegister(false);
    setDisplayLogin(!displayLogin);
  };

  const loggedIn = loggedInStatus === "LOGGED_IN";

  const fade = (val: boolean) => (val ? "animate-fadeIn" : "animate-fadeOut");

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>
      {loggedIn && (
        <div className="flex items-center justify-center">
          <Button onClick={() => handleLogoutRequest()}>Logout</Button>
        </div>
      )}
      {!loggedIn && (
        <div>
          <div className="flex items-center justify-center gap-4 mx-auto">
            <Button variant="outline" onClick={handleToggleLogin}>
              Login
            </Button>
            <Button variant="outline" onClick={handleToggleRegister}>
              Register
            </Button>
          </div>
          {displayLogin && (
            <div className={`${fade(displayLogin)}`}>
              <Login handleSuccessfulAuth={handleSuccessfulAuth} />
            </div>
          )}
          {displayRegister && (
            <div className={`${fade(displayRegister)}`}>
              <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
