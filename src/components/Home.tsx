import * as React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import { SessionProps } from "../App";
import { User } from "../App";

export interface NewAuthObject {
  status?: string;
  user: User;
}
interface HomeProps extends SessionProps {
  handleLogin: (data: NewAuthObject) => void;
}

const Home = ({ loggedInStatus, currentUser, handleLogin }: HomeProps) => {
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data: NewAuthObject) => {
    handleLogin(data);
    navigate("/dashboard");
  };
  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};

export default Home;
