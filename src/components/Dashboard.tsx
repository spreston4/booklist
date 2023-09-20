import * as React from "react";
import Wishlist from "./Wishlist";
import { DashboardProps } from "../types";

const Dashboard = ({ loggedInStatus, currentUser }: DashboardProps) => {
  const loggedIn = loggedInStatus === "LOGGED_IN";
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>
      {loggedIn && (
        <div>
          <Wishlist loggedInStatus={loggedInStatus} currentUser={currentUser} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
