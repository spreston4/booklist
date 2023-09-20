import * as React from "react";
import axios from "axios";
import Button from "../ui/atoms/Button";
import Input from "../ui/atoms/Input";
import { RegistrationProps } from "../../types";

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
    <div className="w-2/3 mx-auto">
      <h2 className="font-montserrat text-type-dark text-xl font-medium py-4">
        Sign In!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-between gap-y-4 gap-x-2 items-end"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
          label="Email"
        />
        <div className="flex flex-col gap-4 justify-start items-start w-full sm:flex-row sm:justify-between sm:items-end">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            label="Password"
          />
          <Button type="submit" variant="fill">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
