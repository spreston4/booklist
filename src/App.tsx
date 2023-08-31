import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { NewAuthObject } from "./components/Home";

export type LoggedInStatus = "LOGGED_IN" | "NOT_LOGGED_IN";
export interface User {
  created_at: string | null;
  email: string | null;
  id: number | null;
  password_digest: string | null;
  updated_at: string | null;
}
export interface SessionProps {
  loggedInStatus: LoggedInStatus;
  currentUser: User;
}

const nullUser = {
  created_at: null,
  email: null,
  id: null,
  password_digest: null,
  updated_at: null,
};

function App() {
  const [loggedInStatus, setLoggedInStatus] =
    React.useState<LoggedInStatus>("NOT_LOGGED_IN");

  const [currentUser, setCurrentUser] = React.useState<User>(nullUser);

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setCurrentUser(response.data.user);
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setCurrentUser(nullUser);
        }
      })
      .catch((error) => console.log("login error: ", error));
  };

  const handleLogin = (data: NewAuthObject) => {
    setCurrentUser(data.user);
    setLoggedInStatus("LOGGED_IN");
  };

  const handleLogout = () => {
    setCurrentUser(nullUser);
    setLoggedInStatus("NOT_LOGGED_IN");
  };

  React.useEffect(checkLoginStatus, []);

  return (
    <div>
      <NavBar
        loggedInStatus={loggedInStatus}
        currentUser={currentUser}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedInStatus={loggedInStatus}
                currentUser={currentUser}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                loggedInStatus={loggedInStatus}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
