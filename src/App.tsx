import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { NewUserObject } from "./components/auth/Registration";

export type LoggedInStatus = "LOGGED_IN" | "NOT_LOGGED_IN";
export interface CurrentUser {
  email: string | null;
  id: number | null;
}
export interface SessionProps {
  loggedInStatus: LoggedInStatus;
  currentUser: CurrentUser;
}

function App() {
  const [loggedInStatus, setLoggedInStatus] =
    React.useState<LoggedInStatus>("NOT_LOGGED_IN");
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>({
    email: null,
    id: null,
  });

  const handleLogin = (data: NewUserObject) => {
    setCurrentUser({
      email: data.user.email,
      id: data.user.id,
    });
    setLoggedInStatus("LOGGED_IN");
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedInStatus={loggedInStatus}
                currentUser={currentUser}
                handleLogin={handleLogin}
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
