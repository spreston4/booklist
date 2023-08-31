import * as React from "react";
import axios from "axios";
import Button from "../ui/atoms/Button";
import Input from "../ui/atoms/Input";
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
    <div className="w-2/3 mx-auto">
      <h2 className="font-montserrat text-type-dark text-xl font-medium py-4">
        Sign Up!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-4 w-full items-end"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col gap-4 justify-start items-start w-full sm:flex-row sm:justify-between sm:items-end">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <Input
            label="Confirmation"
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={handleChange}
            required
          />
          <Button variant="fill" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
