import * as React from "react";
import axios from "axios";
import Button from "../ui/atoms/Button";
import Input from "../ui/atoms/Input";
import { RegistrationProps } from "../../types";

const Registration = ({ handleSuccessfulAuth }: RegistrationProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [registrationErrors, setRegistrationErrors] = React.useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      setRegistrationErrors("Passwords must match!");
    } else {
      axios
        .post(
          "/user",
          {
            user: {
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
            },
          },
          {
            headers: {
              Accept: "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.status === "created") {
            handleSuccessfulAuth(response.data);
          } else {
            setRegistrationErrors(response.data.message);
          }
        })
        .catch((error) => {
          setRegistrationErrors("Error creating account");
        });
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
      <h2 className="py-4 text-xl font-medium font-montserrat text-type-dark">
        Sign Up!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-end justify-between w-full gap-4"
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
        <div className="flex flex-col items-start justify-start w-full gap-4 sm:flex-row sm:justify-between sm:items-end">
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
      {registrationErrors && (
        <div className="py-4">
          <p className="text-xs font-semibold text-util-error font-roboto">
            {registrationErrors}
          </p>
        </div>
      )}
    </div>
  );
};

export default Registration;
