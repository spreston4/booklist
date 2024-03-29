import * as React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Dashboard from "./pages/Dashboard";
import { LoggedInStatus, NewAuthObject, UserObject } from "./types";

axios.defaults.baseURL = process.env.REACT_APP_BE_URL;

function App() {
  const [loggedInStatus, setLoggedInStatus] =
    React.useState<LoggedInStatus>("NOT_LOGGED_IN");
  const [currentUser, setCurrentUser] = React.useState<UserObject | null>(null);

  const checkLoginStatus = () => {
    axios
      .get("/logged_in", {
        headers: { Accept: "application/json" },
        withCredentials: true,
      })
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
      <HashRouter>
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
      </HashRouter>
    </div>
  );
}

export default App;
