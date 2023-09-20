import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Books from "./components/Books";
import Dashboard from "./components/Dashboard";
import { LoggedInStatus, NewAuthObject, UserObject } from "./types";

function App() {
  const [loggedInStatus, setLoggedInStatus] =
    React.useState<LoggedInStatus>("NOT_LOGGED_IN");

  const [currentUser, setCurrentUser] = React.useState<UserObject | null>(null);

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setCurrentUser(response.data.user);
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setCurrentUser(null);
        }
      })
      .catch((error) => console.log("login error: ", error));
  };

  const handleLogin = (data: NewAuthObject) => {
    setCurrentUser(data.user);
    setLoggedInStatus("LOGGED_IN");
  };

  const handleLogout = () => {
    setCurrentUser(null);
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
            path="/books"
            element={
              <Books
                loggedInStatus={loggedInStatus}
                currentUser={currentUser}
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
