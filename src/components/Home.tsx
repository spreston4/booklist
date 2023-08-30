import * as React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "./auth/Registration";
import { SessionProps } from "../App";
import { NewUserObject } from "./auth/Registration";

interface HomeProps extends SessionProps {
  handleLogin: (data: NewUserObject) => void;
}

const Home = ({ loggedInStatus, currentUser, handleLogin }: HomeProps) => {
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data: NewUserObject) => {
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
    </div>
  );
};

export default Home;
