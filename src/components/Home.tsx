import * as React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import { SessionProps } from "../App";
import { User } from "../App";
import axios from "axios";

export interface NewAuthObject {
  status?: string;
  user: User;
}
interface HomeProps extends SessionProps {
  handleLogin: (data: NewAuthObject) => void;
  handleLogout: () => void;
}

const Home = ({
  loggedInStatus,
  currentUser,
  handleLogin,
  handleLogout,
}: HomeProps) => {
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data: NewAuthObject) => {
    handleLogin(data);
    navigate("/dashboard");
  };

  const handleLogoutRequest = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => console.log("logout error: ", error));
  };
  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>
      <button onClick={() => handleLogoutRequest()}>Logout</button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};

export default Home;
