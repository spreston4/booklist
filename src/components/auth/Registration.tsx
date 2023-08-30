import * as React from "react";
import axios from "axios";
import { NewAuthObject } from "../Home";

interface RegistrationProps {
  handleSuccessfulAuth: (data: NewAuthObject) => void;
}

const Registration = ({ handleSuccessfulAuth }: RegistrationProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [registrationErrors, setRegistrationErrors] = React.useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      console.log("password error");
      setRegistrationErrors("Passwords must match!");
    } else {
      axios
        .post(
          "http://localhost:3000/registrations",
          {
            user: {
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.status === "created") {
            handleSuccessfulAuth(response.data);
          } else {
            setRegistrationErrors("Error creating account");
          }
        })
        .catch((error) => console.log("registration error", error));
    }
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
      case "password_confirmation": {
        setPasswordConfirmation(event.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div>
      <h1>Resistration</h1>
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
