import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  const [loggedInStatus, setLoggedInStatus] =
    React.useState<LoggedInStatus>("NOT_LOGGED_IN");
  const [currentUser, setCurrentUser] = React.useState<User>({
    created_at: null,
    email: null,
    id: null,
    password_digest: null,
    updated_at: null,
  });

  const handleLogin = (data: NewAuthObject) => {
    setCurrentUser({
      created_at: data.user.created_at,
      email: data.user.email,
      id: data.user.id,
      password_digest: data.user.password_digest,
      updated_at: data.user.updated_at,
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
