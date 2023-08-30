import * as React from "react";
import axios from "axios";
import Button from "../ui/atoms/Button";
import { NewAuthObject } from "../Home";

interface RegistrationProps {
  handleSuccessfulAuth: (data: NewAuthObject) => void;
}

const Login = ({ handleSuccessfulAuth }: RegistrationProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginErrors, setLoginErrors] = React.useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          handleSuccessfulAuth(response.data);
        } else {
          setLoginErrors("Error logging in.");
        }
      })
      .catch((error) => console.log("login error", error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "email": {
        setEmail(event.target.value);
        break;
      }
      case "password": {
        setPassword(event.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="fill" scheme="alternate">Login</Button>
      </form>
    </div>
  );
};

export default Login;
